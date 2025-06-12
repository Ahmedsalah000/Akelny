// معالجة الطلبات للمسارات غير الموجودة
const notFound = (req, res, next) => {
    const error = new Error(`المسار غير موجود: ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// معالجة الأخطاء العامة
const errorHandler = (err, req, res, next) => {
    // تحديد رمز الحالة (404 إذا لم يتم تحديده)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler } 