const express = require('express');
const {getAllcomponent,compatibleCpu, compatibleMotherboard, compatibleRAM, compatibleGPU, compatibleStorage, compatibleCooling} = require('../controllers/componentsController.js');
const router = express.Router();

router.get('/',getAllcomponent);
router.post('/cpu',compatibleCpu);
router.post('/motherboard',compatibleMotherboard);
router.post('/ram',compatibleRAM);
router.post('/gpu',compatibleGPU);
router.post('/storage',compatibleStorage);
router.post('cooling',compatibleCooling);

module.exports= router;