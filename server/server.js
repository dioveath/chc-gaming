const config = require('./config');

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const APIRoute = require('./routes/api/v1');
const authRoute = require('./routes/auth/index');

const isAuthenticated = require('./middlewares/is-authenticated');
const isAuthorized = require('./middlewares/is-authorized');


require('./config/passport')(passport);
app.use(passport.initialize());


// API Routes
app.use('/auth', authRoute);
app.use('/api/v1', APIRoute);

// NOTE: isAuth checker
app.get('/', [isAuthenticated(), isAuthorized()], (req, res) => {
  res.send("<h1> Hello, World </h1>");
});


app.post('/fifa/s3/registration/verify', async (req, res) => {
  var data = {
    "token": req.body.token,
    "amount": config.FIFA_S3_REGISTRATION_FEE
  };

  var config = {
    headers: {'Authorization': `Key ${config.KHALTI_TEST_PRIVATE_KEY}`}
  };

  try {
    var response = await axios.post("https://khalti.com/api/v2/payment/verify/",
				    data,
				    config);
    console.log(response.data);
    res.send({
      status: "Success",
      redirectUrl: '/fifa/s3/registration/success'
    });

  } catch(error) {
    res.send({
      status: "Fail",
      redirectUrl: '/fifa/s3/registration/failed'
    });
  }

});

app.get('/fifa/s3/registration/success', (req, res) => {
  res.sendFile(__dirname +  "/public/success.html");
});

app.get('/fifa/s3/registration/failed', (req, res) => {
  res.sendFile(__dirname +  "/public/failed.html");  
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });


app.listen(config.PORT, () => {
  console.log(`listening to clients @localhost:${config.PORT}`);
});

