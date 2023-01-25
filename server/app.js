let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const fs = require('fs');
let logger = require('morgan');
const sql = require('mysql');
const bodyParser = require('body-parser')

let indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();


const con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'z10mz10m',
  database: "todos"
})

con.connect(err => {
  if (err) throw err;
  console.log('database connected');
  // fs.readdir(`./entities`, (err, fileNames) => {
  //   if (err) console.log(err);
  //   fileNames.forEach(fileName => {
  //     setUpTable(fileName);
  //   });
  // })
});


const setUpTable = (fileName) => {
  // console.log(fileName);
  fs.readFile(`./entities/${fileName}`, 'utf8', (err, data) => {
    const tableData = JSON.parse(data);
    let table_name = tableData.table_name;
    let columnsData = tableData.columns.join(', ');
    con.query(`DROP TABLE IF EXISTS ${table_name};`, (err, result) => {
      con.query(`CREATE TABLE ${table_name} (${columnsData});`, (err, result) => {
        if (err) console.log(err);
        console.log("TABLES CREATED!")
      })
    })
  })
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
