const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set("view engine","ejs")

const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://vanshika703:vanshika@cluster0-ndrdb.mongodb.net/test?retryWrites=true&w=majority"

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/submit', (req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err) throw err
        let dbo = db.db("forms")
        var input = {
            name : req.body.name,
            gender : req.body.gender
        }
        dbo.collection('inputs').insertOne(input, (dbErr,res)=>{
            if(dbErr) throw dbErr
            console.log("inserted input")
        })
    })
    res.end()
})


app.listen(3000, (err)=>{
    if(err) throw err

    console.log("app listening on 3000")
})