
exports.up = function(knex) {
  return knex.schema.createTable('comments', function (table){
    table.increments()

    table.string('owner').notNullable()
    table.text('body').notNullable()
    table.date('day').notNullable()
    table.date('month').notNullable()

    table.string('classroom_id').notNullable()
    table.foreign('classroom_id').references('id').inTable('classrooms')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
