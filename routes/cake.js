/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

const cakeDao = require('../dao/cakeDao');
const databaseCreator = require('../database/databaseCreator');

const Router = require('koa-router');
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'});

const uuid = require('uuid');

const router = Router({
    prefix: '/api/v1.0.0/cake'
});

/**
 * Get the Cake API version
 */
router.get('/version',
  koaBody,
  async(ctx) => {
    ctx.body = { message:"Success", version: "v1.0.0" };
    ctx.response.status = 200;
  }
);

/**
 * 
 */
 router.get('/getcakes',
 koaBody,
 async(ctx) => {

   var db = await databaseCreator.createConnection();

   try {

     const cakes = await cakeDao.getAllCakes(db);
 
     ctx.body = { message: "Success", cakes: cakes };
     ctx.response.status = 200;

   } catch(error) {
       
     ctx.response.status = error.status || 400;
     ctx.body = { message:error.message };
   } finally {

       db.close();
   }
 }
);

/**
 * 
 */
router.get('/getcake/:cakeid([A-F0-9\-]{1,})',
  koaBody,
  async(ctx) => {

    var db = await databaseCreator.createConnection();

    try {

      const cakeID = ctx.params.cakeid;

      const cake = await cakeDao.getCakeById(cakeID, db);
  
      ctx.body = { message: "Success", cake: cake };
      ctx.response.status = 200;

    } catch(error) {
        
      ctx.response.status = error.status || 400;
      ctx.body = { message:error.message };
    } finally {

        db.close();
    }
  }
);

/**
 * 
 */
router.post('/createcake',
  koaBody,
  async(ctx) => {

    var db = await databaseCreator.createConnection();

    try {

      const body = ctx.request.body;
      var cakeDetails = body.cakeDetails;

      const cakeID = uuid.v4();

      var cake = {cakeID: cakeID, ...cakeDetails };

      await cakeDao.createCake(cake, db);

    } catch(error) {
        
      ctx.response.status = error.status || 400;
      ctx.body = { message:error.message };
    } finally {

        db.close();
    }
  }
);

/**
 * 
 */
router.delete('/deletecake/:cakeid([A-F0-9\-]{1,})',
  koaBody,
  async(ctx) => {

    var db = await databaseCreator.createConnection();

    try {

      const cakeID = ctx.params.cakeid;

      await cakeDao.deleteCakeById(cakeID, db);

      ctx.body = { message: "Success" };
      ctx.response.status = 200;

    } catch(error) {
        
      ctx.response.status = error.status || 400;
      ctx.body = { message:error.message };
    } finally {

        db.close();
    }
  }
);

module.exports = router;