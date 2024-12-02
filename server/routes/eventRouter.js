import express from "express";
import { createEventController, getSingleEvent, getAllEvents, updateEvent, deleteEvent } from "../controllers/index.js";
const Router = express.Router();
import { upload } from "../config/multer.js";

Router.route('/')
    .get(getAllEvents);
Router.post('/', upload.array('images', 5), createEventController)
Router.route('/:id')
    .get(getSingleEvent)
    .patch(updateEvent)
    .delete(deleteEvent)

export default Router;