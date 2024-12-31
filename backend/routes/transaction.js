const express = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Transaction } = require("../db");
const { sendMoneyType } = require("../types/transaction");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/send-money", userMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const senderEmail = req.email;
    const response = sendMoneyType.safeParse(req.body);

    if (!response.success) {
      throw new Error(response.error);
    }

    // .session(session) or {session: session} ensures that the query is executed as part of the transaction, maintaining atomicity, consistency, and isolation within the operation.
    const senderData = await User.findOne({ email: senderEmail }).session(
      session
    );
    const receiverExist = await User.findOne({
      email: response.data.receiver_email,
    }).session(session);

    if (!senderData || !receiverExist) {
      throw new Error("Sender or receiver does not exist");
    }

    // Check for sufficient balance
    const remaningBalance =
      senderData.wallet_balance - response.data.sending_amount;
    if (remaningBalance <= 0 || response.data.sending_amount <= 0) {
      throw new Error("Insufficient balance");
    }

    // Perform the fund transfer
    const moneyTransaction = await User.bulkWrite(
      [
        {
          updateOne: {
            filter: { email: senderEmail },
            update: { $set: { wallet_balance: remaningBalance } },
          },
        },
        {
          updateOne: {
            filter: { email: response.data.receiver_email },
            update: {
              $set: {
                wallet_balance:
                  receiverExist.wallet_balance + response.data.sending_amount,
              },
            },
          },
        },
      ],
      { session: session }
    );

    if (moneyTransaction.modifiedCount !== 2) {
      throw new Error("Money transaction update failed");
    }

    // means transaction was successfull
    // Log the transaction
    const transaction = await Transaction.create(
      // here have to wrap it in an array to use {session: session}
      [
        {
          sender_id: senderData._id,
          receiver_id: receiverExist._id,
          amount: response.data.sending_amount,
          status: "success",
          description: response.data.note,
        },
      ],
      { session: session }
    );

    const transactionIdUpdate = await User.bulkWrite(
      [
        {
          updateOne: {
            filter: { email: senderEmail }, // Match the sender
            update: { $push: { transactions: transaction[0]._id } }, // Add transaction ID to sender's transactions
          },
        },
        {
          updateOne: {
            filter: { email: response.data.receiver_email }, // Match the receiver
            update: { $push: { transactions: transaction[0]._id } }, // Add transaction ID to receiver's transactions
          },
        },
      ],
      { session: session }
    );

    if (transactionIdUpdate.modifiedCount !== 2) {
      throw new Error("Failed to associate transaction ID with users");
    }

    await session.commitTransaction();
    return res.json({
      message: "transaction successfull",
      transaction: transactionIdUpdate,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(404).json({ error: error.message });
  } finally {
    // will always run
    session.endSession();
  }
});

router.get("/user-transactions", userMiddleware, async (req, res) => {
  try {
    const userEmail = req.email;
    const userData = await User.findOne({ email: userEmail }).populate({
      path: "transactions",
      populate: [
        {
          path: "receiver_id",
          model: "User",
          select: "name email",
        },
        {
          path: "sender_id",
          model: "User",
          select: "name email",
        },
      ],
    });
    return res.json({ transactions: userData.transactions });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
