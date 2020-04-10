const express = require("express")
const bodyparser = require('body-parser')
const app = express()
const env = require('./env.json')
var QRCode = require('qrcode')



async function generate(data) {
    return new Promise(function(resolve, reject) {
        QRCode.toFile('./qrcode.png', data, function(err, url) {
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

app.listen(port, function() {
    console.log("Server running on port", port)
})

app.get('/', function(req, res, next) {
    res.send("Welcome to QRapi")
})

app.get("/api", function(req, res, next) {
    res.send("Welcome to API!")
})

app.post("/api/generate", async function(req, res, next) {
    console.log("generating qr code...")
    const data = req.body["url"]
    const qr = await generate(data)
    res.sendFile(__dirname + '/qrcode.png')

})

app.get("/api/generate", function(req, res, next) {
    res.send(req.body)
})