var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.listen(5000);

app.use(cookieParser());

app.get('/', function(req, res){
    if(req.cookies.isVisit){
         console.log(req.cookies);
         res.send('welcome back again');
     }else {
         res.cookie('isVisit',1 , {maxAge:50* 1000 });
	res.send('welcome first visit');
     }
});
