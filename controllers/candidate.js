///const  candidateModel = require("../models/candidate.js");
/*
module.exports = {
	AddCandidate(req, res) {
		const { company, position, salary, address } = req.body;
		const filename = req.file ? req.file.filename : "";

		candidateModel.addCandidate(company, position, salary, address, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},
	getPositionList(req, res) {
		const { page, size } = req.query;
		let totalPage = 0;
		positionModel.getPosition({}, (result) => {
			if (result && result !== "error") {
				totalPage = Math.ceil(result.length / size)
					//console.log(totalpage);
				positionModel.getPositionByPage(page, size, (result) => {
					res.json({
						ret:true,
						data:{
							list:result,
							totalPage:totalPage
							
						}
						
					})
				
				})
			}
		});
	},
		getPosition(req, res) {

		positionModel.getPositionById(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					info: (result && result !== 'error') ? result : false
				}
			})
		});
	},
	removePosition(req, res) {
		console.log(req.query.id)
		positionModel.removeItemById(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},
	updatePosition(req, res) {
		const {company, position, salary, address, id} = req.body;
		const filename = req.file ? req.file.filename : "";
		const params = {
			company,
			position,
			salary,
			address,
			filename
		}

		if (req.file && req.file.filename) {
			params.filename = req.file.filename
		}

		positionModel.updatePositionById(id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? true : false
				}
			})
		})
	}
	
*/
}
