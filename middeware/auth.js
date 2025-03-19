const { verifytoken } = require("../helper/index")

const adminRequird = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1]
        const decodedData = await verifytoken(token)
        if (!decodedData?.isAdmin) return res.json({ messge: "You don't have access to this resources" })
        next()
    } catch (error) {
        res.json({ messge: "You don't have access to this resources" })
    }
}

const loginRequird = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1]
        const decodedData = await verifytoken(token)
        if (!decodedData?.id) return res.json({ messge: "You don't have access to this resources" })
        req.user = {
            id: decodedData?.id
        }
        next()
    } catch (error) {
        res.json({ messge: "You don't have access to this resources" })
    }
}


module.exports = {
    adminRequird,
    loginRequird
}