import asyncHandler from '../utils/asyncHandler.js'
import Restaurant from '../models/restaurantModel.js'
import User from '../models/userModel.js'

// @desc    إنشاء مطعم جديد
// @route   POST /api/restaurants
// @access  Private
const createRestaurant = asyncHandler(async (req, res) => {
    const { name, restaurantId } = req.body

    // التحقق من توفر معرف المطعم
    const restaurantIdExists = await Restaurant.findOne({ restaurantId })

    if (restaurantIdExists) {
        res.status(400)
        throw new Error('معرف المطعم مستخدم بالفعل')
    }

    // التحقق من أن المستخدم ليس لديه مطعم بالفعل
    const existingRestaurant = await Restaurant.findOne({ owner: req.user._id })

    if (existingRestaurant) {
        res.status(400)
        throw new Error('لديك مطعم بالفعل')
    }

    // إنشاء مطعم جديد
    const restaurant = await Restaurant.create({
        owner: req.user._id,
        name,
        restaurantId
    })

    if (restaurant) {
        // تحديث معرف المطعم في نموذج المستخدم
        await User.findByIdAndUpdate(req.user._id, { restaurantId })

        res.status(201).json(restaurant)
    } else {
        res.status(400)
        throw new Error('بيانات المطعم غير صالحة')
    }
})

// @desc    الحصول على مطعم المستخدم
// @route   GET /api/restaurants/my
// @access  Private
const getMyRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id })

    if (restaurant) {
        res.json(restaurant)
    } else {
        res.status(404)
        throw new Error('المطعم غير موجود')
    }
})

// @desc    تحديث بيانات المطعم
// @route   PUT /api/restaurants
// @access  Private
const updateRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id })

    if (!restaurant) {
        res.status(404)
        throw new Error('المطعم غير موجود')
    }

    const {
        name,
        logo,
        theme,
        contact,
        socialMedia
    } = req.body

    // تحديث البيانات
    restaurant.name = name || restaurant.name
    restaurant.logo = logo || restaurant.logo
    restaurant.theme = theme || restaurant.theme
    
    if (contact) {
        restaurant.contact = {
            ...restaurant.contact,
            ...contact
        }
    }

    if (socialMedia) {
        restaurant.socialMedia = {
            ...restaurant.socialMedia,
            ...socialMedia
        }
    }

    const updatedRestaurant = await restaurant.save()
    res.json(updatedRestaurant)
})

// @desc    إضافة منطقة توصيل جديدة
// @route   POST /api/restaurants/delivery-zones
// @access  Private
const addDeliveryZone = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id })

    if (!restaurant) {
        res.status(404)
        throw new Error('المطعم غير موجود')
    }

    const { name, fee } = req.body

    // التحقق من وجود المنطقة
    const zoneExists = restaurant.deliveryZones.find(zone => zone.name === name)

    if (zoneExists) {
        res.status(400)
        throw new Error('منطقة التوصيل موجودة بالفعل')
    }

    // إضافة منطقة جديدة
    restaurant.deliveryZones.push({ name, fee })
    await restaurant.save()

    res.status(201).json(restaurant.deliveryZones)
})

// @desc    حذف منطقة توصيل
// @route   DELETE /api/restaurants/delivery-zones/:id
// @access  Private
const removeDeliveryZone = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id })

    if (!restaurant) {
        res.status(404)
        throw new Error('المطعم غير موجود')
    }

    // حذف المنطقة
    restaurant.deliveryZones = restaurant.deliveryZones.filter(
        zone => zone._id.toString() !== req.params.id
    )

    await restaurant.save()
    res.json(restaurant.deliveryZones)
})

// @desc    إضافة كود خصم جديد
// @route   POST /api/restaurants/promo-codes
// @access  Private
const addPromoCode = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id })

    if (!restaurant) {
        res.status(404)
        throw new Error('المطعم غير موجود')
    }

    const { code, discount, expiryDate } = req.body

    // التحقق من وجود الكود
    const codeExists = restaurant.promoCodes.find(promo => promo.code === code)

    if (codeExists) {
        res.status(400)
        throw new Error('كود الخصم موجود بالفعل')
    }

    // إضافة كود جديد
    restaurant.promoCodes.push({ code, discount, expiryDate })
    await restaurant.save()

    res.status(201).json(restaurant.promoCodes)
})

// @desc    حذف كود خصم
// @route   DELETE /api/restaurants/promo-codes/:id
// @access  Private
const removePromoCode = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id })

    if (!restaurant) {
        res.status(404)
        throw new Error('المطعم غير موجود')
    }

    // حذف الكود
    restaurant.promoCodes = restaurant.promoCodes.filter(
        promo => promo._id.toString() !== req.params.id
    )

    await restaurant.save()
    res.json(restaurant.promoCodes)
})

export {
    createRestaurant,
    getMyRestaurant,
    updateRestaurant,
    addDeliveryZone,
    removeDeliveryZone,
    addPromoCode,
    removePromoCode
} 