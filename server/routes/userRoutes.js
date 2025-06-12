import express from 'express'
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// مسارات المستخدم العامة
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// مسارات المستخدم المحمية
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router 