
exports.up = function(knex) {
  return knex.schema.createTable('classrooms', function (table){
    table.string('id').primary()

    table.string('name').notNullable()
    table.string('teacherID').notNullable()
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('classrooms')
};
