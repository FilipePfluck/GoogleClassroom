const connection = require("../database/connection")

module.exports = {
  async create(request, response){
    const { owner, body } = request.body
    const  classroom_id  = request.headers.authorization

    const day = new Date().getDate()
    const month = new Date().getMonth()+1

    const verifieIfClassroomIsValid = await connection('classroom_student')
      .where('classroom_id',classroom_id)
      .select('*')
      .first()

    const verifieIfTeacherIsValid = await connection('teachers')
      .where('name',owner)
      .select('*')
      .first()

    const verifieIfStudentIsValid = await connection('students')
      .where('name',owner)
      .select('*')
      .first()

    if(verifieIfClassroomIsValid){

      if(verifieIfStudentIsValid || verifieIfTeacherIsValid){

        const comment = {
        owner,
        body,
        day,
        month,
        classroom_id
        }

        await connection('comments').insert(comment)

        return response.json(comment)
      }

      else{
        return response.status(400).json({error: "Not loged in"})
      }
    }

    else{
      return response.status(400).json({message: "This classroom is not valid"})
    }
    
  },

  async index(request, response){
    const classroom_id = request.headers.authorization

    if(classroom_id){
      const comments = await connection('comments')
        .where('classroom_id',classroom_id)
        .select('*')

      return response.json(comments)
    }

    return response.status(400).json()
  }
  
}