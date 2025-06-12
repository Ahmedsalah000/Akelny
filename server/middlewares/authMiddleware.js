import jwt from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/userModel.js'

// حماية المسارات - التحقق من وجود المستخدم وصلاحيته
const protect = asyncHandler(async (req, res, next) => {
    let token

    // قراءة التوكن من الكوكيز
    token = req.cookies.jwt

    if (!token) {
        res.status(401)
        throw new Error('غير مصرح، لا يوجد توكن')
    }

    try {
        // التحقق من التوكن
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // إضافة بيانات المستخدم للطلب بدون كلمة المرور
        req.user = await User.findById(decoded.id).select('-password')
        
        next()
    } catch (error) {
        res.status(401)
        throw new Error('غير مصرح، التوكن غير صالح')
    }
})

// التحقق من صلاحيات المستخدم
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403)
            throw new Error('غير مسموح لك بالوصول إلى هذا المسار')
        }
        next()
    }
}

export { protect, authorize } 