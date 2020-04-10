<p align="center">
  
<a href="https://apiqr.herokuapp.com/api/generate">
    <img src="https://share.getcloudapp.com/4guy0Nly" alt="qrcode" width=100 height=100>
  </a>
  <h2 align="center">QR Code API</h3>

  <p align="center">
    Microservice for generating QR codes through a RESTful API
    <br>
    
  </p>

</p>

<br>

###### Testing
` git clone <repo>`  
` cd <repo>`  
`npm install`  
`npm start`

You can then make post requests to `localhost:3000/api/generate`

###### HTTP Request

`POST https://apiqr.herokuapp.com/api/generate`

###### JSON Request

Key | Example
--------- | --------
url | 'string_to_generate'

#### Response

If the input was valid, the response should be of type ` image/png `



