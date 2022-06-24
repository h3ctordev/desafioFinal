const productList = require('../db/products.json');
const db = [...productList];

// { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

const products = {
  get: (req, res) => {
    console.log('get products');
    console.log(req.params);
    if (req.params.id) {
      return res.status(200).json({
        status: 'OK',
        data: { ...db.find((p) => +p.id === +req.params.id) },
      });
    }
    return res.status(200).json({ status: 'OK', data: [...db] });
  },
  create: (req, res) => {
    console.log('create products');
    const body = req.body;
    if (
      !body?.name ||
      !body?.description ||
      !body?.code ||
      !body?.photoUrl ||
      !body?.price ||
      !body?.stock
    ) {
      return res.status(401).json({
        error: -1,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    const newProduct = {
      name: body?.name,
      description: body?.description,
      code: body?.code,
      photoUrl: body?.photoUrl,
      price: body?.price,
      stock: body?.stock,
    };

    const lastId = db.sort((a, b) => b.id - a.id)[0]?.id || 0;
    newProduct.id = lastId + 1;
    newProduct.timestamp = new Date().getTime();
    db.push({ ...newProduct });
    console.log(JSON.stringify(db, null, 2));

    return res
      .status(200)
      .json({ status: 'OK', data: { id_prod: newProduct.id } });
  },
  update: (req, res) => {
    console.log('update products');
    const { id } = req.params;
    const updateProduct = db.find((p) => +id === +p.id);
    if (!updateProduct) {
      res.status(401).json({
        error: -1,
        descricion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
      });
    }
    console.log(req.body);
    db.forEach((p) => {
      if (+p.id === +updateProduct.id) {
        p = {
          ...p,
          ...req.body,
        };
      }
    });
    return res.status(200);
  },
  delete: (req, res) => {
    console.log('delete products');
    return res.status(200).json({});
  },
};

module.exports = products;
