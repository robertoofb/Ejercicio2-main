const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos

const {connection} = require("../config/config.db");
const getMateria = (request,response) => {
    connection.query("SELECT * FROM tbl_materia",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
app.route("/materia").get(getMateria);

/*Post de materia en base de datos*/
const postMateria = (request,response) => {
    const {Materia, Cuatrimestre} = request.body;
    connection.query("INSERT INTO tbl_materia (Materia, Cuatrimestre) VALUES(?,?)",
    [Materia, Cuatrimestre],
    (error,results) => {
        if(error)
        throw error;
    response.status(201).json({"Materia agregada": results.affectedRows});
    });
};
app.route("/materia").post(postMateria);

//Servicio para eliminar una materia
const delMateria = (request,response)=>{
    const id = request.params.id;
    //console.log(id); return false;
    connection.query("DELETE FROM tbl_materia WHERE ID_Materia = ?",
    [id],
    (error, results) => {
        if(error)
        throw error;
    response.status(201).json({"Materia eliminada":results.affectedRows});
    });
};
app.route("/materia/:id").delete(delMateria);

module.exports = app;