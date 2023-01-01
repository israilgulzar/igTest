const bcrypt = require('bcrypt');
const AdminM = require("../Models/AdminModel");

exports.getData = async (params) => {
    return await AdminM.find(params);
};
exports.getOneData = async (params) => {
    return await AdminM.findOne(params);
};
exports.addData = async (params) => {
    params.password = await bcrypt.hash(params.password, 10)
    return await AdminM.create(params);
};
exports.getDataById = async (id) => {
    return await AdminM.findById(id);
};
exports.updateData = async (id, params) => {
    return await AdminM.findByIdAndUpdate(id, params);
};
exports.deleteData = async (id) => {
    return await AdminM.findByIdAndDelete(id);
};