import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/150?text=Menu+Item'
    }
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
