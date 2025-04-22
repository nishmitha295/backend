module.exports = (app) => {
    const controller = require("../controllers/auth.controller");
    const router = require("express").Router();
  
    router.post("/signup", controller.signup);  
    router.post("/signin", controller.signin);
    app.use("/api/auth", router);
};
