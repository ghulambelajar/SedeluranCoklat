const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Sesi tidak valid, silakan login kembali" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, Anda belum login" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Peran Anda (${req.user.role}) tidak diizinkan mengakses rute ini`,
      });
    }
    next();
  };
};
