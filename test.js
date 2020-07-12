const NBLIB = require('./nblib.js');
NBLIB.config({
	API:"https://manage.nbdomain.com/node/",
	token:"02a43685fc7613626164d36555f7bfee2adafa4f4d35d2816860c61aca15505c58",
	debug:true
});

const address = "15bibvjHN2EBbdxWeRncwZkLZfEW7DJBxP";
(async ()=>{
	//const info = await nbapi.getAll("15bibvjHN2EBbdxWeRncwZkLZfEW7DJBxP");
	//console.log(info);
	const d1001 = await NBLIB.getDomain("1001.test");
	const isOwner = await d1001.isOwner(address);
	console.log(isOwner);
	const config = {
		domain:"1001.test",
		key:"name",
		value:{
			t:"note",
			author:"jeff",
			message:"good work"
		},
		idKey:"",
		payKey:""
	}
	const ret = await d1001.updateKey(config);

})();