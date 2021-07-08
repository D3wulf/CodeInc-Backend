const { response } = require('express');

const Empresa = require('../models/empresa');

const getEmpresas = async(req, res = response) => {
    //select y el populate es para ver quien lo creó
    const empresas = await Empresa.find().populate('usuario', 'nombre email img')

    res.json({
        ok: true,
        empresas
    })
}

const crearEmpresa = async(req, res = response) => {


    //AQui sabemos quien hizo la request
    const uid = req.uid;

    //Desestructuramos el req body, esto va debajo del uid para la asignacion al usuario
    // ya que vamos a asignar al modelo en la parte del usuario, la uid
    const empresa = new Empresa({
        usuario: uid,
        ...req.body
    });


    try {

        const empresaDB = await empresa.save();

        res.json({
            ok: true,
            msg: 'Todo correcto al crear la empresa',
            empresa: empresaDB
        })


    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error al crearEmpresa'
        })

    }



}

const updateEmpresa = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'updateEmpresa, hola!'
    })
}
const borrarEmpresa = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'borrarEmpresa, hola!'
    })
}



module.exports = { getEmpresas, crearEmpresa, updateEmpresa, borrarEmpresa };