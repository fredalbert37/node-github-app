const { Router } = require('express');
const router = Router();
const { getCommits } = require('../controllers/commits');

/* This is a route handler. It is a function that 
will be called when the user visits the route. */
router.get('/commits/:page/:date', getCommits);

module.exports = router;