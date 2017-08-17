const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

app.engine( 'mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/books');

const booksSchema = new mongoose.Schema({
  title: {type: String, required:true, unique:true},
  pages:Number,
  author:{firstName:String, lastName: String},
  isbn: {type:Number, unique:true},
  genre: {type:String, lowercase: true},
  synopsis: String,
  format:{type: String, lowercase:true,default:'book'},
  imageURL:String

});
const Book = mongoose.model('Book', booksSchema);
var book = new Book({
  title: 'The Hungry Caterpillar',
  pages:20,
  author: {firstName: 'Eric' ,
           lastName:' Carle'},
  isbn: 122,
  genre: 'drama',
  synopsis:  'A greedy Caterpillar becomes a butterfly.',
  format:'book',
  imageURL:'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/HungryCaterpillar.JPG/220px-HungryCaterpillar.JPG'

});

book.save().then(function(){
  console.log("book saved");

}).catch(function(){
  console.log('mongo cant save this book');

  });

  app.get('/', function(request,response){
    Book.find().then (function(books){
      response.render('index', {Book : books})
    } );

});

app.listen(3000, function(){
  console.log('Server started');
});
