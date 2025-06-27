// backend/routes/marketing.routes.js
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
    createEmailList,
    getEmailLists,
    deleteEmailList,
    addCustomersToList,
    sendEmailToList
} from '../controllers/marketing.controllers.js';

const router = express.Router();

// All routes are protected and require a seller to be logged in
router.use(protectRoute);

// Email List CRUD
router.get('/lists', getEmailLists);
router.post('/lists', createEmailList);
router.delete('/lists/:listId', deleteEmailList);

// Manage Customers in a List
router.patch('/lists/:listId/customers', addCustomersToList);

// Send Campaign
router.post('/lists/:listId/send', sendEmailToList);

export default router;