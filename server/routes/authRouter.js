import express from 'express'; 
import { loginController, registerController, logoutController } from '../controllers/index.js';
const Router = express.Router();

Router.post('/login', loginController)
Router.post('/register', registerController)
Router.post('/logout', logoutController)

export default Router;