const mongoose = require('mongoose');

const uri =
  process.env.MOONGODB_URI ||
  'mongodb+srv://h3ctordev:hector-coderhouse@coderhouse-backend.qaxbl33.mongodb.net/ecommerce?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.info('db connected OK!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  connect,
};
