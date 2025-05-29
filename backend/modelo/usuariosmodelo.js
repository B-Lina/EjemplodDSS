class UsuariosController{
    construct(){
    }
    async consultarDetalle(req,res){
        try{
            const admin = require('./firebaseAdmin');
            let iden = req.query.iden;
            const userDoc = await admin.firestore().collection('users').doc(iden).get();
 
            if (!userDoc.exists) {
                return res.status(404).json({ error: 'Usuario no encontrado:' + iden  });
            }
 
            // Obtener los datos del documento
            const userData = userDoc.data();
 
            return res.status(200).json(userData);
        }catch (err){
            res.status(500).send(err.message);
        }
     }

    
 
     /*
    async ingresar(req,res){
        try{
            const admin = require('./firebaseAdmin');
            
            const {dni,nombre,apellidos,email} = req.body;
            console.log("Datos recibidos");
            //console.log ("Documento de identidad:... " + dni);
            //console.log ("Nombres con apellidos:" + nombre + " " + apellidos);
            //console.log ("email: "+ email);
            //Asignando nombre del documento
            //const docRef = await admin.firestore().collection('users').doc("user654").set(req.body);
            //Adicionando con nombre de documento asignado dinámicamente
            //const docRef = await admin.firestore().collection('users').add(req.body);
            res.status(200).send ("Usuario agregado");
        }catch (err){
            res.status(500).send(err.message);
            console.log("Usuario en catch/error ")
        }
    }
    
}
module.exports = new UsuariosController();

*/

    async ingresar(req, res) {
            try {
                const admin = require('./firebaseAdmin');
                
                const { dni, nombre, apellidos, email } = req.body;
                
                // Validar datos requeridos
                if (!dni || !nombre || !apellidos || !email) {
                    return res.status(400).json({ 
                        error: 'Todos los campos son requeridos: dni, nombre, apellidos, email' 
                    });
                }

                console.log("Datos recibidos:");
                console.log("Documento de identidad:", dni);
                console.log("Nombres con apellidos:", nombre + " " + apellidos);
                console.log("email:", email);

                // Crear el objeto usuario
                const userData = {
                    dni: dni,
                    nombre: nombre,
                    apellidos: apellidos,
                    email: email,
                    fechaCreacion: new Date().toISOString()
                };

                // Guardar en Firestore usando el DNI como ID del documento
                await admin.firestore().collection('users').doc(dni).set(userData);
                
                console.log("Usuario guardado exitosamente con ID:", dni);
                
                res.status(200).json({ 
                    message: "Usuario agregado exitosamente",
                    id: dni,
                    data: userData
                });
                
            } catch (err) {
                console.error("Error al guardar usuario:", err);
                res.status(500).json({ error: err.message });
            }
        }
    }
module.exports = new UsuariosController();