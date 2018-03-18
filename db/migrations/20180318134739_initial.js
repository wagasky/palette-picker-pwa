// defines what should happen when we run the migration
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', table => {
      table.increments('id').primary()
      table.string('name')
      
      table.timestamps(true, true)
    }),

    knex.schema.createTable('palettes', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('project.id');
      table.specificType('colors', 'text[]');

      table.timestamps(true, true)
    })
  ])
};

// all knex methods return a promise of some sort

// down is the reverse, rolls back a migration
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ])
};
