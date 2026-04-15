import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Restaurant from './models/Restaurant.js';
import Menu from './models/Menu.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Menu.deleteMany();
        await Restaurant.deleteMany();
        await User.deleteMany();

        console.log('Previous Data Destroyed...');

        const restaurants = [
            {
                name: 'The Punjabi Dhaba',
                description: 'Authentic North Indian cuisine rich with spices and butter.',
                imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=60'
            },
            {
                name: 'South Indian Delights',
                description: 'Crispy dosas and soft idlis with rich coconut chutney.',
                imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=60'
            },
            {
                name: 'Delhi Chaat House',
                description: 'Spicy, tangy, and sweet street food that hits right.',
                imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60'
            }
        ];

        const createdRestaurants = await Restaurant.insertMany(restaurants);

        const menus = [
            {
                restaurantId: createdRestaurants[0]._id,
                name: 'Butter Chicken',
                price: 250,
                description: 'Tender chicken braised in a spiced tomato and butter sauce.',
                imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[0]._id,
                name: 'Garlic Naan',
                price: 50,
                description: 'Soft and chewy flatbread topped with minced garlic and cilantro.',
                imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[1]._id,
                name: 'Masala Dosa',
                price: 120,
                description: 'Thin crispy crepe stuffed with a spiced potato mash.',
                imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[1]._id,
                name: 'Idli Sambar',
                price: 80,
                description: 'Steamed rice cakes served with aromatic lentil stew.',
                imageUrl: 'https://images.unsplash.com/photo-1589301773112-0058cb30d041?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[2]._id,
                name: 'Punjabi Samosa',
                price: 30,
                description: 'Fried pastry with a savory filling of spiced potatoes and peas.',
                imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[2]._id,
                name: 'Chole Bhature',
                price: 150,
                description: 'Spicy chickpea curry served with puffy fried bread.',
                imageUrl: 'https://images.unsplash.com/photo-1552598064-071ba826e792?auto=format&fit=crop&w=300&q=60'
            }
        ];

        await Menu.insertMany(menus);

        console.log('Sample Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error with Seed: ${error.message}`);
        process.exit(1);
    }
};

importData();
