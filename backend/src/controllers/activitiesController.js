const connection = require("../database/connection")

module.exports = {
  async create(request, response){
    const { title, body, deadline_day, deadline_month } = request.body
    const  classroom_id  = request.headers.authorization
    const id = request.headers

    console.log(id.id)

    const day = new Date().getDate()
    const month = new Date().getMonth()+1

    const verifieIfClassroomIsValid = await connection('classroom_student')
      .where('classroom_id',classroom_id)
      .select('*')
      .first()

    const verifieIfTeacherIsValid = await connection('teachers')
      .where('id',id.id)
      .select('*')
      .first()

    if(verifieIfClassroomIsValid){

      if(verifieIfTeacherIsValid){
        const activitie = {
          title,
          body,
          day,
          month,
          deadline_day,
          deadline_month,
          classroom_id
        }

        await connection('activities').insert(activitie)

        return response.json(activitie)

      }

      else{
        return response.json({error: "You aren't a teacher"})
      }
    }

    else{
      return response.json({message: "This classroom is not valid"})
    }
    
  },

  async index(request, response){
    const classroom_id = request.headers.authorization

    const verifieIfClassroomIsValid = await connection('classroom_student')
      .where('classroom_id',classroom_id)
      .select('*')
      .first()

    if(verifieIfClassroomIsValid){
      const activities = await connection('activities')
        .where('classroom_id',classroom_id)
        .select('*')

      return response.json(activities)
    }

    else{
      return response.json({error: "This classroom is not valid"})
    }

    
  }
  
}
