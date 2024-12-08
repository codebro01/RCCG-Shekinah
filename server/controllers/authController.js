import { User } from '../model/userModel.js';
import { BadRequestError, NotFoundError, NotAuthenticatedError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { createTokenUser } from '../utils/createTokenUser.js';
import { attachCookieToResponse } from '../utils/jwt.js';
export const registerController = async (req, res, next) => {
    const { username, email, password } = req.body;

    // const requiredFields = ['username', 'password', 'email'];

    // requiredFields.forEach(field => {
    //     if(!req.body.field) 
    //     return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.field} is required`})
    // })


    const isExisting = await User.findOne({
        $or: [{ email: email }, { username: username }]
    });
    if (isExisting) {
        return next(new BadRequestError("User already exists, please try different values"));
    }

    const isAdmin = (await User.countDocuments({})) <= 3;
    const role = isAdmin ? 10011 : 10022;
    const createdUser = await User.create({ username, email, password, role: role });
    const tokenUser = createTokenUser(createdUser);
    attachCookieToResponse(res, {user: tokenUser});
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}



export const loginController = async (req, res, next) => {
    const { username, email, password } = req.body;

    const identifier = username || email;

    if (!identifier || !password) return next(new BadRequestError(`Please provide username and password`)); 
    const user = await User.findOne({
        $or: [{username}, {email}]
    });

    if (!user) return next(new NotFoundError("Invalid Credentials")) ;
    const isMatch = await user.comparePwd(password);
    if (!isMatch) return next(new NotAuthenticatedError("Invalid Credentials")) ;
    const tokenUser = createTokenUser(user);
    attachCookieToResponse(res, {user: tokenUser})
    res.status(StatusCodes.ACCEPTED).json({ tokenUser, date: (new Date(Date.now()))})
}

export const logoutController = async(req, res) => {
    res.cookie('token', 'logout', {
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000)
    })

    res.status(StatusCodes.OK).json({message: 'Logout successful'})
}