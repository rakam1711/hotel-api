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
        status:true,
        role:'Admin',
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