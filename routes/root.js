const express = require('express');
const router = express.Router();
const vansController = require('../controllers/vansController');

router.route('/')
  .get(vansController.getAllVans)

// router.route('/:id')
//   .get(vansController.getVan) 

module.exports = router; 