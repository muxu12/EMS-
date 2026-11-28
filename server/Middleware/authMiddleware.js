import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startWith("Bearer")){
            return res.status(401).json({error: "Unauthorized"})
        } 

        const token = authHeader.split(" ")[1];
        const session = jwt.verify(token, process.env.JWT_SECRETS)

        if(!session) {
            return res.status(401).json({error: "Unauthorized"})
        }
        req.session = session
        next()
    } catch (error) {
        return res.status(401).json({error: "Unauthorized"})
    }
}

// protect admin 

export const protectAdmin = async (req, res, next) => {
    if(req?.session?.role !== 'Admin'){
        return res.status(403).json({error: "Admin access required"})
    }
    next()
}