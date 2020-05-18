
exports.up = function(knex) {
  return knex.schema.createTable('activities', function (table){
    table.increments()

    table.string('title').notNullable()
    table.text('body').notNullable()
    table.date('day').notNullable()
    table.date('month').notNullable()
    table.date('deadline_day')
    table.date('deadline_month')

    table.string('classroom_id').notNullable()
    table.foreign('classroom_id').references('id').inTable('classrooms')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('activities')
};
