import Router from "express";
const user = Router();

user.get("/", (req, res) => {
  res.send("User route");
});

export default user;