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

app.get('/get', (req, res)=>{
    const table = req.body.table
   db.query("SELECT * FROM " + table, (err, result) => {
       if(err){
           console.log(err)
       }
       else {
           res.send(result)
       }
   })
})
 
app.post('/add/gallery', (req, res) => {
    const movieID = req.body.movieID
    const producerID = req.body.producerID
    const year = req.body.year
    const title = req.body.title
    const thumbnail = req.body.thumbnail
    const trailer = req.body.trailer

    db.query('INSERT INTO gallery (movieID, producerID, movieTitle, movieYear, galleryThumbnail, galleryTrailer) VALUES (?,?,?,?,?,?)',
    [movieID, producerID, title, year, thumbnail, trailer],
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
app.post('/add/movie', (req, res) => {
    const title = req.body.title
    const year = req.body.year
    const type = req.body.type
    const plot = req.body.plot

    db.query('INSERT INTO movies (movieTitle, movieYear, movieType, moviePlot) VALUES (?,?,?,?)', 
    [title, year, type, plot], 
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
app.post('/add/producer', (req, res) => {
    const name = req.body.name
    const born = req.body.born
    const nationality = req.body.nationality

    db.query('INSERT INTO producers (producerName, producerBorn, producerNationality) VALUES (?,?,?)', 
    [name, born, nationality], 
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
    console.log(req.body)
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

