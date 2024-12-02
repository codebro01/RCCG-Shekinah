export const createTokenUser = (user) => {
    return {username: user.username, email:user.email, userID: user._id, role: user.role};
}