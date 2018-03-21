import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// graphql connectors
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { createContext } from 'dataloader-sequelize';
import 'dotenv/config';
// passport sessions
import passport from 'passport';
import passportLocalSequelize from 'passport-local-sequelize';
import session from 'express-session';
import store from 'connect-session-sequelize';
// db schema
import schema from './graphql/register-api';
import db from './api/models';

const {
  EXPRESS_PORT,
  NODE_ENV,
  SESSION_KEY,
} = process.env;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

// init express
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// init sessions
const Store = store(session.Store);
app.use(session({
  store: new Store({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: 'auto',
  },
  proxy: true,
  secret: SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}));

// init passport
passportLocalSequelize.attachToUser(db.Users, {
  usernameField: 'username',
  hashField: 'passwordHash',
  saltField: 'passwordSalt',
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(db.Users.createStrategy());
passport.serializeUser(db.Users.serializeUser());
passport.deserializeUser(db.Users.deserializeUser());

app.use((req, res, next) => {
  // console.log(req.session);
  next();
});
// handle auth
app.post('/login',
  passport.authenticate('local'),
  (req, res) => { res.send({ id: req.user.id, username: req.user.username }); },
);
app.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    console.log(err);
    res.sendStatus(200);
  });
});

// init graphql
const graphqlEndpoint = '/graphql';
app.use(graphqlEndpoint, (req, res, next) =>
  graphqlExpress({
    schema,
    context: {
      db,
      user: req.user,
    },
  })(req, res, next),
);

if (NODE_ENV === 'development') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));
}

// sync db and start server
const port = EXPRESS_PORT || 3000;
db.sequelize.sync()
  .then(() => {
    createContext(db.sequelize);
    app.listen(port, () => console.log(`App started on ${EXPRESS_PORT}`));
  });
