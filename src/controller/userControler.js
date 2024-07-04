const createUserServer = require("../helper/user/createUserServer");
const user = require("../models/userModel");

const registerUser = async (req, res) => {
  // console.log("controller");
  try {
      const { username, name, email, m_number, password } = req.body;
    //   let c = await user.find({ email: email });
    //   if (c[0] === undefined) {
    //     const a = await user.create({
    //       username,
    //       name,
    //       email,
    //       m_number,
    //       password,
    //       created_at: new Date().toLocaleString(),
    //       updated_at: new Date().toLocaleString(),
    //     });
    //     createUserServer(a)
    //     res.status(201).send(a);
    //   } else {
    //     res.send("User Already Exit");
    //   }
    let a = { username, name, email, m_number, password };
    await createUserServer(a);
    res.send("server Created");
  } catch (e) {
    // console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { registerUser };
