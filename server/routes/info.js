var express = require("express");
var router = express.Router();
const sql = require('mysql');

const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'z10mz10m',
    database: "todos"
})

router.get('/', (req, res) => {
    let sql = `select * from user where user_id = ${req.query.user_id * 1}`
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
        res.send(result)
        console.log(result);
    })
})

module.exports = router;