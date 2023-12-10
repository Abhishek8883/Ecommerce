const catchAsyncErrors = require("../middlewares/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { successResponse, successResponseData } =  require("../services/response")


module.exports = {
  processPayment: catchAsyncErrors(
    async (req, res, next) => {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Ecommerce",
        },
      });

      return successResponseData(res, { client_secret: myPayment.client_secret })
    }),

  sendStripeApiKey :catchAsyncErrors(
    async (req, res, next) => {
      return successResponseData(res,{ stripeApiKey: process.env.STRIPE_API_KEY })
    })

}
