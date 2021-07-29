/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

const cakeDao = require('../dao/cakeDao');

const databaseCreator = require('../database/databaseCreator.js');

/**
 * Clear the test database
 */
describe('clearCakeCollection', () => {
  test('Remove Cake data', async () => {
    expect.assertions(0);

    const db = await databaseCreator.createConnection(true);

    await db.collection('cake').deleteMany({});

    db.close();
    
  });
});

/**
 * 
 */
describe('createACake', () => {
	test('Create a valid cake', async () => {
		expect.assertions(0);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      name: "Black Forest Gataux",
      comment: "Rich, dark and exceedingly good.",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg",
      yumFactor: 5
		}

		const res = await cakeDao.createCake(cakedetails, db);

		db.close();
	});
});

/**
 * 
 */
 describe('missingCakeId', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      name: "Black Forest Gataux",
      comment: "Rich, dark and exceedingly good.",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg",
      yumFactor: 5
		}

    try {
		  await cakeDao.createCake(cakedetails, db);

    } catch (e) {

      expect(e.message).toMatch('Missing cakeID')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('missingName', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      comment: "Rich, dark and exceedingly good.",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg",
      yumFactor: 5
		}

    try {
      await cakeDao.createCake(cakedetails, db);

    } catch (e) {

      expect(e.message).toMatch('Missing name')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('missingComment', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      name: "Black Forest Gataux",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg",
      yumFactor: 5
		}

    try {
		  await cakeDao.createCake(cakedetails, db);

    } catch (e) {

      expect(e.message).toMatch('Missing comment')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('missingImageUrl', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      name: "Black Forest Gataux",
      comment: "Rich, dark and exceedingly good.",
      yumFactor: 5
		}

    try {
		  await cakeDao.createCake(cakedetails, db);

    } catch (e) {

      expect(e.message).toMatch('Missing imageUrl')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('missingYumFactor', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      name: "Black Forest Gataux",
      comment: "Rich, dark and exceedingly good.",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg"
		}

    try {
		  await cakeDao.createCake(cakedetails, db);

    } catch (e) {

      expect(e.message).toMatch('Missing yumFactor')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('yumFactorTooBig', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      name: "Black Forest Gataux",
      comment: "Rich, dark and exceedingly good.",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg",
      yumFactor: 6
		}

    try {
		  await cakeDao.createCake(cakedetails, db);
    } catch (e) {

      expect(e.message).toMatch('Yum factor should be a number between 1 and 5 inclusive')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('yumFactorTooSmall', () => {
	test('Create an invalid cake', async () => {
		expect.assertions(1);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "0308017a-31c5-46cb-86b2-e744601b33b5",
      name: "Black Forest Gataux",
      comment: "Rich, dark and exceedingly good.",
      imageUrl: "17a03080-1c35-b46c-b286-744601be33b5.jpeg",
      yumFactor: 0
		}

    try {
		  await cakeDao.createCake(cakedetails, db);
    } catch (e) {

      expect(e.message).toMatch('Yum factor should be a number between 1 and 5 inclusive')
    }

		db.close();
	});
});

/**
 * 
 */
 describe('test', () => {
	test('Create an valid cake', async () => {
		expect.assertions(0);

		const db = await databaseCreator.createConnection(true);

		const cakedetails = {
      cakeID: "17a03080-46cb-31c5-86b2-e744601b33b5",
      name: "1",
      comment: "2",
      imageUrl: "3",
      yumFactor: 4
		}

    const res = await cakeDao.createCake(cakedetails, db);

		db.close();
	});
});