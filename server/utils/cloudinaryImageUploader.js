import cloudinary from '../config/cloudinary.js'
import { BadRequestError, NotFoundError} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../model/userModel.js";
import { checkPermissions } from "../middlewares/authenticationMiddleware.js";


export const cloudinaryImageUploader = async (req,res, next, cloudinaryFolder, {Coll}) => {
     const { username, userID, role, email } = req.user;

    const user = await User.findById({ _id: userID });

    checkPermissions(10011);

    (async function () {

        try {
            const images = req.files;

            if (images.length > 15) return next(new BadRequestError('Image max upload is 15'));
            console.log(images)
            if (!images || images.length === 0) return next(new BadRequestError('Please select at least one image file')) ;


            const maxSize = 1024 * 1024 * 2;
            const uploadedImages = [];

            for (const image of images) {
                if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png') return next(new BadRequestError('Please upload a Jpeg or png file')) 
                if (image.size > maxSize) return next(new BadRequestError('Image file too big, max images size is 2mb')) ;

                const cloudinaryUpload = (buffer) => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            {
                                folder: cloudinaryFolder,
                                public_id: image.filename
                            }, (error, result) => {
                                if (error) reject('An error occured while uploading to cloudinary');
                                if (result) resolve(result);
                            }
                        )
                        stream.end(buffer)
                    })
                }
                const result = await cloudinaryUpload(image.buffer);
                uploadedImages.push(result.secure_url);
            }
             const createdData = await Coll.create({ ...req.body, imagesUrl: uploadedImages, createdBy: user._id });
            return res.status(StatusCodes.CREATED).json({ createdData });
        }
        catch (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).json({ err: err.message })
        }

    })();
}