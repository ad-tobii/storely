// --- START OF FILE /routes/dashboard.routes.js ---

import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAnalytics, getCustomerDetails, getInventoryAnalytics } from '../controllers/dashboard.controllers.js';
import Seller from '../models/seller.models.js';
import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import Customer from '../models/customer.models.js';

const router = express.Router();

// --- Main Analytics Endpoint ---
router.get('/analytics', protectRoute, getAnalytics);

// --- NEW Inventory Analytics Endpoint ---
router.get('/inventory-analytics', protectRoute, getInventoryAnalytics);

// --- Customer Details Endpoint ---
router.get('/customers/:customerId/details', protectRoute, getCustomerDetails);


// --- Existing READ Endpoints ---
router.get('/orders', protectRoute, async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user._id })
            .populate('customer', 'fullname email')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

router.get('/products', protectRoute, async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

router.get('/customers', protectRoute, async (req, res) => {
    try {
        // Fetch seller and populate the customers field with selected properties
        const seller = await Seller.findById(req.user._id)
            .populate({
                path: 'customers', 
                select: 'fullname email createdAt'
            });
            
        // Augment customer data with order counts and total spent
        const customerData = await Promise.all(seller.customers.map(async (customer) => {
            const stats = await Order.aggregate([
                { $match: { seller: req.user._id, customer: customer._id } },
                { $group: { _id: null, orderCount: { $sum: 1 }, totalSpent: { $sum: '$totalAmount' } } }
            ]);
            
            return {
                ...customer.toObject(),
                orderCount: stats[0]?.orderCount || 0,
                totalSpent: stats[0]?.totalSpent || 0,
            };
        }));

        res.status(200).json(customerData);
    } catch (error) {
        console.error("Error fetching customers:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});


// --- WRITE ACTIONS ---

// POST - Add a new product
router.post('/products', protectRoute, async (req, res) => {
    try {
        const sellerId = req.user._id;
        const { name, description, price, stock, category, sku, images } = req.body;

        if (!name || !description || !price || stock === undefined) {
            return res.status(400).json({ message: "Name, description, price, and stock are required." });
        }

        const newProduct = new Product({
            seller: sellerId,
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            category,
            sku,
            images: images || [],
        });

        await newProduct.save();
        await Seller.findByIdAndUpdate(sellerId, { $push: { products: newProduct._id } });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// PATCH - Update an existing product
router.patch('/products/:productId', protectRoute, async (req, res) => {
    try {
        const { productId } = req.params;
        const sellerId = req.user._id;
        const updateData = req.body;

        const product = await Product.findById(productId);
        if (!product || product.seller.toString() !== sellerId.toString()) {
            return res.status(403).json({ message: "Product not found or unauthorized." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE - Delete a product
router.delete('/products/:productId', protectRoute, async (req, res) => {
    try {
        const { productId } = req.params;
        const sellerId = req.user._id;
        const product = await Product.findById(productId);
        if (!product || product.seller.toString() !== sellerId.toString()) {
            return res.status(403).json({ message: "Product not found or unauthorized." });
        }
        await Product.findByIdAndDelete(productId);
        await Seller.findByIdAndUpdate(sellerId, { $pull: { products: productId } });
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Order Fulfillment
router.patch('/orders/:orderId', protectRoute, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.orderId);
        if (!order || order.seller.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized." });
        order.status = status;
        await order.save();
        const updatedOrder = await Order.findById(req.params.orderId).populate('customer', 'fullname email');
        res.status(200).json(updatedOrder);
    } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

export default router;