/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

var MongoClient = require('mongodb').MongoClient;
const databaseConfig = require('./databaseConfig');

const cakes = require('../database/data/cakeSeedData');
const cakeDao = require('../dao/cakeDao');

/**
 * Create a mongodb connection and returns a single connection object
 * @param  {Boolean} test - Test DB or Production DB
 * @return       Database connection
 */
exports.createConnection = async (test) => {

	const db = await MongoClient.connect(databaseConfig.address.addressPrefix,{ useUnifiedTopology: true })
		.catch(err => { if (err) throw err; });
	  
  var dbo = (test) ? db.db(databaseConfig.address.test) : db.db(databaseConfig.address.production);

  dbo.close = () => {
    db.close();
	}

  dbo.db = db;

  return dbo;
}

/**
 * Create the collections if they do not exist
 * @param {Boolean} test - Test DB or Production DB
 */
exports.createCollections = async (test) => {
	const db = await this.createConnection(test);

	const collect = databaseConfig.collections;
	for (var i = 0; i < collect.length; i++) {

		const collection = collect[i];

    try {

      await db.createCollection(collection.name, collection.options);

      if (collection.index) {

        await db.collection(collection.name).createIndex(collection.index, {unique:true});
      }

    } catch(e) {}
	}

	await db.close();
}

/**
 * Seed the database with initial data
 * @param {*} test 
 */
exports.seedDatabase = async (test) => {
  const db = await this.createConnection(test);

  await cakeDao.seedcakes(cakes.cakeSeedData, db);

  await db.close();
}

this.createCollections();
this.createCollections(true);

this.seedDatabase();