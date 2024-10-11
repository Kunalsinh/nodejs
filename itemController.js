const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res
                .status(404)
                .json({ success: false, message: 'Item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ success: false, message: 'Item not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
exports.createItem = async (req, res) => {
    try {
        const { name } = req.body;

        const newItem = await Item.create({ name });

        res.status(201).json({ success: true, data: newItem });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(
                (val) => val.message
            );
            return res.status(400).json({ success: false, errors: messages });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Public
exports.updateItem = async (req, res) => {
    try {
        const { name } = req.body;

        let item = await Item.findById(req.params.id);
        if (!item) {
            return res
                .status(404)
                .json({ success: false, message: 'Item not found' });
        }

        item.name = name || item.name;

        await item.save();

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ success: false, message: 'Item not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res
                .status(404)
                .json({ success: false, message: 'Item not found' });
        }

        await item.remove();

        res.status(200).json({ success: true, message: 'Item removed' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ success: false, message: 'Item not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
