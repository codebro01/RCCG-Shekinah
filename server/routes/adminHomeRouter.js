import express from 'express';
import { StatusCodes } from 'http-status-codes';
const Router = express.Router();

Router.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({message: "Welcome to Admin Home"})
})

export default Router;