require("dotenv").config();
const thaibulksmsApi = require("thaibulksms-api");

const options = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
};

const sms = thaibulksmsApi.sms(options);

module.exports = {
  /**
   * @method sendSms
   * @param {String} phoneNumber phone number to send sms to
   * @param {String} message message in sms
   * @returns
   */
  async sendSms(phoneNumber, message) {
    const body = {
      msisdn: phoneNumber,
      message,
      sender: "Demo", // In free trial, can only be set to "Demo"
      // scheduled_delivery: '',
      // force: "", // Force sms type to be either "standard" or "corporate"
    };
    return await sms.sendSMS(body);
  },
};
