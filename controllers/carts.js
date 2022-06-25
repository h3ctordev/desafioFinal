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
    const newCart = {
      products: [...body.products],
    };

    newCart.timestamp = new Date().getTime();
    const cartsId = await db.save({ ...newCart });

    return res.status(200).json({ status: 'OK', data: { id: cartsId } });
  },
  delete: (req, res) => {
    console.log('empty cart');
    const { id } = req.params;
    console.log(id);
    if (isNaN(+id) || !id) {
      return res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    db = db.filter((c) => +c.id !== +id);
    return res.status(200).json({ status: 'OK' });
  },
  getById: (req, res) => {
    console.log('get all products cart by id');
    return res.status(200).json({});
  },
  addProduct: (req, res) => {
    console.log('add products to carts');
    return res.status(200).json({});
  },
  deleteProduct: (req, res) => {
    console.log('delete product by cart id and product id');
    return res.status(200).json({});
  },
};

module.exports = carts;
