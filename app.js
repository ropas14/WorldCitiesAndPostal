const express = require('express');
const bodyParser = require('body-parser');
const levenshtein = require('fast-levenshtein');
const app = express();
const morgan =require('morgan');
var AdmZip = require('adm-zip');

	 // reading archives
const zip = new AdmZip("./dtaJson.zip");
const zipEntries = zip.getEntries(); // an array of ZipEntry records
const cities =JSON.parse(zipEntries[0].getData().toString('utf8'));
//console.log(cities.US);
///var cities =jsonfile.readFileSync("dtaJson.json");
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
  var country = req.query.c.trim().toUpperCase();
  var pcode=req.query.p.trim().toLowerCase();
  var item=cities[country];
  var results=[];
  if(item){
    Object.keys(item).forEach(function(pcStr) {
    if(new RegExp(pcode).test(pcStr)){
      console.log(pcStr+" <>>>>>>>>>>>>>");
        var pcArr=  pcStr.split(' ');
        console.log(pcArr+"<,,,,,,,,,,,,,,,");
        pcArr.forEach(function(pc) {
          if(new RegExp(pcode).test(pc)){
             var towns =item[pcStr];
             var ed = levenshtein.get(pc, pcode, { useCollator: true});
             towns.forEach(function(tn) {
             console.log(pc+"=="+tn);
             var twn = tn.split("#");
             var sw=1;
             if(pc.startsWith(pcode)){
                sw=0;
             }
            //var str =`${pn}#${an1}#${ac1}#${lt}#${ln}#${ac}`;
             var itm={
                cc:country,
                ld:ed,
                sw:sw, //start with
                pc:pc,
                pn:twn[0],
                an1:twn[1],
                ac1:twn[2],
                lt:twn[3],
                ln:twn[4],
                ac:twn[5]
            }
           results.push(itm);
     });
   }
 });
    }
 });

      console.log(country+" "+pcode+" "+item);
}
 
      results.sort(sortbyDistance);
      results.sort(sortbyDistance);
      res.jsonp(results);

});



function sortbyDistance(a,b){
  var dist = parseInt(a.sw) - parseInt(b.sw);
  if(dist===0 ){
     return parseInt(a.ld) - parseInt(b.ld);
  }
  return dist;
}

app.listen(app.get('port'));
console.log("server listening on port " + app.get('port'));

module.exports = app;
