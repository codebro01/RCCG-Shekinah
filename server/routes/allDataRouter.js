import express from 'express';
const Router = express.Router();
import {allDataController} from '../controllers/index.js';


Router.get('/', allDataController);

export default Router;