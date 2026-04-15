import express from 'express';
import { getRestaurants, addRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();

router.route('/')
    .get(getRestaurants)
    .post(addRestaurant);

export default router;
