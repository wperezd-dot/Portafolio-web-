const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//MIDDLEWARES
app.use(cors()); //para que el index.html pueda consultar la API
app.use(express.json());

//CONEXIÓN A MONGODB 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
    .catch(err => console.error('Error crítico de conexión:', err));

//MODELO DE DATOS
const experienciaSchema = new mongoose.Schema({
    cargo: { type: String, required: true },
    empresa: { type: String, required: true },
    periodo: { type: String, required: true },
    descripcion: { type: String, required: true }
});

const Experiencia = mongoose.model('Experiencia', experienciaSchema);

//RUTAS DEL API (CRUD)

// Obtener todas las experiencias
app.get('/api/experiencias', async (req, res) => {
    try {
        const experiencias = await Experiencia.find().sort({ _id: -1 }); // Mostrar las más recientes primero
        res.json(experiencias);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// Crear nueva experiencia
app.post('/api/experiencias', async (req, res) => {
    try {
        const nuevaExp = new Experiencia(req.body);
        await nuevaExp.save();
        res.status(201).json(nuevaExp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar experiencia
app.put('/api/experiencias/:id', async (req, res) => {
    try {
        const actualizada = await Experiencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar experiencia
app.delete('/api/experiencias/:id', async (req, res) => {
    try {
        await Experiencia.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro eliminado correctamente" });
    } catch (err) {
        res.status(400).json({ error: "ID no encontrado" });
    }
});

//Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en: http://localhost:${PORT}`);
});