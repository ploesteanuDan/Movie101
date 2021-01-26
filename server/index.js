const express = require('express')
const app = express()
const mysql = require("mysql")
const cors = require('cors')

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
    if(isBanner)
    {
    db.query("SELECT * FROM movies WHERE isBanner = " + isBanner, (err, result) => {
       if(err){
        res.status(404).json({ err: err.toString() });
       }
       else {
           res.send(result)
       }
   })
    }
    else{
        db.query("SELECT * FROM movies" , (err, result) => {
            if(err){
                res.status(500).json({ err: err.toString() });
            }
            else {
                res.send(result)
            }
        })  
    }
})


app.get('/producers', (req, res)=>{
    db.query("SELECT * FROM producers", (err, result) => {
       if(err){
        res.status(500).json({ err: err.toString() });
       }
       else {
           res.send(result)
       }
   })
})
app.get('/studios', (req, res)=>{
    db.query("SELECT * FROM studios", (err, result) => {
       if(err){
        res.status(500).json({ err: err.toString() });
       }
       else {
           res.send(result)
       }
   })
})
app.get('/jointable', (req, res)=>{
    db.query("SELECT jointable.joinID, jointable.movieID, jointable.producerID, jointable.studioID, movies.movieName, producers.producerName, studios.studioName, movies.movieThumbnail, producers.producerThumbnail FROM jointable LEFT JOIN movies ON jointable.movieID = movies.movieID LEFT JOIN producers ON jointable.producerID = producers.producerID LEFT JOIN studios ON jointable.studioID = studios.studioID", (err, result) => {
       if(err){
        res.status(500).json({ err: err.toString() });
       }
       else {
           res.send(result)
       }
   })
})

app.get('/movies/details', (req, res)=>{
    const movieID = req.query.movieID
    db.query('SELECT movieName, movieYear, movieType, producerName, studioName FROM movies LEFT JOIN jointable ON movies.movieID = jointable.movieID LEFT JOIN producers ON jointable.producerID = producers.producerID LEFT JOIN studios ON jointable.studioID = studios.studioID WHERE movies.movieID = ' + movieID, (err, result)=>{
        if(err){
            res.status(500).json({ err: err.toString() });
        }
        else{
            res.send(result)
        }
    })
})
app.get('/producers/details', (req, res)=>{
    const producerID = req.query.producerID
    db.query('SELECT movieName, movieYear, movieType, studioName FROM producers LEFT JOIN jointable ON producers.producerID = jointable.producerID LEFT JOIN movies ON jointable.movieID = movies.movieID LEFT JOIN studios ON jointable.studioID = studios.studioID WHERE producers.producerID = ' + producerID, (err, result)=>{
        if(err){
            res.status(500).json({ err: err.toString() });
        }
        else{
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
            res.status(500).json({ err: err.toString() });
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
    console.log(req)
    const name = req.body.stateCopy.movieName
    const year = req.body.stateCopy.movieYear
    const type = req.body.stateCopy.movieType
    const plot = req.body.stateCopy.moviePlot
    const thumbnail = req.body.stateCopy.movieThumbnail
    const trailer = req.body.stateCopy.movieTrailer
    const banner = req.body.stateCopy.movieBanner

    db.query('INSERT INTO movies (movieName, movieYear, movieType, moviePlot, movieThumbnail, movieTrailer, isBanner, movieBanner) VALUES (?,?,?,?,?,?,1,?)', 
    [name, year, type, plot, thumbnail, trailer,banner], 
    (err, result) => {
        if (err) {
            res.status(500).json({ err: err.toString() });
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
    const name = req.body.stateCopy.producerName
    const born = req.body.stateCopy.producerBorn
    const nationality = req.body.stateCopy.producerNationality
    const thumbnail = req.body.stateCopy.producerThumbnail
    const quote = req.body.stateCopy.producerQuote

    db.query('INSERT INTO producers (producerName, producerBorn, producerNationality, producerThumbnail, producerQuote) VALUES (?,?,?,?,?)', 
    [name, born, nationality, thumbnail, quote], 
    (err, result) => {
        if (err) {
            res.status(500).json({ err: err.toString() });
        }
        else {
            res.send("Producer added.")
        }
    })
})
 //ADD JOINTABLE
app.post('/jointable', (req, res) => {
    const movieID = parseInt(req.body.stateCopy.movieID, 10)
    const producerID = parseInt(req.body.stateCopy.producerID, 10)
    const studioID = parseInt(req.body.stateCopy.studioID, 10)

    db.query('INSERT INTO jointable (movieID, producerID, studioID) VALUES (?,?,?)', 
    [movieID, producerID, studioID], 
    (err, result) => {
        if (err) {
            res.status(500).json({ err: err.toString() });
        }
        else {
            res.send("Relation added")
        }
    })
})
 
app.put('/update', (req, res)=>{
    const values = req.body.values
    const table = req.body.table
    const idName = req.body.idName
    const idValue = req.body.idValue
    db.query('UPDATE ' + table + ' SET ' + values +  " WHERE "  + idName + ' = ' + idValue, 
    (err, result) => {
        if (err) {
            res.status(500).json({ err: err.toString() });
        }
        else {
            res.status(201).json({
                status: 'succesfully updated',
              });
        }
    })
})

app.delete('/delete', (req, res) => {
    console.log(req)
    const table = req.body.table
    const idName = req.body.idName
    const idValue = req.body.idValue
    db.query('DELETE FROM ' + table + ' WHERE ' + idName + ' = ' + idValue, 
    (err, response) => {
      if(err){
        res.status(500).json({ err: err.toString() });
      }
      else {
        res.status(201).json({
            status: 'Item succesfully deleted.',
          });
      }
    }
    )
})
   
  


app.listen(3001, ()=>{
    console.log("running on port 3001")
});

