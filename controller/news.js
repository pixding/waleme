var models = require('../models');
var Article = models.Article;
var EventProxy = require('eventproxy').EventProxy;
var config = require('../config').config;

exports.index = function(req,res,next){
	get_articles_by_query({},{},function(err,articles){
		if(err){
			return next(err);
		}
		res.render('news/list',{news:articles});
	
	})
	
}

exports.item = function(req,res,next){
	var aid = req.params.id;
	
	get_article_by_id(aid,function(err,article){
		res.render('news/item',{news:article});
	})
	

	
}

//搜索
exports.searchitem = function(req,res,next){
	var key = req.params.key;
	var pattern = new RegExp(key); 
	var opt = {"$or":[{title:pattern},{desc:pattern},{tags:{"$in":[key]}}]};
	get_articles_by_query(opt,{},function(err,articles){
		if(err){
			return next(err);
		}
		res.render('news/list',{news:articles});
	
	})
	

	
}


//通过ID查找某个文章
function get_article_by_id(id, cb) {
    Article.findOne({ _id: id }, function (err, article) {
        if (err) return cb(err, null);
        return cb(err, article);
    });
}


//通过条件，配置查找文章
function get_articles_by_query(query, opt, cb) {
    Article.find(query, null, opt, function (err, articles) {
        if (err) return cb(err);
        return cb(err, articles);
    });
}

exports.get_articles_by_query = get_articles_by_query;
