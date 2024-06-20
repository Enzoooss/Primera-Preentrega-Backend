import fs from "fs"
import {v4 as uuid} from "uuid"

let carts = [];
const path = "./src/managers/data/carts.json"

const getCars = async () => {
    try {
        const cartsJson = await fs.promises.readFile(path, "utf-8");
    
        if (cartsJson.trim().length === 0) {
          carts = [];
        } else {
          carts = JSON.parse(cartsJson);
        }
    
        return carts;
      } catch (error) {
        console.log(`${error}`);
        return [];
      }
}

const createCart = async () => {
    await getCars();
    const newCart = {
        
        id: uuid(),
        products:[]
    };

    carts.push(newCart);

    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2)); // Archivo JSON mas legible con 2 espacios de identacion

    return newCart;
}


const getCartById = async (cid) => {
    await getCars();
    const cart = carts.find(c => c.id === cid);
    return cart;
    
}

const addProductToCart = async (cid, pid) => {
    await getCars();

    const cart = await getCartById(cid);

    if (!cart) {
        return null; // Si el carrito no existe 
      }

      const productIndex = cart.products.findIndex((p) => p.product === pid);

      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        const product = {
          product: pid,
          quantity: 1,
        };
        cart.products.push(product);
    }
    console.log(carts);
    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2)) // Archivo JSON mas legible con 2 espacios de identacion
    return cart
}

export default {
    createCart,
    getCartById,
    addProductToCart
}