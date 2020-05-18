
exports.up = function(knex) {
  return knex.schema.createTable('teachers', function (table){
    table.string('id').primary();

    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teachers');
};
