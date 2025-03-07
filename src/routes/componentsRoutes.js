const express = require('express');
const {getAllcomponent,compatibleCpu, compatibleMotherboard, compatibleRAM, compatibleGPU} = require('../controllers/componentsController.js');
const router = express.Router();

router.get('/',getAllcomponent);
router.post('/cpu',compatibleCpu);
router.post('/motherboard',compatibleMotherboard);
router.post('/ram',compatibleRAM);
router.post('/gpu',compatibleGPU);

module.exports= router;