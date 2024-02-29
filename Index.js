const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//Cargamos el archivo de rutas
app.use(require('./routes/alumnos'));
app.use(require('./routes/materia'));
app.use(require('./routes/carrera'));

//app.use(require('./routes/materias'));

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log('El servidor escucha el puerto ' + PORT);
});

module.exports = app;