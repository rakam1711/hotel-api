exports.devEnvironment = () => {

    const keys = {
        db_root: process.env.MONGO_URL,
        jwt_secret: process.env.JWT_SECRET,
    }
    return keys
}