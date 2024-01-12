const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../middleware/config");
const jwt = require('jsonwebtoken');
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    const existingUser = await User.findOne({username: username})
    if(existingUser) {
        return res.status(403).json({
            message: 'User already exists with this username'
        });
    }

    await User.create({
        username,
        password
    })

    res.json({
        message: 'User created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({
        username,
        password
    })
    if(user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET)

        await User.updateOne({ username }, { token })

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: 'Invalid username or password'
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const authorization = req.headers.authorization
    const words = authorization.split(' ')
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET)

    await User.updateOne({
        username: decodedValue.username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Successfully purchased the courses"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const authorization = req.headers.authorization
    const words = authorization.split(' ')
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET)

    const user = await User.findOne({
        username: decodedValue.username
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