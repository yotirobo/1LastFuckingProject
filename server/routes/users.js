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

router.get('/', (req , res )=> {
  let sql = `select * from user where username = '${req.query.user}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result[0])
  })
})

router.post("/", function (req, res) {
  let sql = `SELECT username,password
  FROM user 
  JOIN Passwords 
  using(user_id)
  WHERE username = '${req.body.username}'`
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
});

router.post("/register", function (req, res) {
  let sql = `select username from user where username = '${req.body.username}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    if (result[0] || req.body.username === "" || req.body.password === "" || req.body.email === "" || req.body.address === "") {
      res.status(406).send(false)
    }
    else {
      sql = `insert into user (username, email, adress) values ('${req.body.username}', '${req.body.email}', '${req.body.address}')`;
      con.query(sql, (err, result) => {
        if (err) { console.log(err); res.status(406).send(false); }
      })
      sql = `insert into Passwords (password) values ('${req.body.password}')`;
      con.query(sql, (err, result) => {
        if (err) { console.log(err); res.status(406).send(false); }
        else res.status(200).send(true);
      })
      
    }
  })
});

module.exports = router;