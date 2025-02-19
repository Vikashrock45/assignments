const mongoose = require('mongoose');
// require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb+srv://vikashr4545:<password>@cluster0.b5yn1fo.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    token: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}