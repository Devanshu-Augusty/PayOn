const zod = require('zod');

const sendMoneyType = zod.object({
  receiver_email: zod.string().email(),
  sending_amount: zod.number(),
  note: zod.string()
});

module.exports = {
  sendMoneyType
};