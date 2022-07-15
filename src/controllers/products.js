const path = './db/products.json';
const File = require('../utils/File');

const db = new File(path);

const codes = require('../config/statusCode.json');
const { Products } = require('../models');

const products = {
  get: async (req, res) => {
    console.log('get products');
    try {
      if (req.params.id) {
        const data = await Products.findOne({ _id: req.params.id })
          .lean()
          .exec();
        return res.status(200).json({
          status: 'OK',
          data,
        });
      }
      const data = await Products.find().lean().exec();
      return res.status(200).json({ status: 'OK', data });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  create: async (req, res) => {
    console.log('create products');
    const body = req.body;
    const { name, description, code, photoUrl, price, stock } = body;
    if (!name || !description || !code || !photoUrl || !price || !stock) {
      throw res.status(codes.BAD_REQUEST).json({
        error: -1,
        descripcion: `Faltan datos para crear producto`,
      });
    }
    const newProduct = {
      name,
      description,
      code,
      photoUrl,
      price,
      stock,
    };
    try {
      const product = await Products.create({ ...newProduct });
      return res
        .status(codes.OK)
        .json({ status: 'OK', data: { id_prod: product._id } });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  update: async (req, res) => {
    console.log('update products');
    try {
      const { id } = req.params;
      const updateProduct = await Products.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      )
        .lean()
        .exec();
      if (!updateProduct) {
        throw res.status(codes.BAD_REQUEST).json({
          error: -1,
          descripcion: `Producto no existe`,
        });
      }

      return res.status(codes.OK).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  delete: async (req, res) => {
    console.log('delete products');
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(codes.BAD_REQUEST).json({
          error: -1,
          descripcion: `Se Require el ID para poder borrar el elemento`,
        });
      }
      await Products.findOneAndRemove({ _id: id });
      return res.status(codes.OK).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
};

module.exports = products;
