export function isAdminOrManager(req, res, next) {
  if (req.user && req.user.roles) {
    const roles = req.user.roles;
    if (roles.includes("ADMIN") || roles.includes("MANAGER")) {
      next();
    } else {
      return res.status(403).json({ message: "Nie masz uprawnień do wykonania tej akcji!" });
    }
  } else {

    return res.status(403).json({ message: "Nieautoryzowany dostęp" });
  }
}
