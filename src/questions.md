Express.static??? dynamic????
    -> (Gestor de plantillas) Dynamic para plantillas (No se aun si lo quiero)

Mantener al usuario logeado por un tiempo limitado aunque cierre el navegador

Para las votaciones y demás guardar los datos del usuario en una cookie para que por ejemplo, cuando vote, tener en algún sitio esos datos del usuario y así realizar el insert, update, delete de la base de datos con sus datos.
    -> Cookie

Cifrar password registro/login
    -> Meter la contraseña ya cifrada en la BBDD como un string y cuando quieras comprobar si el usuario ha metido bien la contraseña, cifrarla y comprobar si es igual al string de la contraseña en la BBDD

beers.model.js (MAL)
    -> En el modelo solo tiene que estar la estructura de los datos de la BBDD, la conexión debería hacerse en server.js y las funciones de consulta en el controlador.