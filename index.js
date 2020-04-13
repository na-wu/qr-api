const express = require("express")
const bodyparser = require('body-parser')
const ratelimiter = require('./ratelimiter')

const env = require('./env.json')
var QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid');

const app = express()

async function generate(data, uuid) {
    return new Promise(function(resolve, reject) {
        QRCode.toFile('./public/' + uuid, data, function(err, url) {
            if (err) {
                reject(err)
            } else {
                console.log(url)
                resolve(url)
            }
        })
    })

}

var port = process.env.PORT || 3000

app.use(bodyparser.json()) // JSON data
app.use(bodyparser.urlencoded({ extended: false })) //UTF-8 data
app.use(express.static(__dirname + 'public'));
app.use(ratelimiter) // rate limiter is applied to ALL endpoints

app.listen(port, function() {
    console.log("Server running on port", port)
})

app.get('/', function(req, res, next) {
    res.send("Welcome to QRapi - " + uuidv4())
})

app.get("/api", function(req, res, next) {
    res.send("Welcome to API!")
})

app.post("/api/generate", async function(req, res, next) {
    console.log("generating qr code...")
    const data = req.body["url"]
    const id = uuidv4().toString() + '.png'
    const qr = await generate(data, id)
    var result = {}
    result['url'] = id
    res.send(result)

})

app.get("/api/:uuid", function(req, res, next) {
    var params = req.params
    console.log(params)
    res.sendFile(__dirname + '/public/' + params['uuid'])
})