const User = require("../Models");
const { Users } = User



exports.getUsersList = async (req, res, next) => {
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
            // {
            //   '$match': {
            //     'role': 'User'
            //   }
            // }
        ]
        let queryAggregate = User.aggregate(query);
        const users = await User.aggregatePaginate(queryAggregate, options);
        res.send({
            status: 200,
            message: 'Users List',
            data: { users }
        })
    } catch (error) {
        next(error)
    }
}

exports.changeUserStatus = async (req, res, next) => {
    try {
        const data = req.body;
        const userData = await Users.findOne({ _id: data?._id });
        userData.status = !userData?.status
        const user = await userData.save()
        res.send({
            status: 200,
            message: 'User Status Update',
            data: { user }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const data = req.query;
        await Users.deleteOne({ _id: data?.id });
        res.send({
            status: 200,
            message: 'User Deleted Successfully',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

exports.userLogin = async(req,res,next)=>{
  try {
    const data = req.body;
    const user = req.userData;
    const isMatched = await bcrypt.compare(data.password, user.password);
    if (isMatched) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        env().jwt_secret
      );
        user.password = null
      res.send({ status: 200, message: "Login successfully", data: { user,token } });
    } else {
      res.send({ status: 401, message: "Invalid email or password", data: {} });
    }
  } catch (error) {
    next(error)
  }
}