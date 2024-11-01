const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/mydata.db');

router.get('/', (req, res, next) => {
    db.serialize(() => {
        var rows = "";
        db.each("select * from mydata", (err, row) => {
            if (!err) {
                rows += "<tr><th>" + row.id + "</th><td>" + row.name + "</td></tr>";
            }
        }, (err, count) => {
            if (!err) {
                var data = {
                    title: 'Hello!',
                    content: rows
                };
                res.render('hello', data);
            }
        });
    });
});

module.exports = router;