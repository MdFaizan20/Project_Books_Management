const jwt = require("jsonwebtoken")
const userAuth = async (req, res, next) => {
    try {


        const token = req.headers["x-api-key"]
        if (!token) {
            return res.status(403).send({ status: false, msg: "missing authentication token in request" })
        }
        let decode = await jwt.verify(token, "secret")
        if (!decode) {
            return res.status(403).send({ status: false, msg: "Invalid Authentication token in request" })
        }
        req.userId = decode.userId

        next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = userAuth