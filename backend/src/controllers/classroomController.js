const connection = require("../database/connection")
const generateUniqueID = require('../utils/createUniqueId')

module.exports = {
  async index(request,response){
    const classrooms = await connection('classrooms').select('*');

    return response.json(classrooms);
  },

  async create(request, response){
    const { name, description } = request.body
    const teacherID = request.headers.authorization
    const id = generateUniqueID()

    let teacher_id = await connection('teachers')
      .where('id',teacherID)
      .select('id')
      .first()
    
    if(teacher_id){
      teacher_id = teacher_id.id
    
      await connection('classrooms').insert({
        id,
        name,
        teacherID,
        description
      })

      return response.json()
    }else{
      return response.json({error: "This teacher doesn't exist"})
    }

  },

  async delete(){

  },

  async listPeople(request, response){
    const classroom_id = request.headers.authorization

    const students_ids = await connection('classroom_student')
      .where('classroom_id',classroom_id)
      .select('student_id')

    const students = []

      for(i=0;i<students_ids.length;i++){
        const id = students_ids[i].student_id

        const objectContainingStudentName = await connection('students')
          .where('id', id)
          .select('name')
          .first()

        const name = objectContainingStudentName.name
              
        const student = {
          name,
          id
        } 

        students.push(student)
      }

    return response.json(students)
  }
}