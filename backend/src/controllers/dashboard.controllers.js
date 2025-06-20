import Order from '../models/order.models.js';
import Customer from '../models/customer.models.js';
import Visit from '../models/visit.models.js';
import ProductView from '../models/productView.models.js';
import CartSession from '../models/cartSession.models.js';
import mongoose from 'mongoose';

export const getAnalytics = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const timeframeDays = parseInt(req.query.timeframe || '30', 10);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - timeframeDays);
        const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

        // --- Perform concurrent database queries for efficiency ---
        const [
            orderMetrics,
            soldProductsResult,
            topViewedProducts,
            totalInitiatedCarts,
            totalCompletedCarts,
            totalVisits,
            bounceRateData // ✅ NEW QUERY
        ] = await Promise.all([
            Order.aggregate([ { $match: { seller: sellerId, createdAt: { $gte: startDate } } }, { $group: { _id: null, totalSales: { $sum: "$totalAmount" }, totalOrders: { $sum: 1 }, allCustomerIds: { $addToSet: "$customer" } } } ]),
            Order.aggregate([ { $match: { seller: sellerId, createdAt: { $gte: startDate } } }, { $unwind: "$products" }, { $group: { _id: "$products.product" } } ]),
            ProductView.aggregate([ { $match: { seller: sellerId, createdAt: { $gte: startDate } } }, { $group: { _id: "$product", views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 20 }, { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "productInfo" }}, { $unwind: "$productInfo" }, { $project: { _id: 1, name: "$productInfo.name", views: 1 } } ]),
            CartSession.countDocuments({ seller: sellerId, createdAt: { $gte: startDate } }),
            CartSession.countDocuments({ seller: sellerId, status: 'completed', createdAt: { $gte: startDate } }),
            Visit.countDocuments({ seller: sellerId, createdAt: { $gte: startDate } }),
            
            // ✅ NEW AGGREGATION PIPELINE for Bounce Rate
            ProductView.aggregate([
                // 1. Get all product views from logged-in users in the timeframe
                { $match: { seller: sellerId, customer: { $ne: null }, createdAt: { $gte: startDate } } },
                // 2. Combine with all other actions (visits) from the same users
                { $unionWith: {
                    coll: 'visits',
                    pipeline: [{ $match: { seller: sellerId, customer: { $ne: null }, createdAt: { $gte: startDate } } }]
                }},
                // 3. Sort by customer and time, essential for sessionizing
                { $sort: { customer: 1, createdAt: 1 } },
                // 4. Use a window function to look at the next action for each customer
                { $setWindowFields: {
                    partitionBy: "$customer",
                    sortBy: { createdAt: 1 },
                    output: {
                        nextActionTime: { $push: "$createdAt", window: { documents: [1, 1] } }
                    }
                }},
                // 5. Calculate the time difference to the next action
                { $project: {
                    customer: 1,
                    product: 1,
                    createdAt: 1,
                    isProductView: { $cond: [{ $ifNull: ["$product", false] }, 1, 0] },
                    timeToNext: { $subtract: [{ $arrayElemAt: ["$nextActionTime", 0] }, "$createdAt"] }
                }},
                // 6. A bounce is a product view with no next action or a next action after 30 mins
                { $match: {
                    isProductView: 1,
                    $or: [
                        { timeToNext: { $gt: SESSION_TIMEOUT_MS } },
                        { timeToNext: null }
                    ]
                }},
                // 7. Count the bounces per product
                { $group: { _id: "$product", bounces: { $sum: 1 } } },
                // 8. Join with total views for each product to calculate the rate
                { $lookup: {
                    from: "productviews",
                    let: { productId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$product", "$$productId"] }, createdAt: { $gte: startDate } } },
                        { $count: "totalViews" }
                    ],
                    as: "viewData"
                }},
                { $unwind: "$viewData" },
                // 9. Calculate the rate and filter out products with too few views
                { $match: { "viewData.totalViews": { $gt: 5 } } }, // Only calc for products with > 5 views
                { $project: {
                    bounces: 1,
                    totalViews: "$viewData.totalViews",
                    rate: { $multiply: [{ $divide: ["$bounces", "$viewData.totalViews"] }, 100] }
                }},
                // 10. Get the top 5 highest bounce rates
                { $sort: { rate: -1 } },
                { $limit: 5 },
                // 11. Get product names for the UI
                { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "productInfo" }},
                { $unwind: "$productInfo" },
                { $project: { _id: 0, name: "$productInfo.name", rate: 1 } }
            ])
        ]);

        // --- Process the results from all promises ---
        const { totalSales = 0, totalOrders = 0, allCustomerIds = [] } = orderMetrics[0] || {};
        const aov = totalOrders > 0 ? totalSales / totalOrders : 0;
        const conversionRate = totalVisits > 0 ? ((totalOrders / totalVisits) * 100).toFixed(2) : 0;
        const trafficData = { totalVisits, conversionRate };
        const topProducts = await Order.aggregate([ { $match: { seller: sellerId, createdAt: { $gte: startDate } } }, { $unwind: "$products" }, { $group: { _id: "$products.product", sold: { $sum: "$products.quantity" } } }, { $sort: { sold: -1 } }, { $limit: 5 }, { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "productInfo" } }, { $unwind: "$productInfo" }, { $project: { _id: 1, name: "$productInfo.name", sold: 1 } } ]);
        const firstOrders = await Customer.aggregate([ { $match: { _id: { $in: allCustomerIds } } }, { $project: { firstOrderDate: { $arrayElemAt: ["$orders", 0] } } }, { $lookup: { from: "orders", localField: "firstOrderDate", foreignField: "_id", as: "firstOrderInfo" } }, { $project: { _id: 1, firstOrderCreatedAt: { $arrayElemAt: ["$firstOrderInfo.createdAt", 0] } } } ]);
        let newCustomers = 0;
        firstOrders.forEach(order => { if (order.firstOrderCreatedAt >= startDate) newCustomers++; });
        const returningCustomers = allCustomerIds.length - newCustomers;
        const customerData = { newVsReturning: [ { name: 'New', value: newCustomers, color: '#32cd32' }, { name: 'Returning', value: returningCustomers, color: '#4ECDC4' } ], avgCustomerSpend: allCustomerIds.length > 0 ? totalSales / allCustomerIds.length : 0 };
        const soldProductIds = new Set(soldProductsResult.map(p => p._id.toString()));
        const viewedNotBought = topViewedProducts.filter(p => !soldProductIds.has(p._id.toString())).slice(0, 5).map((p, i) => ({ ...p, color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][i] }));
        const abandonedCarts = totalInitiatedCarts - totalCompletedCarts;
        const abandonmentRate = totalInitiatedCarts > 0 ? ((abandonedCarts / totalInitiatedCarts) * 100).toFixed(1) : 0;
        const abandonmentTrend = Array.from({ length: 7 }, (_, i) => ({ date: `Day ${i+1}`, rate: Math.max(0, parseFloat(abandonmentRate) * (1 + (Math.random() - 0.5) * 0.2)) }));
        const abandonmentData = { rate: abandonmentRate, trend: abandonmentTrend };
        
        // --- Construct Final Response ---
        res.json({
            totalSales,
            totalOrders,
            aov,
            topProducts,
            customerData,
            trafficData,
            viewedNotBought,
            abandonmentData,
            bounceRateData // ✅ Add the new data
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ message: "Failed to fetch analytics" });
    }
};