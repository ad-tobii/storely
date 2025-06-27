// backend/controllers/marketing.controllers.js
import EmailList from '../models/emailList.model.js';
import Customer from '../models/customer.models.js';
import { sendEmail } from '../lib/utils.js';

// --- CRUD for Email Lists ---

export const createEmailList = async (req, res) => {
    try {
        const { name } = req.body;
        const sellerId = req.user._id;

        if (!name) {
            return res.status(400).json({ message: 'List name is required.' });
        }

        const newList = new EmailList({
            name,
            seller: sellerId,
            customers: [],
        });

        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating email list.', error: error.message });
    }
};

export const getEmailLists = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const lists = await EmailList.find({ seller: sellerId }).populate('customers', 'id');
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching email lists.' });
    }
};

export const deleteEmailList = async (req, res) => {
    try {
        const { listId } = req.params;
        const sellerId = req.user._id;

        const list = await EmailList.findOne({ _id: listId, seller: sellerId });
        if (!list) {
            return res.status(404).json({ message: 'Email list not found or you do not have permission.' });
        }

        await EmailList.findByIdAndDelete(listId);
        res.status(200).json({ message: 'Email list deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting email list.' });
    }
};

// --- Customer Management in Lists ---

export const addCustomersToList = async (req, res) => {
    try {
        const { listId } = req.params;
        const { customerIds } = req.body;
        const sellerId = req.user._id;

        if (!customerIds || !Array.isArray(customerIds)) {
            return res.status(400).json({ message: 'Customer IDs must be an array.' });
        }

        const list = await EmailList.findOne({ _id: listId, seller: sellerId });
        if (!list) {
            return res.status(404).json({ message: 'Email list not found or you do not have permission.' });
        }

        await EmailList.updateOne(
            { _id: listId },
            { $addToSet: { customers: { $each: customerIds } } }
        );

        const updatedList = await EmailList.findById(listId).populate('customers', 'id');
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(500).json({ message: 'Server error adding customers to list.' });
    }
};

// --- Email Sending ---

export const sendEmailToList = async (req, res) => {
    try {
        const { listId } = req.params;
        const { subject, message } = req.body;
        const sellerId = req.user._id;

        if (!subject || !message) {
            return res.status(400).json({ message: 'Subject and message are required.' });
        }

        const list = await EmailList.findOne({ _id: listId, seller: sellerId })
            .populate('customers', 'email fullname'); // Populate to get customer emails and names

        if (!list) {
            return res.status(404).json({ message: 'Email list not found or you do not have permission.' });
        }
        
        if (list.customers.length === 0) {
            return res.status(400).json({ message: 'This email list has no customers to send to.' });
        }

        const emailPromises = list.customers.map(customer => {
            // Personalize the message if desired
            const personalizedMessage = `Hi ${customer.fullname},\n\n${message}`;
            return sendEmail({
                email: customer.email,
                subject: subject,
                message: personalizedMessage
            });
        });

        await Promise.all(emailPromises);

        res.status(200).json({ message: `Email sent successfully to ${list.customers.length} customer(s).` });

    } catch (error) {
        console.error("Error sending email to list:", error);
        res.status(500).json({ message: 'Server error sending email.' });
    }
};