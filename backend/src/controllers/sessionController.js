const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { email, password } = request.body;

        const student = await connection('students')
            .where('email',email)
            .where('password',password)
            .select('*')
            .first()

        const teacher = await connection('teachers')
            .where('email',email)
            .where('password',password)
            .select('*')
            .first()

        if(teacher){
          return response.json(teacher)
        }

        if(student){
          return response.json(student)
        }

        return response.status(400).json({error: "Email or password incorrect"})
    }
}