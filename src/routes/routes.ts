import authRoutes = require('./authRoutes');
import userRoutes = require('./userRoutes');
import { Router } from 'express';
const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;