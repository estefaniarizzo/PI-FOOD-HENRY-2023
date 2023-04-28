 
const server = require('./src/app.js'); 
const { conn } = require('./src/db.js'); 
 
// Syncing all the models at once. 
conn.sync({ force: true }).then(() => {      // force: false ----> para que no me borre todos los datos de la BD 
  server.listen(3001, () => { 
    console.log('%s listening at 3001'); // eslint-disable-line no-console 
  }); 
}); 
 