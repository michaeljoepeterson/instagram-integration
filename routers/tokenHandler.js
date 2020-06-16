const { INSTA_URL_REFRESH } = require("../config");
const request = require('request');

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

    async UpdateToken(newTokenData,oldToken){
        console.log('updating token: ',newTokenData,oldToken);

        return this.instaModel.findOneAndUpdate({'token':oldToken.token},{
            $set:newTokenData
        },{
            useFindAndModify:false,
            new : true 
        });
    }

    async GetToken(){
        let tokenData = {
            timestamp:new Date(),
            token:null
        };
        const newUrl = INSTA_URL_REFRESH + this.token;

        const options = {
			url:newUrl
		};
        let promise = new Promise((resolve,reject) =>{
            request(options,function(error,response,body){
                console.log('req err: ',error);
                const parsedBody = JSON.parse(body);
                console.log('req body:',parsedBody);
                tokenData.token = parsedBody.access_token;
                resolve(tokenData);
            });
        });

        return promise;
		
    }

    async CreateToken(token){
        console.log('creating token')
        const now = new Date();
        this.instaModel.create({
            token:this.token,
            timestamp:now
        });
    }

    //check the results and return the token or set the err if err
    async CheckResults () {
        let tokenData = {
            err:null,
            token:this.token
        };
        //add token
        if(this.instaResults.length === 0){
            await this.CreateToken(tokenData.token);

            return tokenData;
        }
        else if(this.instaResults.length === 1){
            let insta = this.instaResults[0];
            let refresh = this.checkDate(insta.timestamp);
            console.log(refresh);
            if(!refresh){
                tokenData.token = insta.token;
                return tokenData;
            }
            else{
                const newTokenData = await this.GetToken();
                return this.UpdateToken(newTokenData,tokenData);
            }
            
        }
        else{
            this.err = {
                message:'Issue with data'
            };
            tokenData.err = this.err;
            return tokenData;
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