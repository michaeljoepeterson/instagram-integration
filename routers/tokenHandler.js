const { time } = require("console");

class TokenHandler{
    err = null;
    token = null;
    instaResults = null;
    instaModel = null;
    refreshDays = 30;

    constructor(instaResults,instaModel,token){
        this.instaResults = instaResults;
        this.instaModel = instaModel;
        this.token = token;
    }
    //check if should refresh
    checkDate(timestamp){
        const today = new Date();
        const diffTime = Math.abs(today - timestamp);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffDays);
        if(diffDays < this.refreshDays){
            return false;
        }
        else{
            return true;
        }
    }

    //check the results and return the token or set the err if err
    CheckResults = () =>{

        //add token
        if(this.instaResults.length === 0){
            const now = new Date();
            this.instaModel.create({
                token:this.token,
                timestamp:now
            });
        }
        else if(this.instaResults.length === 1){
            let insta = this.instaResults[0];
            let refresh = this.checkDate(insta.timestamp);

            if(!refresh){
                return this.token;
            }
            else{

            }
            
        }
        else{
            this.err = {
                message:'Issue with data'
            };
            return null;
        }
        
    }
}
/*
function TokenHandler(instaResults,instaModel){
    this.err = null;
    this.token = null;
    this.instaResults = null;
    this.instaModel = null;
    this.constructor(instaResults,instaModel)
}

TokenHandler.prototype.constructor = function(options){
    this.instaResults = instaResults;
    this.instaModel = instaModel;
    console.log('test in constructor');
};

TokenHandler.prototype.CheckResults = function(){
    this.token = "123";
    return this.token;
};
*/
module.exports = {TokenHandler};