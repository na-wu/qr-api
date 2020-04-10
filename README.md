<p align="center">
  
<a href="https://apiqr.herokuapp.com/api/generate">
    <img src="https://p86.f2.n0.cdn.getcloudapp.com/items/7Ku0BzQ6/qr-code.png?v=55471b14dd702dcbd5a88c48de043b23" alt="qrcode" width=250 height=250>
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



