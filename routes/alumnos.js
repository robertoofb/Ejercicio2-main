const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos

const {connection} = require("../config/config.db");
const getAlumno = (request,response) => {
    connection.query("SELECT tbl_alumno.Nombre,tbl_alumno.Email, tbl_carrera.Carrera, tbl_alumno.Edad FROM tbl_alumno INNER JOIN tbl_carrera WHERE tbl_alumno.FK_Carrera = tbl_carrera.ID_Carrera",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

//Listado de alumnos y a que carrera pertenecen
const getAlumnoCarrera = (request,response) => {
    connection.query('SELECT al.nombre,car.carrera FROM tbl_alumno as al'+
                    ' INNER JOIN tbl_carrera as car ON al.FK_Carrera=car.ID_Carrera',
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta
app.route("/alumnoscarrera").get(getAlumnoCarrera);




/*aqui va mi primer post*/
const postAlumno = (request, response) => {
    const {action,id,carrera, nombre, apellido, edad, email, estado} = request.body;
    //console.log(action);return false;
    if(action == "insert"){
        connection.query("INSERT INTO tbl_alumno (FK_Carrera, Nombre, Apellido, Edad, Email, Estado) VALUES (?,?,?,?,?,?)", 
        [carrera, nombre, apellido, edad,email,estado],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item añadido correctamente": results.affectedRows});
        });
    }
    else{
        //console.log(action);return false;
        connection.query("UPDATE tbl_alumno SET FK_Carrera = ?, Nombre = ?, Apellido =?, Edad = ? , Email = ?, Estado = ? WHERE ID_Alumno = ?", 
        [carrera,nombre, apellido, edad,email,estado,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item editado con exito": results.affectedRows});
        });
    }
};
app.route("/alumnos").post(postAlumno);

//Servicio para eliminar un alumno
const delAlumno = (request,response)=>{
    const id = request.params.id;
    //console.log(id); return false;
    connection.query("DELETE FROM tbl_alumno WHERE ID_Alumno = ?",
    [id],
    (error, results) => {
        if(error)
        throw error;
    response.status(201).json({"Alumno eliminado":results.affectedRows});
    });
};
app.route("/alumnos/:id").delete(delAlumno);

//Ruta
app.route("/alumnos").get(getAlumno);
module.exports = app;