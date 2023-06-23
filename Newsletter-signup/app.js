require('dotenv').config()
var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var mailchimpInstance   = 'us21',
    listUniqueId        = process.env.UNIQUEID,
    mailchimpApiKey     = process.env.APIKEY;




app.get('/', function (req, res) {
  res.sendFile(__dirname+"/signup.html");
});


app.post('/', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.fName,
            'LNAME': req.body.lName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.sendFile(__dirname+'/success.html');
              } else {
                res.sendFile(__dirname+'/failure.html'); 
              }

          });
});

app.post("/failure",function(req, res){
    res.redirect("/");
})


app.listen(3000, function () {
  console.log('server started on port 3000');
});


