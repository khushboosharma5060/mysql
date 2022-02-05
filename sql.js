var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"mydatabase"
});

con.connect(function(err) {
  if (err) throw err;
});

const
 express = require('express');
const Api = express();
Api.use(express.json());
var shortid = require("shortid");
const port = 3000;


Api.post('/', (req,res) => {
  const id = shortid.generate();
    var sql = `INSERT INTO mytable (id, class, name, tech ) VALUES ("${id}", ${req.body.class}, 
    '${req.body.name}',"${req.body.tech}" )`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  res.send('added');
});


Api.get('/', (req, res) => {
    con.query("SELECT * FROM mytable", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
  res.send(result)
    });
});


Api.get('/:id', (req, res) => {
  con.query(`SELECT * FROM mytable where id = "${req.params.id}"`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   res.send(result)
  });
});

Api.put('/:id', (req, res) => {
  con.query(`update mytable set name = "${req.body.name}", tech = "${req.body.tech}", 
  class = ${req.body.class} where id = "${req.params.id}"`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   res.send(result)
  });
});

Api.delete('/:id', (req, res) => {
  con.query(`delete FROM mytable where id = "${req.params.id}"`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   res.send(result);
  });
})


Api.listen(3000, () => console.log('server running'));

