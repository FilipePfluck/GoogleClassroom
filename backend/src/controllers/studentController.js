const connection = require("../database/connection")
const generateUniqueID = require('../utils/createUniqueId')
const parseClassroomAsObject = require('../utils/parseClassroomAsObject')

module.exports = {

  
  async index(request,response){
    const student_id = request.headers.authorization

    const student = await connection('students')
      .where('id',student_id)
      .select('*')
      .first()

    if(student){
      const classrooms_ids = await connection('classroom_student')
      .where('student_id',student_id)
      .select('classroom_id')

      const classrooms = []

      for(i=0;i<classrooms_ids.length;i++){
        const id = classrooms_ids[i].classroom_id

        const objectContainingNameAndTeacherId = await connection('classrooms')
          .where('id', id)
          .select('*')
          .first()

        const name = objectContainingNameAndTeacherId.name
        const teacher_id = objectContainingNameAndTeacherId.teacherID
        const description = objectContainingNameAndTeacherId.description

        const objectContainingTeacher = await connection('teachers')
          .where('id', teacher_id)
          .select('name')
          .first()

        const teacher = objectContainingTeacher.name
              
        const classroom = {
          id,
          name,
          teacher,
          description
        } 

        classrooms.push(classroom)
      }

      return response.json(classrooms)

    }
    else{
      return response.status(401).json({error: "Unauthorized"})
    }

  },

  async create(request, response){
    const { name, email, password } = request.body
    const id = generateUniqueID()

    await connection('students').insert({
      id,
      name,
      email,
      password
    })

    return response.json(id)
  },

  async enterClassroom(request, response){
    const { classroom_id } = request.body
    const student_id = request.headers.authorization

    const classroom = await connection('classrooms')
      .where('id',classroom_id)
      .select('*')
      .first()

    const student = await connection('students')
      .where('id',student_id)
      .select('*')
      .first()

    if(classroom){

      if(student){

        const verifyIfYouAreInTheClassroom = await connection('classroom_student')
          .where('student_id',student_id)
          .where('classroom_id',classroom_id)
          .select('*')
          .first()

        if(!verifyIfYouAreInTheClassroom){

          await connection('classroom_student').insert({
            student_id,
            classroom_id
          })

        }

        else{
          return response.status(400).json({error: "You have already joined this classroom"})
        }


      }
      
      else{
        return response.status(401).json({error:"Unauthorized"})
      }

    }
    
    else{
      return response.status(400).json({error:"This classroom doesn't exist"})
    }

    return response.json(classroom)
  }
  
}