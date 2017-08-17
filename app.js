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
  // console.log(Book)
  // console.log(Books)
  });

  // app.get('/', function (req, res){
  //   Book.find().then(function(books){
  //     res.render('index', {Book:books} );
  //   }).catch(function(e){
  //     console.log('heres the problem: ',e)
  //   });
  // });

  // app.get('/', function (req, res) {
  //   // render a page template called index and pass an object
  //   mongoClient.connect(url, function(err, db) {
  //     if (err) {
  //       console.log('Error connecting to Mongo DB: ' + err);
  //     } else {
  //       findAllSenators(db, function(results) {
  //         res.render('index', { books:results});
  //       });
  //     }
  //   });
  // });

  app.get('/', function(request,response){
    Book.find().then (function(books){
      response.render('index', {Book : books})
    } );

});

app.listen(3000, function(){
  console.log('Server started');
});


// var car = new CoolCar({
//   model: ‘xx’,
//   name: ‘yy’,
//   specs: {
//     hp: 500,
//     topSpeed: 110
//   }
// })
//
// var otherCar = new CoolCar()
// otherCar.model = ‘xx’
// otherCar.name = ‘yy’
// otherCar.specs = { hp: 500, topSpeed: 110 }
//
// var thirdCar = new CoolCar()
// thirdCar.specs = {}
// thirdCar.specs.hp = 500
// thirdCar.specs.topSpeed = 110
//
// const Recipe = mongoose.model('Recipe', recipeSchema);
// var recipe = new Recipe({name: "Pancakes"});
// recipe.ingredients.push({ name: 'flour', quantity: '2 cups', type: 'baking' });
//
// app.get('/', function(request,response){
//   const Book = mongoose.model('Book', booksSchema);
//   var book = new Book({title: "Green Eggs and Ham" });
//   book.author:({firstName: 'Dr.', lastName: 'Suess' });
//   isbn:('122')
//   console.log(book.toObject());
//
// response.render('index', book );
//
//
// book.save().then(function(){
//   console.log("book saved");
//
// }).catch(function(){
//   console.log('mongo cant save this book');
//
//
// });
