import { Sermon } from "../model/sermonModel.js";
import { cloudinary_Image_Audio_Uploader, pagePaginationHelper} from '../utils/index.js'
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const uploadSermon = async (req, res, next) => {
    cloudinary_Image_Audio_Uploader(req, res, next, { Coll: Sermon })
}
export const getAllSermons = async (req, res) => {
    const {skip, pageLimit} = pagePaginationHelper(req.query.page, req.query.limit);
    const sermons = await Sermon.find({}).sort('-createdAt').skip(skip).limit(pageLimit);

    res.status(StatusCodes.OK).json({ sermons })
}
export const getSingleSermon = async (req, res, next) => {
    const { id: sermonID } = req.params;
    const sermon = await Sermon.findById({ _id: sermonID });
    if (!sermon) return next(new NotFoundError(`Sermon not found`));

    res.status(StatusCodes.OK).json({ sermon });
}
export const updateSermon = async (req, res, next) => {
    const { id: sermonID } = req.params;
    const sermon = await Sermon.findById({ _id: sermonID });
    if (!sermon) return next(new NotFoundError(`Sermon not found`));
    const updatedSermon = await Sermon.findByIdAndUpdate({ _id: sermonID }, { ...req.body }, { new: true, runValidators: true });
    if (!updatedSermon) return next(new BadRequestError(`An error occured while trying to update the sermon with id: ${sermonID}`))
    res.status(StatusCodes.OK).json({ updatedSermon });
}
export const deleteSermon = async (req, res, next) => {
    const { id: sermonID } = req.params;
    const sermon = await Sermon.findById({ _id: sermonID });
    if (!sermon) return next(new NotFoundError(`Sermon not found`));
    const deletedSermon = await Sermon.findByIdAndDelete({ _id: sermonID });
    if (!deletedSermon) return next(new BadRequestError(`An error occured while trying to delete the sermon with id: ${sermonID}`))
    res.status(StatusCodes.OK).json({ msg:  `The sermon:  ${sermon.title} has been successfully deleted`});
}

