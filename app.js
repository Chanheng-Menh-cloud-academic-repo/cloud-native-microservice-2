const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(express.json());

// Database connection
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://alone:abde12345@nateka.pn5jt.mongodb.net/crud_project_2?retryWrites=true&w=majority&appName=Project_2_Crud');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Student Schema
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    major: { type: String }, // Use lowercase 'major'
});

const Student = mongoose.model('Student', studentSchema);

// Connect to the database
dbConnect();

// Student Registration API
app.post('/register', async (req, res) => {
    try {
        const { studentId, name, email, password, age, major } = req.body; // Use 'major'
        const newStudent = new Student({ studentId, name, email, password, age, major });
        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
});

// Student Login API
app.post('/login', async (req, res) => {
    try {
        const { studentId, password } = req.body;
        const student = await Student.findOne({ studentId, password });
        if (!student) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', student });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

// Student Search API
app.get('/search/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student found', student });
    } catch (error) {
        res.status(500).json({ error: 'Search failed', details: error.message });
    }
});

// Student Profile Update API
app.put('/update/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const updateData = req.body;
        const updatedStudent = await Student.findOneAndUpdate({ studentId }, updateData, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ error: 'Update failed', details: error.message });
    }
});

// Delete Student API
app.delete('/delete/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const deletedStudent = await Student.findOneAndDelete({ studentId });
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
    } catch (error) {
        res.status(500).json({ error: 'Deletion failed', details: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
