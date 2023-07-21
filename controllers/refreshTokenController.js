const User = require('../model/User');

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  // console.log( cookies, cookies.jwt);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  
  const foundUser = await User.findOne({ refreshToken }).exec();
  // const foundUser = User.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); //forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET, 
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
      const roles = Object.values(foundUser.roles);
      // console.log(roles, "ln:28 refreshTokenController")
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": decoded.username,
            "roles": roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      res.json({ accessToken });
  }); 
};

module.exports = { handleRefreshToken };
 