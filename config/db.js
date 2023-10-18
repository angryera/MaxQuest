const mysql = require('mysql')
const db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

// db.connect((err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log("MySql Connected");
//     console.log(err);
// })
module.exports = db;


