const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../../Environments/env");
const Admin = require('../../Models/Admin')



exports.subAdminSignup = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const registration = new Admin({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      status: true,
      role: 'SubAdmin',
      created_on: new Date(),
    });

    const subadmin = await registration.save();
    subadmin.password = null;

    res.send({
      status: 201,
      message: "SubAdmin Register Successfully",
      data: { subadmin },
    });
  } catch (error) {
    next(error);
  }
}

exports.getSubAdminList = async (req, res, next) => {
  try {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      collation: {
        locale: 'en'
      },
      sort: {
        created_at: -1
      }
    }
    let query = [
      {
        '$match': {
          'role': 'SubAdmin'
        }
      }
    ]
    let queryAggregate = Admin.aggregate(query);
    const subadmin = await Admin.aggregatePaginate(queryAggregate, options);
    res.send({
      status: 200,
      message: 'SubAdmins List',
      data: { subadmin }
    })
  } catch (error) {
    next(error)
  }
}

exports.changeSubAdminStatus = async (req, res, next) => {
  try {
    const data = req.body;
    const subadminData = await User.findOne({ _id: data?._id });
    subadminData.status = !subadminData?.status
    const subadmin = await subadminData.save()
    res.send({
      status: 200,
      message: 'SubAdmin Status Update',
      data: { subadmin }
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteSubAdmin = async (req, res, next) => {
  try {
    const data = req.query;
    await subadmin.deleteOne({ _id: data?.id });
    res.send({
      status: 200,
      message: 'SubAdmin Deleted Successfully',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}