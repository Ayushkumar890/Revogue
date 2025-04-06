const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Revogue", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("==============Mongodb Database Connected Successfully==============");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
