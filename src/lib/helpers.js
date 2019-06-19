const bcrypt = require('bcryptjs');
const helpers = {};

/**ENCRIPTADO DE PASSWORD
 * ENTRADA: ENTRA EL PASSWORD INGRESADO POR EL USARIO AL REGISTRARSE:
 * PROCESO: SE CODIFICA EL PASSWORD PARA LUEGO SER ALMACENADO
 * SALIDA: PASSWORD CODIFICADO
 */
helpers.encryptPassword = async(Password_Usuario) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password_Usuario, salt);
    return hash;
};
/**DESENCRIPTADO DE PASSWORD
 * ENTRADA: ENTRA EL PASSWORD INGRESADO POR EL USARIO AL LOGUEARSE:
 * PROCESO: COMPARA LA CONTRASEÑA INGRESADA CUANDO SE LOGUE CON LA CONTRASEÑA ALMACENADA EN LA BD
 * SALIDA: TRUE SI SON IGUALES Y FALSE SI SON DISTINTAS
 */
helpers.matchPassword = async(password, savedPassword) => {
    try {


        const result = await bcrypt.compare(password, savedPassword);

        return result;

    } catch (e) {
        console.log(e);
    }
};



module.exports = helpers;