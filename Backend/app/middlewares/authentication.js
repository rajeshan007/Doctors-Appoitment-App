const jwt = require('jsonwebtoken')
const authentication = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenData) {
            return res.status(200).send({ message: "Auth Failed", success: false })
        } else {
            req.userId = tokenData.id
            next()
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).send({ message: `Auth failed ${error.message}`, success: false })
    }

}

module.exports = authentication 
