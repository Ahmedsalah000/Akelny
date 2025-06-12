import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'الاسم مطلوب']
        },
        email: {
            type: String,
            required: [true, 'البريد الإلكتروني مطلوب'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'البريد الإلكتروني غير صالح']
        },
        password: {
            type: String,
            required: [true, 'كلمة المرور مطلوبة'],
            minlength: [6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل']
        },
        role: {
            type: String,
            enum: ['restaurantOwner', 'superAdmin'],
            default: 'restaurantOwner'
        },
        restaurantId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

// تشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// مقارنة كلمة المرور المدخلة مع المخزنة
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User 