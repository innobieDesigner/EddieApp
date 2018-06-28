const express= require('express');
const mysql=require('mysql');

//Create connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'openingpage'
});
//Connect
db.connect((err) =>{
if  (err){
    throw err;
}
console.log('MySql Connected...');
});
//Using Express
const app=express();

//InsertToMySql --DB--openingpage---Table--Lists--
var datetime = new Date();
    console.log(datetime);
app.get('/addtomysql',(req, res) =>{
    let post= {List_Name:'Proba Lista', Created_Date:datetime, Created_By:'Petar Opacic'};
    let sql='INSERT INTO lists SET ?';
    let query=db.query(sql,post,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Added Successfully...')
    });
});


//InsertToMySql --DB--openingpage---Table--Created_List--
app.get('/addtomysql1',(req, res) =>{
    //Random Number for "ListID"
    const uniqueRandom = require('unique-random');
    const rand1 = uniqueRandom(1, 100000);
    //-------------------------------------
    let post= {ModelID:'model-00-11', ImageID:'img-00-11', ListID:rand1()};
    let sql='INSERT INTO created_list SET ?';
    let query=db.query(sql,post,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Added Successfully2...')
    });
});


//UpdateMySql --DB--openingpage---Table--Lists--
app.get('/update/:indx',(req, res) =>{
    let newName='asd Lista';//Name
    let sql=`UPDATE lists SET List_Name = '${newName}' WHERE indx = ${req.params.indx}`;
    let query=db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Updated Lists...')
    });
});


//UpdateMySql --DB--openingpage---Table--created_list--
app.get('/update1/:indx',(req, res) =>{
    let UpModelID='model-11-22';//ModelID
    let sql=`UPDATE created_list SET ModelID = '${UpModelID}' WHERE indx = ${req.params.indx}`;
    let query=db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Updated Created_List...')
    });
});

//ButtonOnClick OpeningPage ---> CreatorPage (Uj lista gomb) a.k.a #NewList
function newList(){
    window.location.href = "file:///C:/Node/creatorpage.html";
}


// Get the elements with class="column"
//var elements = document.getElementsByClassName("column");
// Declare a loop variable
var i;
// Grid View
function gridView(){
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "25%";
  }
}
//Selector
var strUser;
var strUser2;

function Selector(){
    var e = document.getElementById("modelss");
    strUser = e.options[e.selectedIndex].text;
    e.selectedIndex.text="";
}
function Selector2(){
    var e = document.getElementById("modelss");
    strUser2 = e.options[e.selectedIndex].text;
    e.selectedIndex.text="";
}
//PushFrom4.-to-3.
function PushToTable(){
  var content = document.getElementById("transfer1").text = strUser; 
  var x = document.getElementById("transfer1");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};

//HideSelected 4.
function HideEl() {
    var x = document.getElementById("transfer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

//-----
// handles the click event for link 1, sends the query
function getOutput() {
    getRequest(
        'create_json.php', // URL for the PHP file
         drawOutput,  // handle successful request
         drawError    // handle error
    );
    return false;
  }  
  // handles drawing an error message
  function drawError() {
      var container = document.getElementById('output');
      container.innerHTML = 'Bummer: there was an error!';
  }
  // handles the response, adds the html
  function drawOutput(responseText) {
      var container = document.getElementById('output');
      container.innerHTML = responseText;
  }
  // helper function for cross-browser request object
  function getRequest(url, success, error) {
      var req = false;
      try{
          // most browsers
          req = new XMLHttpRequest();
      } catch (e){
          // IE
          try{
              req = new ActiveXObject("Msxml2.XMLHTTP");
          } catch(e) {
              // try an older version
              try{
                  req = new ActiveXObject("Microsoft.XMLHTTP");
              } catch(e) {
                  return false;
              }
          }
      }
      if (!req) return false;
      if (typeof success != 'function') success = function () {};
      if (typeof error!= 'function') error = function () {};
      req.onreadystatechange = function(){
          if(req.readyState == 4) {
              return req.status === 200 ? 
                  success(req.responseText) : error(req.status);
          }
      }
      req.open("GET", url, true);
      req.send(null);
      return req;
  }


//Create JSON
function myFunct(){
    
    // EZ A SUBMIT BUTTON 
}

//Create JSON
app.get('/jsonn',(req, res) =>{
    var obj = {
        table: []
     };
     obj.table.push({id: 1, userID:234, model:"Bio1"});
     var data = JSON.stringify(obj);
     var fs = require('fs');
     fs.writeFile('MYFILE.json', data);
});












//Server Log
app.listen('3000',()=>{
    console.log('Server started on port 3000');
});