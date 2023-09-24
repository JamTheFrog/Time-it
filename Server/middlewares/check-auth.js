module.exports = (req, res, next) => {
    if(!req.currentUser) return res.status(401).send("Not Authenticated")
    next()
}