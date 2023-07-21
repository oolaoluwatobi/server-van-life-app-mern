const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    // console.log(rolesArray, "allowedRoles ln:5 verifyRoles");
    // console.log(req.roles, "reqRoles ln:6 verifyRoles" );
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if (!result) return res.sendStatus(401);
    next();
  }
}

module.exports = verifyRoles