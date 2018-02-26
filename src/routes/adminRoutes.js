import express from 'express';

const adminRouter = express.Router();

adminRouter.route('/addTodos')
  .get((req, res) => {
    res.send('inserting books');
  });


module.exports = adminRouter;
