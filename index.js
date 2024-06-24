require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      cors = require('cors');

// const variable declaretion.
const URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

// import middlewares
const callbackGuard = require('./middlewares/callbackGuard'),
      errorGuard = require('./middlewares/errorGuard'); 

// import routes
const userRoute = require('./routes/user/route'),
      transactionRoute = require('./routes/transaction/route');

// express app init
const app = express();

// middleware init
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// mongoose database connection.
mongoose
  .connect(URL,{})
  .then(() => console.log("database connection established"))
  .catch((error) => console.error("database connection error:",error))

// application route.
app.use('/api/user',userRoute);
app.use('/api/transaction',transactionRoute);

// error middleware init.
app.use(callbackGuard);
app.use(errorGuard);
app.use(function (err, req, res, next) {
  console.error(err.message);
 if (!err.statusCode) err.statusCode = 501;
 res.status(err.statusCode).send(err.message);
});

// app listening port init.
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}/`))
