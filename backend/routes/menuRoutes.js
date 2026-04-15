import express from 'express';
import { getMenusByRestaurant, addMenu } from '../controllers/menuController.js';

const router = express.Router();

router.route('/:restaurantId')
    .get(getMenusByRestaurant);

router.route('/')
    .post(addMenu);

export default router;
