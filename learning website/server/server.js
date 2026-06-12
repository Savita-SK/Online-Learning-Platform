const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const quizRoutes = require('./routes/quiz');
const progressRoutes = require('./routes/progress');
const certificateRoutes = require('./routes/certificate');
const seedData = require('./utils/seedData');

dotenv.config();
connectDB().then(seedData);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/server/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
