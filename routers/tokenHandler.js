const { INSTA_URL_REFRESH } = require("../config");

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
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 50; 
        console.log(diffDays);
        if(diffDays < this.refreshDays){
            return false;
        }
        else{
            return true;
        }
    }

    async UpdateToken(newTokenData,oldToken){
        let tokenData = {
            err:null,
            token:'test'
        };

        return this.instaModel.findOneAndUpdate({'token':oldToken.token},{
            $set:newTokenData
        },{
            useFindAndModify:false
        });
    }

    async GetToken(oldToken){
        let tokenData = {
            timestamp:new Date(),
            token:'123'
        };
        const newUrl = INSTA_URL_REFRESH + this.token;
        const options = {
			url:newUrl
		};
        /*
		request(options,function(error,response,body){
			//console.log(body);
			const parsedBody = JSON.parse(body);
			resolve(parsedBody);
        });
        */
        return tokenData;
    }

    //check the results and return the token or set the err if err
    async CheckResults () {
        let tokenData = {
            err:null,
            token:this.token
        };
        //add token
        if(this.instaResults.length === 0){
            const now = new Date();
            this.instaModel.create({
                token:this.token,
                timestamp:now
            });

            return tokenData
        }
        else if(this.instaResults.length === 1){
            let insta = this.instaResults[0];
            let refresh = this.checkDate(insta.timestamp);
            console.log(refresh);
            if(!refresh){
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