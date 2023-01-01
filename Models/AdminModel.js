const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    user_name: { type: String }, // for later use
    country_code: { type: String }, // for later use
    phone: { type: String }, // for later use
    email: { type: String, require: true },
    password: { type: String, require: true },
    token: { type: String, require: true },
    updated_date: { type: Date, default: Date.now },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);

