const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://vanshika703:vanshika@cluster0-ndrdb.mongodb.net/test?retryWrites=true&w=majority"

app.get('/', (req,res)=>{
    res.sendFile(__dirname+ "/index.html")
})

app.post('/submit', (req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err) throw err
        let dbo = db.db("forms")
        let input = {
            name : req.body.name,
            gender : req.body.gender
        }
        dbo.collection('inputs').insertOne(input, (dbErr,result)=>{
            if(dbErr) throw dbErr
            console.log(result)
        })
    })
    res.redirect('/')
}

app.get('/display', (req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err) throw err
        let dbo = db.db("forms")
        dbo.collection("inputs").find({}).toArray((dbErr,result)=>{
            if(dbErr) throw err
            res.send(result)
            db.close()
        })
    })
})


app.listen(3000, (err)=>{
    if(err) throw err

    console.log("app listening on 3000")
})