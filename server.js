const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');


const app = express();

app.set('query parser', 'extended');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const APIRoute = require('./routes/api/v1');
const authRoute = require('./routes/auth/index');

require('./config/passport')(passport);
app.use(passport.initialize());


// API Routes
app.use('/auth', authRoute);
app.use('/api/v1', APIRoute);


app.use(express.static(path.join(__dirname, "client", "build")));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(config.PORT, () => {
  console.log(`listening to clients @localhost:${config.PORT} | ✅🎉🚀🚀`);
});

