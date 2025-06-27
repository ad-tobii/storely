// --- START OF FILE controllers/order.controllers.js ---

import mongoose from 'mongoose';
import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import Seller from '../models/seller.models.js';
import Customer from '../models/customer.models.js';

export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const customerId = req.user._id;
        const { sellerId, items, totalAmount, shippingAddress } = req.body;

        if (!sellerId || !items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ message: "Missing required order information." });
        }

        // Fetch product details and check stock within the transaction
        const productIds = items.map(item => item.productId);
        const products = await Product.find({ '_id': { $in: productIds } }).session(session);

        const productMap = products.reduce((map, product) => {
            map[product._id.toString()] = product;
            return map;
        }, {});
        
        let orderItems = [];
        for (const item of items) {
            const product = productMap[item.productId];
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found.`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}.`);
            }

            // Decrement stock and save the product
            product.stock -= item.quantity;
            await product.save({ session });
            
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price // Lock the price at the time of purchase
            });
        }

        // Create the new order
        const newOrder = new Order({
            seller: sellerId,
            customer: customerId,
            products: orderItems,
            totalAmount,
            shippingAddress: shippingAddress || { details: "Cash on Delivery - Address TBD" },
            status: 'pending',
        });
        
        await newOrder.save({ session });
        
        // ✅ FIXED: Instead of fetching the seller and re-saving, we update atomically.
        // This avoids the validation error for `fullName`.
        await Seller.findByIdAndUpdate(sellerId, {
            $push: { orders: newOrder._id },
            // $addToSet ensures the customer is only added if they don't already exist.
            $addToSet: { customers: customerId } 
        }).session(session);

        // ✅ FIXED: Atomically update the customer as well.
        await Customer.findByIdAndUpdate(customerId, {
            $push: { orders: newOrder._id }
        }).session(session);
        
        await session.commitTransaction();

        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        await session.abortTransaction();
        console.error("Order creation error:", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    } finally {
        session.endSession();
    }
};

export const getCustomerOrdersForStore = async (req, res) => {
    try {
        const customerId = req.user._id;
        const { sellerId } = req.params;

        const orders = await Order.find({ customer: customerId, seller: sellerId })
            .populate({
                path: 'products.product',
                select: 'name images',
            })
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error)
        {
        console.error("Error fetching customer orders:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};