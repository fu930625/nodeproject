var mongoose = require('../utils/database.js')
	
	var User = mongoose.model('user',{
	username: String,
	password: String
});

module.exports= {
	register:function(username,password,cb){  
		var user = new User({
			username:username,
			password:password
		});
		user.save(function(err){
			cb(err)
		})
	},
	findUser(findParams = {},cb){
//		console.log(findParams)
		User.findOne(findParams).then((result)=>{
		console.log(result)
	     	cb(result)	
		}).catch(()=>{
			cb("error")
		})
	}
	
	
	
}
