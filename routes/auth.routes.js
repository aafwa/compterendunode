const express = require('express');
const router = express.Router();
const user = require('../../nodejs2/controllers/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../../nodejs2/middleware/authmiddleware');

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    user.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }
        const passwordIsValid = user.comparePassword(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }).catch(error => {
        res.status(500).json({ error: {} });
    });
});

router.post('/register', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    user.create(req.body).then(user => {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    }).catch(error => {
        res.status(400).json({ error: {} });
    });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/me', async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await user.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: error.message } });
    }
});

module.exports = router;



