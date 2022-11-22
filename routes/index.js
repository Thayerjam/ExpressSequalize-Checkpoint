const express = require('express');
const app = require('../app');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.


router.get('/', (req, res) => {
    try {
        res.json(todos.listPeople());
    } catch (err) {
        throw err
    }
});

router.get('/:name/tasks', (req, res) => {
    try {
        const personName = todos.list(req.params.name);
        if (!personName) {
            let err = new Error();
            err.status = 404;
            throw err;
        } else if (req.query.status === 'complete') {
            res.json(todos.listCompleted(req.params.name));
        } else if (req.query.status === 'active') {
            res.json(todos.listActive(req.params.name));
        } else {
            res.json(personName);
        }
    } catch (err) {
        throw err;
    }
});

router.post('/:name/tasks', (req, res, next) => {
    try {
        if (!req.body.content) {
            let err = new Error();
            err.status = 400;
            throw err;
        } else {
            const name = req.params.name;
            todos.add(name, req.body);
            const list = todos.list(name);
            res.status(201).json(list[list.length-1]);
        }
    } catch (err) {
        throw err;
    }
});

router.put('/:name/tasks/:index', (req, res, next) => {
    try {
        todos.complete(req.params.name, req.params.index);
        res.sendStatus(200);
    } catch (err) {
        throw err;
    }
});

router.delete('/:name/tasks/:index', (req, res, next) => {
    try {
        todos.remove(req.params.name, req.params.index);
        res.sendStatus(204);
    } catch (err) {
        throw err;
    }
});