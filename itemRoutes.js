const express = require('express');
const router = express.Router();
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
} = require('../controllers/itemController');

// Define routes
router.route('/items').get(getAllItems).post(createItem);
router
    .route('/items/:id')
    .get(getItemById)
    .put(updateItem)
    .delete(deleteItem);

module.exports = router;
