const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./routes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use("/", express.static("public"));
app.use('/productos', routes.products);
app.use('/carrito', routes.carts);

app.listen(PORT, () => {
  console.log(`Listen port http://localhost:${PORT}`);
});
