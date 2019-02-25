var bodyParser = require('body-parser');
var express = require('express');
var dbConnecion = require('./DBConnection.js');

const app = express();
const port = 8080; // "xprs" in T9
const isProduction = 'production' === process.env.NODE_ENV;
const browserSync = require("browser-sync");




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//app.use(express.static(homePath,{ etag: isProduction, lastModified: false }));

app.listen(port, listening);

function listening(){
    console.log("Demo server on " + port);
    if(!isProduction){
      browserSync({
        online:false,
        open:false,
        port: port + 1,
        proxy: "localhost:" + port,
        ui: false
      })
    }
}

app.post('/enviarSolicitud', function(req, res) {
    var d = new Date();
    d = new Date(d.getTime() - 3000000);
    var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    var sql = "INSERT INTO `TeCambio`.`pedidos` (`telefono` ,`nombre` ,`direccion` ,`ciudad` ,`d10000` ,`d5000` ,`d2000` ,`d1000` , `d500` ,`d200` ,`d100` ,`d50` ,`observaciones` ,`estado`,`fecha`) VALUES (" + req.body.telefono + ", '" + req.body.nombre +"' ,'" + req.body.direccion + "', '" + req.body.ciudad + "', " + req.body.d10000 +" , " + req.body.d5000 + ", " + req.body.d2000 + ", " + req.body.d1000 +", " + req.body.d500 + ", " + req.body.d200 + ", " + req.body.d100 + ", " + req.body.d50 + ",'" + req.body.observaciones + "', '0', '" + date_format_str + "');";
    dbConnecion.query(sql, function(err,result){
        if(err) console.log(err)
        else{
            console.log(result);
        }
    })
  })