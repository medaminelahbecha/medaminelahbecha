const jwt = require("jsonwebtoken");

exports.getUserConnecte = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      console.log(decodedToken);
      console.log(decodedToken.userId);
      a = JSON.stringify(decodedToken.userId);
      res.send(a);

      return a;
    }
  }
};
