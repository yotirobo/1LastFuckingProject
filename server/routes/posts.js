var express = require("express");
var router = express.Router();
const sql = require('mysql');

//connection with database todos
const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'z10mz10m',
    database: "todos"
})

router.get("/", (req, res) => {
    let sql = `select * from post where user_id = ${req.query.userId * 1}`
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
        res.send(result)
    })
})

router.get("/comments", (req, res) => {
    let sql = `select * from comment where user_id = ${req.query.userId * 1}`
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
        res.send(result)
    })
})

module.exports = router;