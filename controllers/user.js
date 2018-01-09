   const userModel = require("../models/user.js")
   const crypto = require("crypto");
   
   module.exports = {
   	register: (req, res) => {
   		const { username, password } = req.body;
   		//采用sha256这种算法对密码进行加密
       const hash = crypto.createHash('sha256');
          hash.update(password );
          
   		userModel.findUser({username: username},(result) =>{
   			 
   			if (result && result !== "error") {
// 				console.log(result)
   				res.json({
   					ret: true,
   					data: {
   						register: false
   					}
   				})
   			} else {
   				
   				//hash.digest('hex')表示开始加密生成一个16进制的字符串
   				userModel.register(username, hash.digest('hex'), (err) => {
   					res.json({
   						ret: true,
   						data: {
   							register: !err
   						}
   					})
   				})
   			}	
   		})
   	},
login: (req, res) => {
		const {username, password} = req.body;
		const hash = crypto.createHash('sha256');

		hash.update(password);
        console.log(username,password)
		userModel.findUser({
			username: username,
			password: hash.digest('hex')
		}, (result) => {
			if (result && result !== "error") {
				req.session.username = username;
			}
			res.json({
				ret: true,
				data: {
					login: (result && result !== "error") ? true : false
				}
			})
		})
	},
	//是否的登录成功
		isLogin: (req, res) => {
		res.json({
			ret: true,
			data: {
				isLogin: req.session.username ? true : false
			}
		})
	},
    	logout: (req, res) => {
		req.session = null;
		res.json({
			ret: true,
			data: {
				logout: true
			}
		})
	},
	
   }






 	