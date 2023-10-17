const User = require("../models/users")

module.exports = {
  async insertUser(req, res) {
    let { user, email, password } = req.body;
    if (user == undefined && email == undefined && password == undefined) {
      res.sendStatus(400)
    } else {
      User.create({
        user: user,
        email: email,
        password: password
      }).then(() => {
        res.sendStatus(201)
      }).catch((err) => {
        res.sendStatus(400).json({
          "erro": `${err}`
        })
      })
    }
  }
}