const express = require('express');
const bodyParser = require('body-parser');
const levenshtein = require('fast-levenshtein');
const app = express();
const morgan =require('morgan');
var cities = require("./cities.json");
var countryResults=[];

 

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content type, Authorization, Accept');
    next();
});


app.get("/",function(req,res){
  res.sendFile(__dirname + '/home.html');
 
});

app.get('/api/worldcities',function(req,res){
	var meds = req.query.search.trim().toLowerCase();	
 
  cities.forEach(function(result){
    //compare the search with country and postal code   
   });
    
      res.json();
     
});


function filteritems(meds,reslt,results){
       var cresults = [];
      // calculate distance 
        var distance = levenshtein.get(meds, reslt, { useCollator: true});
       if(reslt.startsWith(meds)){     
        results.distance=distance;
        countryResults.push(results);
        cresults.push(results);    
        }
       else if(reslt.includes(meds)){
         var num=0;
         for(var i=0 ; i<cresults.length ; i++){
           if(cresults[i]==rslt){
            num++;
           }
         }
      if(num==0){
        // loop in here if drugname is not present in drugclas array
        
         }        
       }
       else{
          // do something     
        }
}

function sortbyDistance(a,b){
  var distanc = parseInt(a.distance) - parseInt(b.distance);
  return distanc;

}

app.listen(app.get('port'));
console.log("server listening on port " + app.get('port'));

module.exports = app;
