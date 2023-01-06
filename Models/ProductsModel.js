const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    thumbImage: { type: String },
    slider_image_url: [String],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    quantity: { type: Number },
    updated_date: { type: Date, default: Date.now },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Products', productsSchema);