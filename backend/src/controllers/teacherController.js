const connection = require("../database/connection")
const generateUniqueID = require('../utils/createUniqueId')

module.exports = {
  async index(request,response){
    const teachers = await connection('teachers').select('*');

    return response.json(teachers);
  },

  async create(request, response){
    const { name, email, password } = request.body
    const id = generateUniqueID()

    await connection('teachers').insert({
      id,
      name,
      email,
      password
    })

    return response.json()
  }
}