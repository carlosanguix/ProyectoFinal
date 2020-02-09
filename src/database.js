// Requires
const mysql = require('mysql'); 
const { dbData } = require('./keys');

// Clase con las funcionalidades de la BBDD
class DbFunctionality {

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
            - BBDD:     ${dbData.database}
            - usuario:  ${dbData.user}
            - password: ${dbData.password}`);*/
            console.log(' * Base de datos conectada');
        });
    }
}

// TODO Exports de clases en MVC?
module.exports = DbFunctionality;


