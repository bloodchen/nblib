
const axios = require('axios');

var _default = {
    API:"https://api.nbdomain.com/v1/",
    token:"",
    debug:true
}
let config;
let log = console.log;
let filepay = null;
let bitID = null;
let miner = null;

const tld_config = {
    test:{
        protocol:"1PuMeZswjsAM7DFHMSdmAGfQ8sGvEctiF5"
    }
}
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
        log("getting domain:"+domain+"\n",res);
        if(res.code==0){
            const inst = new NBLib(domain,res);
            return inst;
        }
        throw {code:1,message:domain+":is not registered"};
    }
    static async regDomain(domain){

    }
	constructor(domain,res){
       this.info = res.obj;
       [this.nid,this.tld] = domain.split('.');
       this.config = tld_config[this.tld];
       //log(this);
	}
    setPrivateKey(privateKey){
        filepay = require('filepay');
        if(!filepay){
            throw "please npm i filepay";
        }
        bitID = require('bitidentity');
        if(!bitID){
            throw "please npm i bitidentity";
        }
        const Craft = require("minercraft");
        if(!Craft){
            throw "please npm i minercraft";
        }
        miner = new Craft({
          //url: "https://merchantapi.matterpool.io",
          url: "https://merchantapi.taal.com",
          //url: "https://www.ddpurse.com/openapi",
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.pKey = privateKey;
        /*this.pKey = filepay.bsv.PrivateKey.fromWIF(privateKey);
        const pubKey = filepay.bsv.PublicKey.fromPrivateKey(this.pKey);
        log(pubKey.toHex());
        let address = filepay.bsv.Address.fromPublicKey(pubKey);
        log(address.toString());*/
    }
    async updateKey(kv,bUser=false){
        if(!this.pKey){
            throw "please setPrivateKey first";
        }
        return new Promise(async resolve=>{
        const config = {
            data:[this.config.protocol,this.nid,bUser?"user":"key",JSON.stringify(kv)],
            pay:{
                key:this.pKey,
                feeb: 0.5,
                to: [ {
                      protocol:"bitIdentity",
                      value: { privateKey: this.pKey } 
                 }]
            }
        }
            const rawtx = await bitID.gentx(config);
            if(rawtx){
                let res = await miner.tx.push(rawtx);
                resolve(res);
            }
        });

    }
    async updateUser(kv){
        return await updateKey(kv,true);
    }
    async readKey(key){
        return await NBLib.readDomain(key+'.'+this.domain);
    }
    async readUser(user){
        return await NBLib.readDomain(key+'@'+this.domain);
    }
    async isOwner(address){
        return this.info.owner==address;
    }
    static async _getAPI(para){
        const url = config.API+para;
        const myInit = {
                method: 'GET',
                headers: { 'content-type': 'application/json;charset=UTF-8', 'Authorization': 'Bearer '+config.token },
                mode: 'cors',
                cache: 'default'
            };
            try{
                const res = await axios.get(url,myInit);
                if(res){
                    return res.data;
                }
            }catch(e){
                log(e);
            }
        return null;
    }
    static async getTLDinfo(){
        return await this._getAPI("tld");
    }
 static async readDomain (domain,full=false){
 	const para = "?nid="+domain+"&full="+full;
 	return await this._getAPI(para);
 }
 static async domainFromAddress(address){
 	const url = config.API+"find_domain?address="+address;
 	const option = {
            method: 'GET',
            headers: { 'content-type': 'application/json;charset=UTF-8', 'Authorization': 'Bearer '+this.token },
            mode: 'cors',
            cache: 'default'
        };
 	const res = await axios.get(url,option);
 	if(res){
 		return res.data;
 	}
 	return null;
 }

}

module.exports = NBLib;