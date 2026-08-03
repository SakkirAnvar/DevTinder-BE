const adminAuth = (req, res, next) => {
  console.log("Admin Auth Checking...");
  const token = "xyz";
  const isAdminAuthorized = token === "xyzyyiuy";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized Request!");
  } else {
    next();
  }
}

module.exports = {
    adminAuth
}