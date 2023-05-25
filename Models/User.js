const Mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const { JWT_SECRET_KEY } = require('../configs/constants')

const userSchema = new Mongoose.Schema({
  profile_pic: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
userSchema.plugin(aggregatePaginate);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.verifyPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ userid: this._id, role: 'webUser' }, JWT_SECRET_KEY, {
    expiresIn: '3d'
  })
}


Users = Mongoose.model("Users", userSchema);
module.exports = Users
