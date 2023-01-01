const ProductsM = require("../Models/ProductsModel");

exports.getData = async () => {
    return await ProductsM.find();
};

exports.addData = async (blog) => {
    return await ProductsM.create(blog);
};

exports.getDataById = async (_id) => {
    return await ProductsM.findById({ _id });
};

exports.updateData = async (id, blog) => {
    return await ProductsM.findByIdAndUpdate(id, blog);
};
exports.updateOneData = async (_id, data) => {
    return await ProductsM.updateOne({ _id }, data);
};

exports.deleteData = async (id) => {
    return await ProductsM.findByIdAndDelete(id);
};