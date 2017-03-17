/**
 * Created by marcofalsitta on 22.01.17.
 *
 */
'use strict';

let fs = require('fs');
let Store = require('../lib/Store');

class Server{

	constructor(expressServer){
		this.rest = expressServer;
		/** @Store */
		this.fruitStore = null;

		this.setRoutes();

	}
	
	start(port){

		return new Promise((resolve, reject)=>{
			let self = this;

			this.rest.listen(port, function(){
				resolve(this, self);
			}).on('error', function(error){
				console.error(error);
				reject(error);
			});

		});
	}

	setStore(_store){
		this.fruitStore = _store;
	}

	setRoutes(){

		let self = this;

		this.rest.get('/', (req, res)=>{
			
			fs.readFile('./public/index.html', {encoding:'utf-8'}, (error, data)=>{
				if(error){
					console.error(error);
					res.send(null);
				}
				else{
					res.send(data);
				}
			});

		});

		this.rest.post('/cashIn', (req, res)=>{

			console.log(">>", req.body);

			res.status(200).json({ ex:321});
		});

		this.rest.post('/getOffers', (req, res)=>{
			let allOffers = [];
			if(self.store !== null){
				allOffers = self.fruitStore.getOffers();
			}
			res.status(200).json({offers:allOffers});
		});

		this.rest.post('/getCatalog', (req, res)=>{
			let catalog = [];
			if(self.store !== null){
				catalog = self.fruitStore.getCatalog();
			}
			res.status(200).json({catalog:catalog});
		});

		//this.rest.post('/', (req, res)=>{
		//	res.status(200).json({ ex:"***"});
		//});


		//this.rest.get('/prod/:sku', (req, res)=>{
		//	res.status(200).json({ ex:123});
		//});

	}
	
}

module.exports = Server;