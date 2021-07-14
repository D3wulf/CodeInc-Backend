const { response } = require("express");

const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');
const usuario = require("../models/usuario");

const validarJWT = (req, res = response, next) => {

    //los tokens van en el postman en header

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Error en TOken-Middleware, no existe"

        });
    }

    try {
        //extraemos del jwt.verify los datos y deconstruimos para coger el uid
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        //queremos pasar el id al controlador si el token ha sido correcto

        req.uid = uid;


    } catch (error) {

        return res.status(401).json({

            ok: false,
            msg: "Token no válido"
        });

    }

    next();
}

const validarAdmin = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({

                ok: false,
                msg: 'No existe usuario en bbdd en validarJWT'
            })
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {

            return res.status(403).json({

                ok: false,
                msg: 'No es Administrador'
            })
        }

        // si todo va ok
        next();

    } catch (error) {
        res.status(500).json({

            ok: false,
            msg: 'Error en la verificacion del admin en validarJWT'
        })

    }

}

const validarAdmin_o_mismoUser = async(req, res, next) => {

    const uid = req.uid;
    
    const id = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({

                ok: false,
                msg: 'No existe usuario en bbdd en validarJWT'
            })
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid===id) {


            // si todo va ok
            next();
            
        }else{

            return res.status(403).json({

                ok: false,
                msg: 'No es Administrador'
            })

        }

        

    } catch (error) {
        res.status(500).json({

            ok: false,
            msg: 'Error en la verificacion del admin en validarJWT'
        })

    }

}

module.exports = {
    validarJWT,
    validarAdmin,validarAdmin_o_mismoUser
}