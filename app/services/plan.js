const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (Model, App) => {
  const ListAll = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Model.plans.findAll({ raw: true });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  const FindPlanByStripeCode = (stripeCode) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Model.plans.findOne({
          raw: true,
          where: { stripe_plan_id: { [Op.eq]: stripeCode } }
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    Name: 'Plan',
    ListAll,
    FindPlanByStripeCode
  }
}
