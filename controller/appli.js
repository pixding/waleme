var EventProxy = require('eventproxy').EventProxy;
var config = require('../config').config;
var models = require('../models');
var IosApp = models.IosApp;

exports.index = function(req,res,next){
	
	var limit = config.applimit;
	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}
	var cate = "6014";
	
	if(req.params.category){
		cate = req.params.category;
	}
	
	var query =  {};
	query.categorys={"$in":[cate]};
	
	var opt = { skip: (page - 1) * limit, limit: limit, sort: [['sort', 'asc'],['gamesort', 'asc']] };
    
    var proxy = new EventProxy();
    
    var render = function(iosapps,count){
		if(page>Math.ceil(count/limit)){
			page = Math.ceil(count/limit);
		}
		
		res.render('app/ioslist',{
			iosapps:iosapps,
			page:page,
			totalCount:Number(count),
			category:cate
		});
	}
    proxy.assign("getapps","getcount",render);
    
    get_iosapps_by_query(query, opt, function (err, iosapps) {
    	if(err){
    		return next(err);
    	}
    	proxy.trigger("getapps",iosapps);
    });	
    get_count_by_query(query,function(err,count){
    	console.log(count);
    	proxy.trigger("getcount",count);
    })
}

exports.iositem = function(req,res,next){
	var appid = req.params.id;
	if(appid){
		var proxy = new EventProxy();
		var render = function(iosapp){
			res.render('app/item',{
				iosapp:iosapp
			});
		}
		proxy.assign("getapp",render);
		get_iosapp_by_id(appid,function(err,iosapp){
			if(err){
				return next(err);
			}
			proxy.trigger("getapp",iosapp);
		})
		
		
		
	}else{
		return next();
	}
}

//通过条件，配置查找应用
function get_iosapps_by_query(query, opt, cb) {
	query.img = {"$not":/main/,"$not":""};
    IosApp.find(query, null, opt, function (err, iosapps) {
        if (err) return cb(err);
        return cb(err, iosapps);
    });
}
//通过条件，配置查找应用
function get_count_by_query(query, cb) {
	query.img = {"$not":/main/,"$not":""};
    IosApp.count(query,function(err,count){
		if(err){
			return cb(err);
		}
		return cb(null,count);
	})
}

//通过appID查找某个应用
function get_iosapp_by_id(appid, cb) {
	
    IosApp.findOne({ appid: appid }, function (err, iosapp) {
        if (err) return cb(err, null);
        return cb(err, iosapp);
    });
}

exports.get_iosapps_by_query = get_iosapps_by_query;
