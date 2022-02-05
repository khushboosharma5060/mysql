var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mydatabase'
});
 
connection.connect();



const express = require('express');
const Api = express();
Api.use(express.json());
const uuid = require('uuid');



Api.post('/', (req, res) => {
    const body = req.body;
   body.id =  new Date().valueOf()
connection.query(`insert into mytable values ("${body.id}", "${body.name}", 
${body.class}, "${body.tech}")`,
 function (error, results, fields) {
    if (error) throw error;
    });
 res.send('added')
});



Api.get('/', (req, res) => {
    connection.query('select * from mytable;', function (error, results, fields) {
    if (error) {
      res.send('error h')
    } else {
      res.send(results)
    }
    });
    });
     



Api.get('/:id', (req, res) => {
const id = req.params.id;
connection.query(`select * from mytable where id = "${id}"`, function (error, results, fields) {
  if (error) {
    res.send('error h')
  } else {
    res.send(results)
  }
  });
connection.query.name = req.body.name;

});



Api.delete('/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`delete from mytable where id = "${id}"`, function (error, results, fields) {
    if (error) {
      res.send('error h')
    } else {
      res.send("deleted")
    }
    });
});




Api.put('/:id', (req, res) => {
  
  const sql = `update mytable set tech = "${req.body.tech}", name = "${req.body.name}", class = ${req.body.class} where id = "${req.params.id}"`;
  connection.query(sql, function (error, results, fields){
    if (error) {
      res.send('error h')
    } else {
      res.send("updated")
    }
    });
});

 

Api.listen(3000, () => console.log('server is going on'));










// const name = 'raju'
// console.log(`my name is ${name}`);