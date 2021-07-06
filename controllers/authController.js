//para las ayudas del visual code
const { response } = require('express');

// nos traemos el modelo para que al crear usuario, rellenemos sus campos ya que los tememos del req.body
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');



const login = async(req, res = response) => {

    //cogemos lo que queremos
    const { email, password } = req.body;



    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado en login'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'todo correcto en mail/pass',
            token
        })


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Fallo en el authcontroller'
        })
    }


}

module.exports = { login };