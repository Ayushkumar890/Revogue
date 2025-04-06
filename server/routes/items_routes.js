const express = require('express');
const { deleteItem, addItems, getItems, getAllItems } = require('../controller/items_controller');
const router = express.Router();

router.post('/addProduct',addItems)
router.delete('/delete/:productNumber', deleteItem);
router.get('/getProducts',getItems)
router.get('/',getAllItems)


module.exports = router;
