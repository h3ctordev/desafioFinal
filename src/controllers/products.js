const path = './db/products.json';
const File = require('../utils/File');

const db = new File(path);

const products = {
  get: async (req, res) => {
    console.log('get products');
    try {
      if (req.params.id) {
        const data = await db.getById(+req.params.id);
        return res.status(200).json({
          status: 'OK',
          data,
        });
      }
      const data = await db.getAll();
      return res.status(200).json({ status: 'OK', data });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  create: async (req, res) => {
    console.log('create products');
    const body = req.body;
    const { name, description, code, photoUrl, price, stock } = body;
    if (!name || !description || !code || !photoUrl || !price || !stock) {
      return res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    const newProduct = {
      name,
      description,
      code,
      photoUrl,
      price,
      stock,
      timestamp: new Date().getTime(),
    };
    try {
      const productId = await db.save({ ...newProduct });
      return res
        .status(200)
        .json({ status: 'OK', data: { id_prod: productId } });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  update: async (req, res) => {
    console.log('update products');
    try {
      const { id } = req.params;
      const updateProduct = await db.getById(id);
      console.log(updateProduct);
      if (!updateProduct) {
        return res.status(401).json({
          error: -1,
          descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
        });
      }
      await db.update(id, { ...updateProduct, ...req.body });
      return res.status(200).json({ status: 'OK' });
    } catch (error) {
      console.error(error);
      throw res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
  },
  delete: async (req, res) => {
    console.log('delete products');
    try {
      const { id } = req.params;
      console.log(id);
      if (isNaN(+id) || !id) {
        return res.status(401).json({
          error: -1,
          descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
        });
      }
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
};

module.exports = products;
