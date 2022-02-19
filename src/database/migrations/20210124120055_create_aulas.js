
exports.up = function(knex) {
    return knex.schema.createTable('aulas', function(table){
        table.increments();

        table.string('subject').notNullable();
        table.string('prof').notNullable();
        table.string('curso').notNullable();
        table.string('description').notNullable();
        table.string('data_aula').notNullable();
        table.string('hora').notNullable();
      

        table.string('teacher_id').notNullable();

      table.foreign('teacher_id').references('id').inTable('teachers');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('aulas');
};
