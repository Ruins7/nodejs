var async = require('async');

var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
 var delay = parseInt((Math.random() * 10000000) % 2000, 10);
 concurrencyCount++;
 console.log('concurrecy number is',concurrencyCount, ',now is',url,', time:',delay,' ms');
 setTimeout(function(){
     concurrencyCount--;
     callback(null,url + 'html content');
 }, delay);
};

var urls = [];
for(var i=0;i<30;i++){
  urls.push('https://cnodejs.org/');
}

async.mapLimit(urls,5, function(url, callback){
  fetchUrl(url, callback);
}, function(err,result){
    console.log('final:');
    console.log(result);
});
