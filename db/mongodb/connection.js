const config = require('../../config');
const mongoose = require('mongoose');

var env = config.NODE_ENV;

if(env === 'production') {
  console.log("running in production mode...!");
  mongoose.connect(config.mongo.DB_URI,
                   {
                     useNewUrlParser: true,
                     useUnifiedTopology: true,
                     useCreateIndex: true,
                     useFindAndModify: false, 
                   });
} else {
  console.log("running in development mode...! mongoose isn't connected!");
}


// signal connection
mongoose.connection.once('open', function() {
  console.log('Connection has been made.');
}).on('error', function(error) {
  console.log('Connect error.', error);
}).on('disconnected', function(){
  console.log('Connection disconnected.');
});


module.exports = mongoose;
