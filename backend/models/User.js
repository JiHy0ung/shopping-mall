const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: String, required: true, default: "customer" },
  },
  { timestamps: true }
);

// 데이터를 Json을 만들어 반환하기 전에 불필요한 데이터 삭제
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
