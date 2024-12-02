import express from 'express';
import { getAllImages, uploadImages, deleteImage} from "../controllers/index.js";
const Router = express.Router();
import { upload } from "../config/multer.js";

Router.route('/')
    .get(getAllImages);
Router.post('/', upload.array('images', 15), uploadImages);

Router.delete('/:eventID', deleteImage)

export default Router;

