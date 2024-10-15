import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { Router } from 'express';

const allRoutes = Router();

allRoutes.use('/auth', authRoutes);
allRoutes.use('/user', userRoutes);

export default allRoutes;