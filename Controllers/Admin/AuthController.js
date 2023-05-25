const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../../Environments/env");
const Admin = require('../../Models/Admin')

exports.adminSignup = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const registration = new Admin({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      status: true,
      role: 'Admin',
      created_on: new Date(),
    });

    const admin = await registration.save();
    admin.password = null;

    res.send({
      status: 201,
      message: "Admin Register Successfully",
      data: { admin },
    });
  } catch (error) {
    next(error);
  }
};

exports.adminLogin = async(req,res,next)=>{
  try {
    const data = req.body;
    const admin = req.adminData;
    const isMatched = await bcrypt.compare(data.password, admin.password);
    if (isMatched) {
      const token = jwt.sign(
        { _id: admin._id, email: admin.email },
        env().jwt_secret
      );
        admin.password = null
      res.send({ status: 200, message: "Login successfully", data: { admin,token } });
    } else {
      res.send({ status: 401, message: "Invalid email or password", data: {} });
    }
  } catch (error) {
    next(error);
  }
}

