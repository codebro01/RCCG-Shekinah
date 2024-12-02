import { Router } from "express";
import {getAllUsers, getSingleUser, getCurrentUser, updateInfo, updatePwd} from '../controllers/index.js'
const router = Router();

router.route('/')
    .get(getAllUsers)
router.route('/:id')
    .patch(getSingleUser);
router.route('/current-user')
    .patch(getCurrentUser);
router.route('/updateinfo')
    .patch(updateInfo);
router.route('/updatepwd')
    .patch(updatePwd);

export default router;