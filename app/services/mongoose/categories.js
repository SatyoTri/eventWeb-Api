const Categories = require('../../api/v1/categories/model');

const {NotFoundError, badRequestError} = require('../../errors');


const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
}

const createCategories = async (req) => {
    const { name } = req.body;

    const check = await Categories.findOne({name});
     if(check) throw new badRequestError('Nama Kategori sudah tersedia');

     const result = await Categories.create({name});

     return result;
}

const getOneCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findOne({_id : id})

    if (!result) throw new NotFoundError('Kategori tidak tersedia');

    return result;
}

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const check = await Categories.findOne({
        name,
        _id: { $ne: id},
    });

    if(check) throw new badRequestError('kategori sudah tersedia');

    const result = await Categories.findOneAndUpdate(
        {_id : id},
        {name},
        {new: true, runValidators: true}
    )

    if(!result)  throw new NotFoundError('kategori tidak tersedia');

    return result;
}

const deleteCategories = async(req) => {
    const { id } = req.params;

    const result = await Categories.findOne({_id : id})

    if(!result) throw new NotFoundError('tidak tersedia');

    await result.remove();

    return result;
}
module.exports = {
    getAllCategories,
    getOneCategories,
    createCategories,
    updateCategories,
    deleteCategories
}