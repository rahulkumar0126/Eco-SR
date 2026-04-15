import Menu from '../models/Menu.js';

export const getMenusByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const menus = await Menu.find({ restaurantId });
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addMenu = async (req, res) => {
    const { restaurantId, name, price, description, imageUrl } = req.body;

    try {
        const menu = new Menu({
            restaurantId,
            name,
            price,
            description,
            imageUrl
        });

        const createdMenu = await menu.save();
        res.status(201).json(createdMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
