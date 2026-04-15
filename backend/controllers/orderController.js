import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    const { items, totalAmount } = req.body;

    if (items && items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        try {
            const order = new Order({
                userId: req.user._id,
                items,
                totalAmount
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('items.menuId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
