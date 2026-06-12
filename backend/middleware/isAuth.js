import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => { 
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({         
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {        //  handle expired
      return res.status(401).json({
        success: false,
        message: "Session expired, please login again",
      });
    }
    if (error.name === "JsonWebTokenError") {        //  handle invalid
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    return res.status(500).json({                    //  true server errors
      success: false,
      message: "Auth server error",
    });
  }
};