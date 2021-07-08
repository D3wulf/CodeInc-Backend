const { response } = require('express');

const Trabajador = require('../models/trabajador');

const getTrabajador = async(req, res = response) => {


    //select y el populate es para coger datos de otros modelos
    const trabajador = await Trabajador.find()
        .populate('usuario', 'nombre email')
        .populate('empresa', 'nombre')

    res.json({
        ok: true,
        trabajador
    })
}

const crearTrabajador = async(req, res = response) => {

    //AQui sabemos quien hizo la request
    const uid = req.uid;
    const { empresa } = req.body;

    //Desestructuramos el req body, esto va debajo del uid para la asignacion al usuario
    // ya que vamos a asignar al modelo en la parte del usuario, la uid
    const trabajador = new Trabajador({
        usuario: uid,
        empresa,
        ...req.body
    });




    try {

        const trabajadorDB = await trabajador.save();

        res.json({
            ok: true,
            msg: 'Todo correcto al crear el trabajador',
            trabajador: trabajadorDB
        })


    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error al crear el trabajador'
        })

    }




}

const updateTrabajador = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'updatecurrante, hola!'
    })
}
const borrarTrabajador = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'despidos, hola!'
    })
}



module.exports = { getTrabajador, crearTrabajador, updateTrabajador, borrarTrabajador };