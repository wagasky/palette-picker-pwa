// defines what should happen when we run the migration
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('project', table => {
      table.increments('id').primary()
      table.string('name')
      
      table.timestamps(true, true)
    }),

    knex.schema.createTable('palette', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('project.id');
      table.specificType('colors', 'text[]');

      table.timestamps(true, true);
    })
  ])
};

// all knex methods return a promise of some sort

// down is the reverse, rolls back a migration
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palette'),
    knex.schema.dropTable('project')
  ])
};