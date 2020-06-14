const mongoose = require('mongoose');

const instaSchema = mongoose.Schema({
    token:{type:String,required:true},
    timestamp:{type:Date,required:true,unique:true}
},{minimize:false});

instaSchema.methods.serialize = function(){
	return{
        token: this.token || '',
        timestamp:this.timestamp
	};
};
//check if timestamp is still valid
//refresh approx every month
instaSchema.methods.checkTimestamp = function(today){
    let diff = today - this.timestamp;
    let days = Math.floor(diff / (1000*60*60*24));
    if(days <= 30){
        return true;
    }
    else{
        return false;
    }
};

const Insta = mongoose.model("Insta",instaSchema);

module.exports = {Insta};