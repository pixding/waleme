var EventProxy = require('eventproxy').EventProxy;
var config = require('../config').config;
var models = require('../models');
var IosApp = models.IosApp;

var app_ctrl = require('./appli');
var article_ctrl = require('./news');


exports.index = function(req,res,next){
	
	var proxy = new EventProxy();
	
	var render = function(gameapp,softapp,bannernew,hotnew){
		res.render('index',{
			gameapp:gameapp,
			softapp:softapp,
			bannernew:bannernew,
			hotnew:hotnew
		});
	}
	
	proxy.assign("gethotgame","gethotsoft","getbannernew","gethotnew",render);
	
	
	
	var gamequery = {category:1};
	var gameopt = { limit: 30, sort: [['sort', 'asc'],['gamesort', 'asc']] };
	app_ctrl.get_iosapps_by_query(gamequery,gameopt,function(err,gameapp){
		if(err){
			return next(err);
		}
		proxy.trigger("gethotgame",gameapp);
	})
	
	var softquery = {category:2};
	var softopt = { limit: 30, sort: [['sort', 'asc'],['gamesort', 'asc']] };
	app_ctrl.get_iosapps_by_query(softquery,softopt,function(err,softapp){
		if(err){
			return next(err);
		}
		proxy.trigger("gethotsoft",softapp);
	})
	
	var bannernewquery = {pos:1};
	var bannernewopt = {limit:5,sort: [['createtime', 'desc']]};
	article_ctrl.get_articles_by_query(bannernewquery,bannernewopt,function(err,bannernew){
		if(err){
			return next(err);
		}
		proxy.trigger("getbannernew",bannernew);
	})
	
	var hotnewquery = {pos:2};
	var hotnewopt = {limit:10,sort: [['createtime', 'desc']]};
	article_ctrl.get_articles_by_query(hotnewquery,hotnewopt,function(err,hotnew){
		if(err){
			return next(err);
		}
		proxy.trigger("gethotnew",hotnew);
	})
	
	
}