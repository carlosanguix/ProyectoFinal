
// TODO Fuera de aquí!
// Requires
const mysql = require('mysql'); 
const { dbData } = require('../../keys');

// Clase con las funcionalidades de la BBDD
class Database {

    constructor() {
        this.conn = mysql.createConnection({
            host: dbData.host,
            user: dbData.user,
            password: dbData.password
        });
    }
    
    // Functions
    connect() {

        return this.conn.connect((err) => {
            
            if(err)
            return console.log('!**' + err);
            else
            /*console.log(` * Base de datos conectada
            - BBDD:     ${db.dbData.database}
            - usuario:  ${db.dbData.user}
            - password: ${db.dbData.password}`);*/
            console.log(' * Base de datos conectada');
        });
    }

    findOneBeer(idBeer) {
        
    }
}

// TODO Exports de clases en MVC? Rutas?
module.exports = Database;