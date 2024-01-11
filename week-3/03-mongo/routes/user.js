const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement user signup logic
        const username = req.body.username;
        const password = req.body.password;
        
        // Check if the user already present in the DB.
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(403).json({
                message: 'User with this username already exists',
            });
        }

        // Create a new user
        await User.create({
            username,
            password,
        });

        return res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Error during user signup:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.json({
        response: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: 'Purchase complete!'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router