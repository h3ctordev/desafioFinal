// id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
const path = './db/carts.json';
const File = require('../utils/File');

const db = new File(path);

const carts = {
  create: async (req, res) => {
    console.log('create cart');
    const body = req.body;
    if (!body?.products) {
      return res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    try {
      const newCart = {
        products: [...body.products],
        timestamp: new Date().getTime(),
      };
      const cartsId = await db.save({ ...newCart });
      return res.status(200).json({ status: 'OK', data: { id: cartsId } });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  delete: async (req, res) => {
    console.log('empty cart');
    const { id } = req.params;
    if (isNaN(+id) || !id) {
      return res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    try {
      await db.deleteById(id);
      return res.status(200).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  getById: async (req, res) => {
    console.log('get all products cart by id');
    const { id } = req.params;
    if (isNaN(+id) || !id) {
      return res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    try {
      const cart = await db.getById(id);
      return res.status(200).json({ status: 'OK', data: [...cart.products] });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  addProduct: async (req, res) => {
    console.log('add products to carts');
    const pathProducts = './db/products.json';
    const dbProducts = new File(pathProducts);

    const ids = req.body.productsIds;
    const cartId = req.params.id;
    if (ids.length === 0)
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    if (!cartId)
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    try {
      const _products = ids.map((p) => dbProducts.getById(p));
      const products = await Promise.all([..._products]);
      const cart = await db.getById(cartId);
      await db.update(cartId, {
        ...cart,
        products: [...cart.products, ...products],
      });
      return res.status(200).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  deleteProduct: async (req, res) => {
    console.log('delete product by cart id and product id');

    const id_prod = req.params.id_prod;
    const cartId = req.params.id;
    if (!id_prod)
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    if (!cartId)
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    try {
      const cart = await db.getById(cartId);
      const cartUpdated = {
        ...cart,
        products: cart.products.filter((p) => +p.id !== +id_prod),
      };
      await db.update(cartId, { ...cartUpdated });
      return res.status(200).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
};

module.exports = carts;
