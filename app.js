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


mongoose.connect('mongodb://localhost:27017/booksdb');

const booksSchema = new mongoose.Schema({
  title: {type: String, required:true, unique:true},
  pages:Number,
  author: {firstName:String, lastName: String},
  isbn: {type:Number, unique:true},
  genre: [{type:String, lowercase: true}],
  synopsis: String,
  format:{type: String, lowercase:true,default:'book'}
});
app.get('/', function(request,response){
  const Book = mongoose.model('Book', recipeSchema);
  var book = new Book({author: "Mr. Brown Can Moo" });
  book.author.push({firstName: 'Doctor', lastName: 'Suess' });
  book.isbn.push('125')
  console.log(book.toObject());

response.render('index', book );


book.save().then(function(){
  console.log("book saved");

}).catch(function(){
  console.log('mongo cant save this book');


});
