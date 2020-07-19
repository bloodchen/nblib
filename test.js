const NBLIB = require('./nblib.js');
NBLIB.config({
	API:"https://manage.nbdomain.com/node/",
	token:"02a43685fc7613626164d36555f7bfee2adafa4f4d35d2816860c61aca15505c58",
	debug:true
});

const address = "18HWams3diHEsFCY8UAR2vNL8AxENdnE5Z";
(async ()=>{
	const tld = await NBLIB.getTLDinfo();
	console.log(tld);
	const info = await NBLIB.domainFromAddress("18HWams3diHEsFCY8UAR2vNL8AxENdnE5Z");
	console.log(info);
	const domain = await NBLIB.getDomain("1020.test");
	const isOwner = await domain.isOwner(address);
	console.log(isOwner);
	domain.setPrivateKey("L2Xp8LEbUKYgrij9jxhrbkw9UfVuRtuoPk1TZzDoPQgGTLvnyxhb");
	const kv = {
		test:{
			t:"test",
			author:"me"
		}
	}
	const ret = await domain.updateKey(kv);
	console.log(ret);

})();