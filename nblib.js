
const axios = require('axios');
const domain_key_map = {
    "test":{
            tld: "test",
            protocol:"1PuMeZswjsAM7DFHMSdmAGfQ8sGvEctiF5"
        }
};

var _default = {
    API:"https://api.nbdomain.com/v1/",
    token:"",
    debug:true
}
let config;
let log = console.log;
class NBLib{
    static config(option){
        config = {
            ..._default,
            ...option
        }
        if(config.debug==false)log=(msg)=>{};
    }
    static async getDomain(domain){
        const res = await NBLib.readDomain(domain);
        log(res);
        if(res.code==0){
            const inst = new NBLib(domain,res);
            return inst;
        }
        throw {code:1,message:domain+":is not registered"};
    }
	constructor(domain,res){
       this.info = res.obj;
       [this.nid,this.tld] = domain.split('.');
       this.config = domain_key_map[this.tld];
       log(this);
	}
    async updateKey(config){
        const filepay = require('filepay');
    }
    async updateUser(config){

    }
    async isOwner(address){
        return this.info.owner==address;
    }
 static async readDomain (domain){
 	const url = config.API+"?nid="+domain;
 	const myInit = {
            method: 'GET',
            headers: { 'content-type': 'application/json;charset=UTF-8', 'Authorization': 'Bearer '+config.token },
            mode: 'cors',
            cache: 'default'
        };
 	const res = await axios.get(url,myInit);
 	if(res){
 		return res.data;
 	}
 	return null;
 }
 static async getAll(address){
 	const url = this.API+"query/";
 	const option = {
            headers: { 'content-type': 'application/json;charset=UTF-8', 'Authorization': 'Bearer '+this.token },
            mode: 'cors',
            cache: 'default'
        };
    const data = {
    	"k":"owner",
    	"v":address,
    	"t":"e"
    }
    console.log(url);
 	const res = await axios.post(url,data,option);
 	if(res){
 		return res.data;
 	}
 	return null;
 }

}

module.exports = NBLib;