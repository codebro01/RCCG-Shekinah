import { Email } from '../model/newslettersEmails.js';
import { StatusCodes } from 'http-status-codes';

export const getAllNewsletterSubscribers = async (req, res) => {
    const emails = await Email.find({}).sort('createdAt');
    res.status(StatusCodes.OK).json({ newsletterSubscriberEmails: emails })
}

export const subscribeToNewsletter = async (req, res, next) => {
    try {

        const isExistEmail = await Email.findOne({ email: req.body.email });
        if (isExistEmail) return next(new Error(`The email ${req.body.email} is already a subscriber`))
        await Email.create({ ...req.body });
        res.status(StatusCodes.CREATED).json({ "Message": "Thanks for subscribing to our new letter, stay tuned!" })
    }
    catch (err) {
        if(err.code === 11000) return next(new Error('Email already registered'))
        return next(new Error(`err: ${err.message}`))
    }
}
