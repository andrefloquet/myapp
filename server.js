
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// APIs
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

var entSchema = mongoose.Schema({
    ientt: String,
    ient: String
});

const Ent = mongoose.model('Ent', entSchema);

//----->>> INSERT ENT <<<----------
app.post('/ent', function(req, res){

    //console.log(req.body)

    const ent = new Ent(req.body);
    ent.save().then(() => console.log('salvou'));
 
    res.json(ent);
 });

 //----->>> UPDATE ENTS <<<----------
app.put('/ent', function(req, res){

  Ent.replaceOne({_id: req.body._id}, req.body).then(() => console.log('alterou'));

  res.json(req.body);

});

 //----->>> GET ENTS <<<----------
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

//----->>> DELETE ENTS <<<----------
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
*/
 

app.listen(3000, function(){
    console.log('app is listening on port 3000.')
})