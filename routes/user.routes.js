const express = require('express');
const router = express.Router();
const user = require('../../nodejs2/controllers/user');

router.post('/signup', (req, res) => {
    const user = new user({
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(() => {
        res.status(201).json({ message: 'User created!' });
    }).catch(error => {
        res.status(400).json({ error });
    });
});

router.get('/all', (req, res) => {
    user.find().then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(400).json({ error });
    });
});

router.get('/find/:email', (req, res) => {
    user.findOne({ email: req.params.email }).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found!' });
        }
    }).catch(error => {
        res.status(400).json({ error });
    });
});
router.put('/update/:id', (req, res) => {
    user.findByIdAndUpdate(req.params.id, { ...req.body, _id: req.params.id }).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found!' });
        }
    }).catch(error => {
        res.status(400).json({ error });
    });
});

router.delete('/delete/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            res.status(200).json({ message: 'User deleted!' });
        } else {
            res.status(404).json({ message: 'User not found!' });
        }
    }).catch(error => {
        res.status(400).json({ error });
    });
});
module.exports = router;


