require("dotenv").config();
const axios = require("axios");
module.exports = {
  index: async (ctx) => {
    // Get posted params
    const params = ctx.request.body;

    // The identifier is required.
    await axios
      .post(`${process.env.API}/auth/local`, {
        identifier: params.identifier,
        password: params.password,
      })
      .then(async (res) => {
        // Other params validation
        // Get User based on identifier
        const user = await strapi
          .query("user", "users-permissions")
          .findOne({ username: params.identifier });

        const password = await strapi.plugins[
          "users-permissions"
        ].services.user.hashPassword({ password: params.newPassword });
        // Update user password
        await strapi
          .query("user", "users-permissions")
          .update({ id: user._id }, { resetPasswordToken: null, password });

        // Return new jwt token
        ctx.send({
          jwt: strapi.plugins["users-permissions"].services.jwt.issue({
            id: user._id,
          }),
          user: user,
        });
      })
      .catch((err) => {
        return ctx.throw(400, err.response.data);
      });
  },
};
