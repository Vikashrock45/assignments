const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();


// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement admin signup logic
        const username = req.body.username;
        const password = req.body.password;
        
        // Check if the user already present in the DB.
        const existingAdmin = await Admin.findOne({ username: username });

        if (existingAdmin) {
            return res.status(403).json({
                message: 'Admin with this username already exists',
            });
        }

        // Create a new admin
        await Admin.create({
            username,
            password,
        });

        return res.status(201).json({
            message: 'Admin created successfully',
        });
    } catch (error) {
        console.error('Error during admin signup:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
        // Implement course creation logic
        const title = req.body.title
        const description = req.body.description
        const price = req.body.price
        const imageLink = req.body.imageLink

        const newCourse = await Course.create({
            title: title,
            description: description,
            price: price,
            imageLink: imageLink
        });

        res.json({
            message: 'Course created successfully',
            courseId: newCourse._id
        })
    } catch (error) {
        console.error('Error during course creation:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})

    res.json({
        response: response
    })
});

module.exports = router;