import jwt from 'jsonwebtoken';

export const createJWT = ({payload}) => jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '5h'});

export const verifyJWT = ({token}) => jwt.verify(token, process.env.JWT_SECRET);

export const attachCookieToResponse = (res, {user}) =>{
    const generatedToken = createJWT({payload: user});
    const _5h = 1000*60*60*5;
    res.cookie('token', generatedToken,  {
        httpOnly: true, 
        expires: new Date( Date.now() + _5h), 
        // secure: false, 
        secure: process.env.NODE_ENV === 'production', 
        signed: true, 
        sameSite: 'None',
    })
}