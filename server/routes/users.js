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
    if (err) throw err;
    
    let sql = `select username,password from user where username = '${req.body.username}' `
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
    })
  })
  // if (err) throw err;
  // for (let user of JSON.parse(data)) {
  //   if (user.username === req.body.username) {
  //     if (user.password *1 === req.body.password * 1) {
  //       return res.send(true);
  //     }
  //   }
  // }
  // res.send(false);
});

router.post("/register", function (req, res) {
  fs.readFile("./public/users.json", (err, data) => {
    let arr = JSON.parse(data);
    if (err) {
      console.log(err);
      return;
    }
    for (let user of JSON.parse(data)) {
      if (user.username === req.body.username) {
        return res.send(false);
      }
    }
    arr.push(req.body);
    fs.writeFile("./public/users.json", JSON.stringify(arr), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    fs.mkdir(`./public/allUsersFiles/${req.body.username}`, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.send(true);
  });
});
module.exports = router;