import express from 'express';
import { getAllNewsletterSubscribers, subscribeToNewsletter } from '../controllers/index.js';
const router = express.Router();;

router.route('/')
    .get(getAllNewsletterSubscribers)
    .post(subscribeToNewsletter);


export default router;