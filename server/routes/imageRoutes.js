const express = require('express');
const multer = require('multer');
const upload = multer();
const imageController = require('../controllers/imageController');

const router = express.Router();

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route works!' });
  });
  
router.post('/compare-image', upload.single('image'), imageController.processImage);


// Add other routes if needed

module.exports = router;
