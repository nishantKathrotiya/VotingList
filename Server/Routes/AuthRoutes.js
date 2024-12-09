const express = require("express")
const router = express.Router();

const { createUser , login } = require('../Controller/Auth');

router.post('/create', createUser);
router.post('/login', login);


module.exports = router;