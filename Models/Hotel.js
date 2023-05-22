const Mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const Hotel = new Mongoose.Schema({
  images: {
    type: Array,
    default: [],
  },
  hotel_name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone:{
    type:String,
  },
  no_of_rooms: {
    type: String,
  },
  rooms_types:{
    type:Array,
    default: [],
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
Hotel.plugin(aggregatePaginate);
module.exports = Mongoose.model("Hotel", Hotel);
