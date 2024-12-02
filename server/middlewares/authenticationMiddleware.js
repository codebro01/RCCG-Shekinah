
import { NotAuthenticatedError, NotFoundError } from '../errors/index.js';
import { User } from '../model/userModel.js';
import { verifyJWT } from '../utils/index.js';
export const authMiddleware = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token)  return next (new NotAuthenticatedError("Not authorized to access this route"));

    try {
        const decoded = verifyJWT({ token });
        const { username, userID, email, role } = decoded;

        const userExist = await User.findById(userID);
        if (!userExist) next(new NotFoundError("Invalid Credentials"));

        req.user = { username, userID, email, role };

        next();
    }
    catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return next(new NotAuthenticatedError("Access Denied: Invalid token"));
        }
       return next(new NotAuthenticatedError(`Access Denied: ${err}`))
    }

}

export const checkPermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) throw new NotAuthenticatedError(`Unauthorized to access this route`);
        next();
    }

}