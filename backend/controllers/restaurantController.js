import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addRestaurant = async (req, res) => {
    const { name, description, imageUrl } = req.body;

    try {
        const restaurant = new Restaurant({
            name,
            description,
            imageUrl
        });

        const createdRestaurant = await restaurant.save();
        res.status(201).json(createdRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
