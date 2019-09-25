const db = require("./config/database");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require("morgan");

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app_port = process.env.PORT || 3001;

// Construct a schema, using GraphQL schema language
const graphqlSchema = buildSchema(`
  type Query {
    signedIn: Boolean
  }
`);

// The root provides a resolver function for each API endpoint
const graphqlRoot = {
  signedIn: () => {
    return false;
  },
};

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlRoot,
  graphiql: true,
}));

app.use(cookieParser("some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const expressSession = require("express-session");

const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: (30 * 86400 * 1000),
  createDatabaseTable: true
}, db.pool);

const session = expressSession({
  secret: "some_semi_permanent_not_so_secret_secret",
  name: "session",
  resave: true,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: (30 * 86400 * 1000)
  }
});

// Send static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Send React App
app.route("*").get((req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(app_port, () => {
  console.log('listening on *:' + app_port);
});