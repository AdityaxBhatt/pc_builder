const express = require('express');
const {getAllcomponent,compatibleCpu, compatibleMotherboard} = require('../controllers/componentsController.js');
const router = express.Router();

router.get('/',getAllcomponent);
router.post('/cpu',compatibleCpu);
router.post('/motherboard',compatibleMotherboard);

module.exports= router;