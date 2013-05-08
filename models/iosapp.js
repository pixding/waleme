var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var IosAppSchema = new Schema({
    appid: { type: String },
    name: { type: String },
    summary: { type: String },
    link: { type: String },
    categorys:{type:Array,default:[]},
    category: { type: String,default:1 },  //1游戏，2软件
    price: { type: Number },
    ishot:{type:Number, default:0},
    img: { type: String },
    releasedate: { type: String },
    sort: { type: Number,default:0 },
    gamesort: { type: Number,default:0},
    artist:{type:String},
    
    
    size:{type:String},
    version:{type:String},
    language:{type:String},
    systemneed:{type:String},
    score:{type:Number,default:0},
    relateimg:{type:Array,default:[]},
    relateromoteimg:{type:Array,default:[]},
    isupdate:{type:Number,default:0},//1已经更新，2没有更新
    
    visitcount:{type:Number,default:0}
});

mongoose.model('IosApp', IosAppSchema);