const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URL;

mongoose.connect(`${mongodbUrl}`);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // to trim the extra trailing and leading spaces
    minLength: 3,
    maxLenth: 30,
  },
  password_hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: Number,
    required: true,
    trim: true,
  },
  wallet_balance: {
    type: Number, // never store decimal in case of payments in databases
    required: true,
    trim: true,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

// Method to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPassword) {
  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  // Salt adds randomness to hashed passwords, making it harder for hackers to guess or crack them using precomputed tables like rainbow tables. Each user's password becomes unique, even if they use the same one.
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);

  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};

// Validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

const transactionSchema = new mongoose.Schema({
  // we are adding reference to the User table here so that money transaction only happen between legit user that are there in the data base
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }, // optional note for transaction
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = {
  User,
  Transaction,
};
