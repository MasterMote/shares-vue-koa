const mongoose = require('./db')
const Schema = mongoose.Schema

const UserCollection = mongoose.model("user", new Schema({
  userName: String,
  password: String
}), 'user')

module.exports = UserCollection