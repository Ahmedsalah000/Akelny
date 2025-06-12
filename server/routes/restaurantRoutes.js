import express from 'express'
import {
    createRestaurant,
    getMyRestaurant,
    updateRestaurant,
    addDeliveryZone,
    removeDeliveryZone,
    addPromoCode,
    removePromoCode
} from '../controllers/restaurantController.js'
import { protect, authorize } from '../middlewares/authMiddleware.js'

const router = express.Router()

// مسارات المطعم المحمية
router.route('/')
    .post(protect, createRestaurant)
    .put(protect, updateRestaurant)

router.get('/my', protect, getMyRestaurant)

// مسارات مناطق التوصيل
router.route('/delivery-zones')
    .post(protect, addDeliveryZone)

router.route('/delivery-zones/:id')
    .delete(protect, removeDeliveryZone)

// مسارات أكواد الخصم
router.route('/promo-codes')
    .post(protect, addPromoCode)

router.route('/promo-codes/:id')
    .delete(protect, removePromoCode)

export default router 