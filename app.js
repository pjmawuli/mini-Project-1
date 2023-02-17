const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.createConnection('mongodb+srv://jnmpadi:cyberpunk2077@school-management-clust.4kxczqq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.log(err);
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
    id: { type: Number, required: true },
});

const Student = mongoose.model('Student', studentSchema);

app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findOne({ id: req.params.id });
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        res.send(student);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/students', async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            age: req.body.age,
            course: req.body.course,
            id: req.body.id,
        });
        await student.save();
        res.send(student);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
