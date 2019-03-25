const express = require('express');
const router = express.Router();
const appRouter = require('./app')

router.use('/', appRouter);

module.exports = router;