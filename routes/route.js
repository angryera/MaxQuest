const express = require('express');
const router = express.Router();
router.get("/user/register", (req, res) => {
    res.json({ success: true });
    
});




module.exports = router;