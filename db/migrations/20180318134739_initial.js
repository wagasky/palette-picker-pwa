// defines what should happen when we run the migration
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', table => {
      table.increments('id').primary()
      table.string('name')
      
      table.timestamps(true, true)
    }),

    knex.schema.createTable('palettes', table => {
      table.increments('id').primary
      table.string('name')
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('projects.id')

      table.string('swatch0')
      table.string('swatch1')
      table.string('swatch2')
      table.string('swatch3')
      table.string('swatch4')

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
