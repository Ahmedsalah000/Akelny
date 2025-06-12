import mongoose from 'mongoose'

const restaurantSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        restaurantId: {
            type: String,
            required: [true, 'معرف المطعم مطلوب'],
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, 'اسم المطعم مطلوب']
        },
        logo: {
            type: String,
            default: '/images/default-restaurant.png'
        },
        theme: {
            type: String,
            default: 'default'
        },
        contact: {
            email: String,
            phone: String,
            whatsapp: String,
            address: String
        },
        socialMedia: {
            facebook: String,
            instagram: String,
            twitter: String
        },
        deliveryZones: [
            {
                name: {
                    type: String,
                    required: true
                },
                fee: {
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ],
        promoCodes: [
            {
                code: {
                    type: String,
                    required: true
                },
                discount: {
                    type: Number,
                    required: true
                },
                expiryDate: {
                    type: Date
                },
                isActive: {
                    type: Boolean,
                    default: true
                }
            }
        ],
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

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant 