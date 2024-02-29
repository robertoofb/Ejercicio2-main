//Servicio nuevo de "carrera" vamos a enviar un ID para separar las carreras y visualizarlas segun su ID de carrera
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");
const getCarreraId = (request,response)=>{
    const id = request.params.id;
    //console.log(id); return false;
    connection.query("SELECT al.ID_Alumno, al.Nombre, al.Apellido, al.Email from tbl_alumno as al WHERE al.FK_Carrera = ?",
    [id],
    (error, results) => {
        if(error)
        throw error;
    response.status(201).json(results);
    });
};
app.route("/carrera/:id").get(getCarreraId);

const getCarreras = (request, response) => {
    connection.query("SELECT * FROM tbl_carrera",
    (error, results) => {
        if(error)
        throw error;
        response.status(201).json(results);
    });
};
app.route("/carreras").get(getCarreras);
module.exports = app;