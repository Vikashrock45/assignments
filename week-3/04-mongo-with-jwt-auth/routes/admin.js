const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {JWT_SECRET} = require('../middleware/config');
const jwt = require('jsonwebtoken');
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const existingAdmin = await Admin.findOne({ username: username });

    if(existingAdmin) {
        return res.status(403).json({
            message: 'Admin already exists with this username'
        });
    }

    await Admin.create({
        username,
        password
    })

    res.json({
        message: 'Admin created successfully'
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    
    const user = await Admin.findOne({
        username: username,
        password: password
    })
    
    if(user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        await Admin.updateOne({ username }, { token });

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: 'Incorrect username or password'
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    });
    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})

    res.json({
        response: response
    })
});

module.exports = router;