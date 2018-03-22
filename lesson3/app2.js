// 引入依赖
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

// 建立 express 实例
var app = express();

app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://readhub.me/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var sponses = [];
      var titles = [];
      $('#root .nc_clearfix > a > div').each(function (idx, element) {
        var $element = $(element);
        sponses.push({
          url: $element.attr('title'),
        });
      });

      $('#itemList .topicItem___3YVLI').each(function (idx, element) {
        var $element = $(element);
        var subele = $element.children('h2').text();
        titles.push({
          title : subele,
        });
      });
      //console.log(titles);
      res.send(titles);
    });
});

app.listen(process.env.PORT || 5500);
