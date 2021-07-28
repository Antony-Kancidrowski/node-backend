/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

/**
 * 
 * @param {*} db 
 * @returns 
 */
 exports.getAllCakes = async (db) => {

  var cakes;

	try {

    cakes = await db.collection('cake').find({}).toArray();

	} catch (error) {

    if (error.status === undefined || isNaN(error.status)) {
      error.status = 500;
    }

    throw error;
  }
	
	return cakes;
}

/**
 * 
 * @param {*} cakeID 
 * @param {*} db 
 * @returns 
 */
exports.getCakeById = async (cakeID, db) => {

  var cake;

	try {

    const res = await db.collection('cake').findOne(
			{
				cakeID:cakeID
			});

      // TODO: Check result

      cake = res;

	} catch (error) {

    if (error.status === undefined || isNaN(error.status)) {
      error.status = 500;
    }

    throw error;
  }
	
	return cake;
}

/**
 * 
 * @param {*} cake
 * @param {*} db 
 * @returns 
 */
exports.createCake = async (cake, db) => {

	try {

    await this.validateCake(cake);
    
    const res = await db.collection('cake').insertOne(cake);

    // TODO: Check result

	} catch (error) {

    if (error.status === undefined || isNaN(error.status)) {
      error.status = 500;
    }

    throw error;
  }
	
	return cake;
}

/**
 * 
 * @param {*} cakeID 
 * @param {*} db 
 * @returns 
 */
exports.deleteCakeById = async (cakeID, db) => {
  
  var success;

	try {

    const res = await db.collection('cake').deleteOne(
			{
				cakeID:cakeID
			});

    // TODO: Check result

	} catch (error) {

    if (error.status === undefined || isNaN(error.status)) {
      error.status = 500;
    }

    throw error;
  }
	
	return success;
}

/**
 * 
 * @param {*} cakes 
 * @param {*} db 
 * @returns 
 */
exports.seedcakes = async (cakes, db) => {
  try {

    await db.collection('cake').deleteMany({});
    await db.collection('cake').insertMany(cakes);

  } catch(e) {
    console.log(e);

    throw { message: e.message, status: e.status || 400 }
  }

  return true;
}

exports.validateCake = async (cake) => {
  
  // Check Existence
	if (cake.cakeID == undefined) throw { message:"Missing cakeID", status: 400 }
	if (cake.name == undefined) throw { message:"Missing name", status: 400 }
  if (cake.comment == undefined) throw { message:"Missing comment", status: 400 }
	if (cake.imageUrl == undefined) throw { message:"Missing imageUrl", status: 400 }
  if (cake.yumFactor == undefined) throw { message:"Missing yumFactor", status: 400 }

  // Check restrictions
  if ((cake.yumFactor < 1) || (cake.yumFactor > 5)) throw { message:"Yum factor should be a number between 1 and 5 inclusive", status: 400 }
}