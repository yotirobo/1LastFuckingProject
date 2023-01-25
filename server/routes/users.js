var express = require("express");
var router = express.Router();
var fs = require("fs");
const sql = require('mysql');

//connection with database todos
const con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'z10mz10m',
  database: "todos"
})

/* GET users listing. */

router.post("/", function (req, res) {
  con.connect(err => {
    if (err) { console.log(err); return; }
    let sql = `select username,password from user where username = '${req.body.username}'`
    con.query(sql, (err, result) => {
      if (err) { console.log(err); return; }
      console.log(result[0]);
      if (result[0]) {
        if (result[0]?.password === req.body.password) {
          res.status(200).send(true);
        }
        else {
          res.status(200).send(false)
        }
      }
      else {
        res.status(200).send(false)
      }
    })
  })
});

router.post("/register", function (req, res) {
  con.connect(err => {
    if (err) { console.log(err); return; }
    let sql = `select username from user where username = '${req.body.username}'`
    con.query(sql, (err, result) => {
      if (err) { console.log(err); return; }
      if (result[0]) {
        res.send(false)
      }
      else {
        sql = `insert into user (username, password, email, adress) values ('${req.body.username}', '${req.body.password}', '${req.body.email}', '${req.body.address}')`;
        con.query(sql, (err, result) => {
          if (err) { console.log(err); return; }
          res.send(true)
        })
      }
    })
  })
});
module.exports = router;