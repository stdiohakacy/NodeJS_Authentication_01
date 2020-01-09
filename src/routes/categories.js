const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.get('/category/:id', categoryController.findByPK);
router.get('/categories', categoryController.findAll);
router.post('/category', categoryController.create);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);

module.exports = router;
