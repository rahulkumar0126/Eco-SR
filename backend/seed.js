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
                name: 'Burger Palace',
                description: 'Best authentic flame-grilled burgers in town.',
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60'
            },
            {
                name: 'Pizza Nirvana',
                description: 'Wood-fired organic pizzas with secret family sauce.',
                imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=60'
            },
            {
                name: 'Sushi Zen',
                description: 'Fresh sushi, sashimi, and healthy green bowls.',
                imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=500&q=60'
            }
        ];

        const createdRestaurants = await Restaurant.insertMany(restaurants);

        const menus = [
            {
                restaurantId: createdRestaurants[0]._id,
                name: 'Classic Cheeseburger',
                price: 8.99,
                description: 'Beef patty, double cheddar, lettuce, tomato, special sauce.',
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[0]._id,
                name: 'Crispy Fries',
                price: 3.99,
                description: 'Golden fries perfectly seasoned with sea salt.',
                imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[1]._id,
                name: 'Margherita Pizza',
                price: 12.99,
                description: 'Fresh mozzarella, basil leaves, crushed san marzano tomatoes.',
                imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[1]._id,
                name: 'Garlic Knots',
                price: 5.99,
                description: 'Fresh baked dough balls tossed in garlic butter & parmesan.',
                imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=60'
            },
            {
                restaurantId: createdRestaurants[2]._id,
                name: 'Spicy Tuna Roll',
                price: 9.99,
                description: 'Fresh tuna with spicy mayo, mixed greens and cucumber.',
                imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=60'
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
