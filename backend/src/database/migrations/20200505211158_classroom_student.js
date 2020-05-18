
exports.up = function(knex) {
  return knex.schema.createTable('classroom_student', function (table){
    table.string('classroom_id').notNullable()
    table.string('student_id').notNullable()

    table.foreign('classroom_id').references('id').inTable('classrooms')
    table.foreign('student_id').references('id').inTable('students')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('classroom_student')
};
