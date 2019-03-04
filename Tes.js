const express = require('express')
const app = express()


const mysql = require('mysql')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'bertus',
    password : 'root',
    database : 'Plantae'
})
db.connect()
db.on('error',(e)=>{
    console.error(e)
})
    

app.get('/flora/monokotil', (req,res)=>{
    var Monoco = 'SELECT * FROM Monocotyledon';
    db.query(Monoco, (err, result)=>{
    if(err) throw err

        console.log(result)
        res.send(result)
    }) 
})

app.get('/flora/dikotil', (req,res)=>{
    var Dico = 'SELECT * FROM Dicotyledon';
    db.query(Dico, (err, result)=>{
    if(err) throw err
    
        console.log(result)
        res.send(result)
    }) 
})


const MongoCl = require('mongodb').MongoClient
const url = 'mongodb://bertus:root@localhost:27017/Animalia'


app.get('/fauna/vertebrata', (req, res)=>{
    MongoCl.connect(url, (error, callback)=>{
    var collection = callback.db('Animalia').collection('Vertebrata');
        collection.find({}).toArray((err,result)=>{

            console.log(result)
            res.send(result)
        })
    })
})


app.get('/fauna/invertebrata', (req, res)=>{
    MongoCl.connect(url, (error, callback)=>{
    var collection = callback.db('Animalia').collection('Invertebrata');
        collection.find({}).toArray((err,result)=>{

            console.log(result)
            res.send(result)
        })
    })
})

app.listen(3050, ()=>{
    console.log('Server Active !!')
    console.log('Click this link ==>  http://localhost:3050/flora/monokotil atau')
    console.log('Click this link ==>  http://localhost:3050/flora/dikotil atau')
    console.log('Click this link ==>  http://localhost:3050/fauna/vertebrata atau')
    console.log('Click this link ==>  http://localhost:3050/fauna/invertebrata')
})