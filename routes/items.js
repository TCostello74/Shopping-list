const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

router.get('/', (req, res) => {
    res.json(items);
});

router.post('/', (req, res) => {
    let newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

router.get('/:name', (req, res) => {
    let foundItem = items.find(i => i.name === req.params.name);
    if (foundItem === undefined) {
        res.status(404).send("Item not found");
    } else {
        res.json(foundItem);
    }
});

router.patch('/:name', (req, res) => {
    let foundItem = items.find(i => i.name === req.params.name);
    if (foundItem === undefined) {
        res.status(404).send("Item not found");
    } else {
        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        res.json({ updated: foundItem });
    }
});

router.delete('/:name', (req, res) => {
    let foundIndex = items.findIndex(i => i.name === req.params.name);
    if (foundIndex === -1) {
        res.status(404).send("Item not found");
    } else {
        items.splice(foundIndex, 1);
        res.json({ message: "Deleted" });
    }
});

module.exports = router;
