const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://user:ufjI9Gc4Nfe3QQ5c@cluster0.e3pkkni.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const verbeteSchema = new mongoose.Schema({
    termo: String,
    significado: String,
    imagens: [String],
    fontes: [String]
});

const Verbete = mongoose.model('Verbete', verbeteSchema);

app.use(express.json());

// Rota para inserir um novo verbete
app.post('/verbetes', async(req, res) => {
    try {
        const verbete = new Verbete(req.body);
        await verbete.save();
        res.status(201).json(verbete);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao inserir verbete' });
    }
});
// Rota GET para obter todos os verbetes
app.get('/verbetes', async(req, res) => {
    try {
        const verbetes = await Verbete.find();
        res.status(200).json(verbetes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter verbetes' });
    }
});
app.put('/verbetes/:id', async(req, res) => {
    try {
        const verbete = await Verbete.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!verbete) {
            return res.status(404).json({ error: 'Verbete não encontrado' });
        }
        res.status(200).json(verbete);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar verbete' });
    }
});
app.delete('/verbetes/:id', async(req, res) => {
    try {
        const verbete = await Verbete.findByIdAndDelete(req.params.id);
        if (!verbete) {
            return res.status(404).json({ error: 'Verbete não encontrado' });
        }
        res.status(200).json({ message: 'Verbete excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir verbete' });
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado `);
});