// import fs from 'fs'
// import ProductManager from '../datos/productManager';
// import { Express } from 'express';

// let manager = new ProductManager

export const validarProducto = product => {
    let result = true;
    if(!product.title || !product.descripcion || !product.code || !product.stock || !product.category){
        result = false;
    }
    return result;
}
/*
export const  machCode = async product => { 
    // Verifico si el codigo existe en los productos insertados 
let producto = await this.getproduct()
let indice = producto.findIndex(product => product.code === code)
   return indice 
} */
