const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const Nexmo = require('nexmo');
var app = express();

app.use(bodyparser.json());

//for posting data
var urlencodedParser = bodyparser.urlencoded({ extended: false }) ;

//nexmo api config
const nexmo = new Nexmo({
  apiKey: 'b8c3cb8a',
  apiSecret: '96ZN3j1prINdebha',
});

//MySQL config
var mysqlConnection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'og_ngo',
  multipleStatements: true
  });

  //MySQL connection
  mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    //Est. Port conn.
    const port = 5000;
    app.listen(port, () => console.log(`Server started on port ${port}`));

    //Mail config
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'theogngo@gmail.com',
        pass: 'ncpproject'
      }
    });



    //Displaying data

    const getQuery="SELECT id,name,details,DATE_FORMAT(date,'%D %M %Y') AS date FROM `events` ORDER BY date DESC";

    app.get('/events',(req, res) => {
      mysqlConnection.query(getQuery , (err, results, fields) => {
      if (!err)
      res.send(JSON.stringify(results));
      else
      console.log(err);
      })
      } );

      //Enrolling

      app.post('/',urlencodedParser,(req, res) => {

        //res.send("POST request called");

        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.mobile);
        console.log(req.body.eventid);

        mysqlConnection.query("SELECT * FROM users WHERE number='"+req.body.mobile+"' AND eventid='"+req.body.eventid+"' LIMIT 1",(error,results)=>{
          if(error){
            console.log(error);
          }
          if(results.length>0){
            console.log("Already Exists!");
            res.send({alert:true});
          }else{
            console.log("No errors!");

            mysqlConnection.query("INSERT INTO users(id,name,email,number,eventid) VALUES(null,'"+req.body.name+"', '"+req.body.email+"', '"+req.body.mobile+"','"+req.body.eventid+"' )", (err, results) => {
              if (!err){
                
                //messaging
                const from = 'THE OG NGO';
                const to = '91'+req.body.mobile;
                const text = 'Hi '+req.body.name+', thankyou for enrolling. Stay connected with us. - The OG NGO.';
      
                nexmo.message.sendSms(from, to, text,(error,results)=>{
                  if(error){
                    console.log("ERROR : ",error);
                    console.log("Message not sent.");
                  }else{
                    console.log("RESULT : ",results);
                    console.log("Message sent.");
                  }
                });

                res.send({toast:true});
    
              }
              else
              console.log(err);
              });

          }
        })
        
      } );

  
