// Import Libraries
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//#### Apply middleware ####
// Use json
app.use(bodyParser.json());
// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Send all requests to index.html inside public folder
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// #### DataBase ####
// Connect MongoDB - Via Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// Import Models
var Ent = require('./model/ent.js');
var Gcp = require('./model/gcp.js');
var Usr = require('./model/usr.js');

// ############# Start APIs ##################
//TODO: Split in files. System's module 

// #### Begin ENT API - Entities ####

// Insert - TODO: implement error control
app.post('/ent', function(req, res){

    console.log(req.body)

    const ent = new Ent(req.body);
    ent.save().then(() => console.log('salved'));

    //console.log(ent)
 
    res.json(req.body);
 });

// Update - TODO: implement error control
app.put('/ent', function(req, res){

  Ent.replaceOne({_id: req.body._id}, req.body).then(() => console.log('alterou'));

  res.json(req.body);

});

// Read - TODO: implement error control.
//              change to app.get()
app.post('/ents', function(req, res){

    const o = req.body
    //console.log(o)

    Ent.find(o, {}, function(err, entsResponse){
      if(err){
        //throw err;
        console.log("# API GET BOOKS: ", err);
      }
      res.json(entsResponse);
    }).sort({ientt: 1, ient: 1});
});


// Delete - TODO: implement error control.
//                change to app.delete()
app.post('/entdelete', function(req, res){

  console.log("chegou")

  const ids = req.body
  console.log(ids)

  Ent.deleteMany({_id: {$in: ids}}, function(err, response){
    if(err){
      //throw err;
      console.log("# API DELETE BOOKS: ", err);
    }
    res.json(ids);
  })
  
});

// #### End ENT API ####

// #### Begin GCP API - General Codes and Parameters ####

 // Read - TODO: implement error control
 //              change to app.get()
 app.post('/gcps', function(req, res){

  const o = req.body
  //console.log(o)

  Gcp.find(o, {}, function(err, gcpsResponse){
    if(err){
      //throw err;
      console.log("# API GET GCPS: ", err);
    }
    res.json(gcpsResponse);

  }).sort({name: 1, code: 1});
});

// Insert - TODO: implement error control.
//                change to app.delete()
app.post('/gcp', function(req, res){

  //console.log(req.body)

  const gcp = new Gcp(req.body);
  gcp.save().then(() => console.log('saved'));

  res.json(gcp);
});

// Update - TODO: implement error control.
app.put('/gcp', function(req, res){

  Gcp.replaceOne({_id: req.body._id}, req.body).then(() => console.log('updated'));

  res.json(req.body);

});

// Delete - TODO: implement error control.
//                change to app.delete()
app.post('/gcpdelete', function(req, res){

  const ids = req.body
  console.log(ids)

  Gcp.deleteMany({_id: {$in: ids}}, function(err, response){
    if(err){
      //throw err;
      console.log("# API DELETE CODES/PARAMENTERS: ", err);
    }
    res.json(ids);
  })
  
});

// #### End GCP API ####

// #### Begin USR API - USERS ####

// Read - TODO: implement error control.
//              change to app.get()
 app.post('/usrs', function(req, res){

  const o = req.body

  Usr.find(o, {}, function(err, usrsResponse){
    if(err){
      //throw err;
      console.log("# API GET USERS: ", err);
    }
    res.json(usrsResponse);

  }).sort({name: 1, code: 1});
});

// Insert - TODO: implement error control.
app.post('/usr', function(req, res){

  const usr = new Usr(req.body);
  usr.save().then(() => console.log('saved'));

  res.json(usr);
});

// Update - TODO: implement error control.
app.put('/usr', function(req, res){

  Usr.replaceOne({_id: req.body._id}, req.body).then(() => console.log('updated'));

  res.json(req.body);

});

// Delete - TODO: implement error control.
//                change to app.delete()
app.post('/usrdelete', function(req, res){

  const ids = req.body
  console.log(ids)

  Usr.deleteMany({_id: {$in: ids}}, function(err, response){
    if(err){
      //throw err;
      console.log("# API DELETE USERS: ", err);
    }
    res.json(ids);
  })
  
});

// #### End USR API ####

// #### Begin UTIL or ANOTHER API ####

// Get Entity Types
 app.post('/getEntityTypes', function(req, res){

  Gcp.find({name: "ientt"}, function(err, entityTypesResponse){
    
    if(err){
      //throw err;
      console.log("# API GET ENTITY TYPES: ", err);
    }

    res.json(entityTypesResponse);

  }).sort({code: 1});

});

// #### End UTIL or ANOTHER API ####

app.listen(3000, function(){
    console.log('app is listening on port 3000.')
})