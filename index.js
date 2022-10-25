const express = require('express');
// const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer()
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./src/routes/index');

const logger = ( req, res, next) => {
  const date = new Date()
  console.log(req.method ,req.originalUrl , date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()  )
  next()
}

app.use(upload.none());
app.use(logger);
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use('/',express.static('src/view/'))

app.use('/app', routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, 'localhost', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
