// id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
const path = './db/carts.json';
const File = require('../utils/File');

const db = new File(path);

const codes = require('../config/statusCode.json');
const { Carts } = require('../models');

const carts = {
  create: async (req, res) => {
    console.log('create cart');
    const body = req.body;
    if (!body.products) {
      throw res.status(codes.BAD_REQUEST).json({
        error: -1,
        descripcion: `Faltan productos en el carro`,
      });
    }
    try {
      const newCart = {
        products: [...body.products],
      };
      const carts = await Carts.create({ ...newCart });
      return res
        .status(codes.OK)
        .json({ status: 'OK', data: { id: carts._id } });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  delete: async (req, res) => {
    console.log('empty cart');
    const { id } = req.params;
    if (!id) {
      return res.status(codes.BAD_REQUEST).json({
        error: -1,
        descripcion: `Falta id`,
      });
    }
    try {
      await Carts.findOneAndDelete({ _id: id }).exec();
      return res.status(codes.OK).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  getById: async (req, res) => {
    console.log('get all products cart by id');
    const { id } = req.params;
    if (!id) {
      throw res.status(codes.BAD_REQUEST).json({
        error: -1,
        descripcion: `Faltan parametros`,
      });
    }
    try {
      const cart = await Carts.findOne({ _id: id })
        .populate('products')
        .lean()
        .exec();
      return res
        .status(codes.OK)
        .json({ status: 'OK', data: [...cart.products] });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  addProduct: async (req, res) => {
    console.log('add products to carts');

    const ids = req.body.productsIds;
    const cartId = req.params.id;
    if (ids.length === 0 || !cartId)
      throw res.status(codes.BAD_REQUEST).json({
        error: -1,
        descripcion: `Faltan parametros`,
      });
    try {
      const updating = await Carts.findOne({ _id: cartId }).exec();

      updating.products = [...updating.products, ...ids];
      await updating.save();
      return res.status(codes.OK).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(codes.INTERNAL_SERVER_ERROR).json({
        error: -1,
        descripcion: `Error del servidor`,
      });
    }
  },
  deleteProduct: async (req, res) => {
    console.log('delete product by cart id and product id');

    const id_prod = req.params.id_prod;
    const cartId = req.params.id;
    if (!id_prod || !cartId)
      throw res.status(codes.BAD_REQUEST).json({
        error: -1,
        descripcion: `Falta parametro(s)`,
      });
    try {
      const cart = await Carts.findOne({ _id: cartId }).exec();
      console.log(cart);
      cart.products = cart.products.filter((p) => p.toString() !== id_prod);
      await cart.save();

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

module.exports = carts;
