const connection = require("../database/connection")

module.exports = async function parseClassroomAsObject(id){
  const objectContainingNameAndTeacherId = await connection('classrooms')
    .where('id', id)
    .select('name','teacherID')
    .first()

  const name = objectContainingNameAndTeacherId.name
  const teacher_id = objectContainingNameAndTeacherId.teacherID

  const objectContainingTeacher = await connection('teachers')
    .where('id', teacher_id)
    .select('name')
    .first()

  const teacher = objectContainingTeacher.name

  const classroom = {
    id,
    name,
    teacher
  }

  return classroom
}