var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
  
var ArticleSchema = new Schema({
  title: { type: String },
  content: { type: String,default:"" },
  desc:{type:String},
  imgname:{type:String},
  arttype:{type:Number,default:0},
  pos:{type:Number,default:0}, //1、首页banner 2、最近热门
  author:{type:String},
  tags:{type:Array,default:[]},
  createtime:{type: Date, default: Date.now},
  readcount:{type:Number,default:1},
  relateappid:{type:String,default:""},
  top:{type:Boolean,default:false}//是否置顶
});

mongoose.model('Article', ArticleSchema);