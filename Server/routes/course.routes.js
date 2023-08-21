import {Router } from 'express';
// import upload from '../middlewares/multer.middleware.js';
import { createCourse, getAllCourse, getLecturesByCourseId, updateCourse } from '../controllers/course.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
.get(getAllCourse)
.post(
    isLoggedIn, 
    // upload.single('thumbnail'),
    createCourse

);
router.route('/:id')
.get(isLoggedIn,getLecturesByCourseId)
.put(
    isLoggedIn,
    updateCourse
)
export default router;