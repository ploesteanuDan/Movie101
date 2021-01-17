const express = require('express')
const app = express()
const mysql = require("mysql")
const cors = require('cors')
const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json()) 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'dan',
    password: 'sqlpass23',
    database: 'moviesandproducers',
  });

app.get('/movies', (req, res)=>{
    const isBanner = req.query.isBanner
    db.query("SELECT * FROM movies WHERE isBanner = " + isBanner, (err, result) => {
       if(err){
           console.log(err)
       }
       else {
           res.send(result)
       }
   })
})

app.get('/producers', (req, res)=>{
    db.query("SELECT * FROM producers", (err, result) => {
       if(err){
           console.log(err)
       }
       else {
           res.send(result)
       }
   })
})
 
app.post('/studios', (req, res) => {
    const movieID = req.body.movieID
    const producerID = req.body.producerID
    const studioName = req.body.studioName

    db.query('INSERT INTO studios (movieID, producerID, studioName) VALUES (?,?,?)',
    [movieID, producerID, studioName],
    (err, result) => {
        if(err){
            console.log(err)
        }
        else {
            res.status(201).json({
                status: 'succesfully added',
              });
        }
    }
    )
})

 //ADD MOVIES
app.post('/movies', (req, res) => {
    const name = req.body.name
    const year = req.body.year
    const type = req.body.type
    const plot = req.body.plot
    const thumbnail = req.body.thumbnail
    const trailer = req.body.trailer
    const banner = req.body.banner

    db.query('INSERT INTO movies (name, year, type, plot, thumbnail, trailer, isBanner, banner) VALUES (?,?,?,?,?,?,1,?)', 
    [name, year, type, plot, thumbnail, trailer,banner], 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(201).json({
                status: 'succesfully added',
              });
        }
    })
})
 
 //ADD PRODUCERS
app.post('/producers', (req, res) => {
    const name = req.body.name
    const born = req.body.born
    const nationality = req.body.nationality
    const thumbnail = req.body.thumbnail

    db.query('INSERT INTO producers (name, born, nationality, thumbnail) VALUES (?,?,?.?)', 
    [name, born, nationality, thumbnail], 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Producer added.")
        }
    })
})
 
app.put('/update', (req, res)=>{
    const table = req.body.table
    const valName = req.body.valName
    const newVal = req.body.newVal
    const idName = req.body.idName
    const idVal = req.body.idVal
    db.query('UPDATE ' + table + ' SET ' + valName + ' = "' + newVal + '" WHERE ' + idName + ' = ' + idVal, 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(201).json({
                status: 'succesfully updated',
              });
        }
    })
})

app.delete('/delete', (req, res) => {
    console.log(req.body)
    const table = req.body.table
    const idName = req.body.idName
    const idVal = req.body.idVal
    db.query('DELETE FROM ' + table + ' WHERE ' + idName + ' = ' + idVal, 
    (err, response) => {
      if(err){
        console.log(err)
      }
      else {
        res.status(201).json({
            status: 'succesfully deleted',
          });
      }
    }
    )
})
   
  


app.listen(3001, ()=>{
    console.log("running on port 3001")
});

