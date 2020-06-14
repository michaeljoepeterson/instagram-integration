require('dotenv').config();
const express = require('express');
const {PORT, DATABASE_URL,DOMAINS } = require('./config');
const {instaRouter} = require('./routers/routerExports');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
app.use(jsonParser);
//app.set('trust proxy', true)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
/* prod
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  let allowedOrigins = DOMAINS.split(',');
  if(allowedOrigins.indexOf(origin) > -1){
     res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
  }
  next();
});
*/

app.use('/api/insta',instaRouter);

function runServer( databaseUrl, port = PORT) {
    
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl,{ useNewUrlParser: true,useUnifiedTopology: true }, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
    /*
    return new Promise((resolve,reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
        });
    });
    */
  }
  
  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  
  module.exports = { app, runServer, closeServer };