const express = require('express');
const router = express.Router();

// @route GET users.
router.get('/users', async (req, res, next) => {
    try {
        console.log(req.body);
        const results = await pool.query('SELECT * FROM users');
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

module.exports = router;
