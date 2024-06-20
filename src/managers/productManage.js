import fs from "fs";
import { v4 as uuid } from "uuid";

const path = "./src/managers/data/products.json";

// Función para leer los productos desde el archivo JSON
const getProducts = async (limit) => {
  try {
    const fileJson = await fs.promises.readFile(path, "utf-8");
    const parseFile = JSON.parse(fileJson);
    let products = parseFile || [];

    if (limit) {
      limit = parseInt(limit);
      if (!isNaN(limit) && limit > 0) {
        products = products.slice(0, limit);
      }
    }

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Función para obtener un producto por ID
const getProductById = async (id) => {
  try {
    const products = await getProducts();
    return products.find((product) => product.id === id);
  } catch (error) {
    console.log(error);
  }
};

// Función para agregar un producto
const addProduct = async (product) => {
  try {
    const products = await getProducts();
    const newProduct = {
      id: uuid(),
      ...product,
      status: true
    };
    products.push(newProduct);
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

// Función para actualizar un producto
const updateProduct = async (id, productData) => {
  try {
    const products = await getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
      return products[index];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

// Función para eliminar un producto
const deleteProduct = async (id) => {
  try {
    const products = await getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
