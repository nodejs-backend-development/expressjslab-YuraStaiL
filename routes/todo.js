const express = require('express');
const { getToDos, storeToDos } = require('../controllers/todo.controller');

const router = express.Router();

// Get to do
router.get('/:user', getToDos);

router.post('/:user', storeToDos)

module.exports = router;