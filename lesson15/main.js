var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejslesson15');

var Cat = mongoose.model('Cat', {
     name:String,
     friends: [String],
     age:Number,
});

var kitty = new Cat({name:'yangyang',friends:['Tom','Jerry']});
kitty.age = 3;

kitty.save(function(err){
   if (err){
     console.log('error...');
   }
	console.log('added');
});
