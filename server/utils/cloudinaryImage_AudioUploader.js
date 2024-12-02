
import cloudinary from '../config/cloudinary.js';
import { checkPermissions } from '../middlewares/authenticationMiddleware.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

export const cloudinary_Image_Audio_Uploader = async (req, res, next, { Coll }) => {
    const { userID } = req.user;
    try {

        checkPermissions(10011);
        //! handle audio file upload 
        const audios = req.files.audio;
        if (!audios || audios.length > 1) return next(new BadRequestError('Please select one audio file'));

        const audio = audios[0];
            if (audio.mimetype !== 'audio/mpeg') return next(new BadRequestError('Please upload an mp3 file'));

            const cloudinaryUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'RCCG Sermons',
                            public_id: audio.filename,
                            resource_type: 'video'
                        }, (err, result) => {
                            if (err) reject(err);
                            if (result) resolve(result);
                        }
                    )
                    stream.end(buffer)
                })
            }

            const audioResult = await cloudinaryUpload(audio.buffer);
            const audioUrl =audioResult.secure_url
        

        //! handle image fileupload 

        const images = req.files.images;
        if (images.length > 5) return next(new BadRequestError('Image max upload is 5'));

        if (!images || images.length === 0) return next(new BadRequestError('Please select at least one image file'));

        const maxSize = 1024 * 1024 * 2;
        const uploadedImages = [];

        for (const image of images) {
            if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png') return next(new BadRequestError('Please upload a Jpeg or png file'))
            if (image.size > maxSize) return next(new BadRequestError('Image file too big, max images size is 2mb'));

            const cloudinaryUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'sermon_images',
                            public_id: image.filename
                        }, (error, result) => {
                            if (error) reject(error);
                            if (result) resolve(result);
                        }
                    )
                    stream.end(buffer)
                })
            }
            const imageResult = await cloudinaryUpload(image.buffer);
            uploadedImages.push(imageResult.secure_url);
        }


        const { title, message, preacher } = req.body;
        const sermon = await Coll.create({ title, message, preacher, audioUrl, imagesUrl: uploadedImages, createdBy: userID });
        res.status(StatusCodes.OK).json({ sermon });
    }
    catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ err: err.message })
    }
}