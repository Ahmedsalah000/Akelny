import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    تسجيل مستخدم جديد
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, restaurantId } = req.body

    // التحقق من وجود المستخدم
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('المستخدم موجود بالفعل')
    }

    // التحقق من توفر معرف المطعم
    if (restaurantId) {
        const restaurantIdExists = await User.findOne({ restaurantId })
        if (restaurantIdExists) {
            res.status(400)
            throw new Error('معرف المطعم مستخدم بالفعل')
        }
    }

    // إنشاء مستخدم جديد
    const user = await User.create({
        name,
        email,
        password,
        restaurantId
    })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            restaurantId: user.restaurantId
        })
    } else {
        res.status(400)
        throw new Error('بيانات المستخدم غير صالحة')
    }
})

// @desc    تسجيل دخول المستخدم
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // التحقق من وجود المستخدم
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            restaurantId: user.restaurantId
        })
    } else {
        res.status(401)
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
})

// @desc    تسجيل خروج المستخدم
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'تم تسجيل الخروج بنجاح' })
})

// @desc    الحصول على بيانات المستخدم
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            restaurantId: user.restaurantId
        })
    } else {
        res.status(404)
        throw new Error('المستخدم غير موجود')
    }
})

// @desc    تحديث بيانات المستخدم
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        // تحديث كلمة المرور إذا تم إرسالها
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            restaurantId: updatedUser.restaurantId
        })
    } else {
        res.status(404)
        throw new Error('المستخدم غير موجود')
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} 