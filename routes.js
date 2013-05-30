/**
 * @author djqq
 */
var index = require('./controller/index.js');
var news = require('./controller/news.js');
var appli = require('./controller/appli.js');
exports = module.exports = function(app){
	
	app.get('/',index.index);
	
	app.get('/news/',news.index);
	app.get('/news/:id',news.item);
	app.get('/search/news/:key',news.searchitem);
	
	app.get('/app/ioslist/',appli.index);
	app.get('/app/ioslist/:category/p_:page',appli.index);
	app.get('/app/ioslist/p_:page',appli.index);
	app.get('/app/ioslist/:category',appli.index);
	app.get('/app/ios/:id',appli.iositem);
	
	app.get('*',function(req,res){
		res.json({res:"404"});
	})
}




