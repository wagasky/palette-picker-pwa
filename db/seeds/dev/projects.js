
exports.seed = function(knex, Promise) {
 // Deletes ALL existing entries
 return knex('palettes').del()
     .then(function () {
       return Promise.all([
         knex('projects').insert({
           name: 'TestProject3'
         }, 'id')
         .then(project => {
           return knex('palettes').insert([
             {
               name: 'Green Palette',
               project_id: project[0],
               colors: ['#3db8bb', '#3db8bb', '#3db8bb', '#3db8bb', '#3db8bb']
             },          
             {
               name: 'Pink Palette',
               project_id: project[0],
               colors: ['#427147', '#427147', '#427147', '#427147', '#427147']
             },
           ])
         })  
         .then(() => console.log('Seeding complete!'))
         .catch( error => console.log(`Error seeding data: ${error}`))
       ])
   })
};