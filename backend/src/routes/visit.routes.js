import express from 'express';
import { trackVisit } from '../controllers/visit.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// A middleware to make user optional
const optionalProtectRoute = (req, res, next) => {
    if (req.cookies.jwt) {
        return protectRoute(req, res, next);
    }
    next();
};

router.post('/', optionalProtectRoute, trackVisit);

export default router;