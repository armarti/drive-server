const axios = require('axios');

const passport = require('~middleware/passport');

const { passportAuth } = passport;

module.exports = (Router, Service, Logger, App) => {
  Router.get('/usage', passportAuth, function (req, res) {
    const userData = req.user;

    const pwd = userData.userId;
    const pwdHash = Service.Crypt.hashSha256(pwd);

    const credential = Buffer.from(`${userData.email}:${pwdHash}`).toString(
      'base64'
    );

    axios
      .get(`${App.config.get('STORJ_BRIDGE')}/usage`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credential}`,
        },
      })
      .then((data) => {
        res.status(200).send(data.data ? data.data : { total: 0 });
      })
      .catch((err) => {
        res.status(400).send({ result: 'Error retrieving bridge information' });
      });
  });

  // TODO
  Router.get('/limit', passportAuth, function (req, res) {
    const userData = req.user;

    const pwd = userData.userId;
    const pwdHash = Service.Crypt.hashSha256(pwd);

    const credential = Buffer.from(`${userData.email}:${pwdHash}`).toString(
      'base64'
    );

    axios
      .get(`${App.config.get('STORJ_BRIDGE')}/limit`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credential}`,
        },
      })
      .then((data) => {
        res.status(200).send(data.data);
      })
      .catch((err) => {
        res.status(400).send({ result: 'Error retrieving bridge information' });
      });
  });
};
