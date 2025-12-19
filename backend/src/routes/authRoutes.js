const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/authControllers');

router.post('/register', createUser);
router.post('/login', loginUser);


<<<<<<< HEAD
=======

>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c
module.exports = router;
