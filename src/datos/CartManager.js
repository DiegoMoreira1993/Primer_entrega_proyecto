import fs from 'fs';

class cartManager {
    constructor (){
        this.path = 'carritos.json';
    }

async getCarts(){
    //let carritos;
    try {
    let contenido = await fs.promises.readFile(this.path)
    let producto = JSON.parse(contenido)
        return producto;
    } catch (error) {
        console.log(error);
        throw error;
    }
    //return carritos = producto;
}

async getCartsById(cid){ /* busco a mi producto por su ID */
        let cartMacht = 'Not found'
       
       let carrito = await this.getCarts()
       let productoEncontrado = carrito.find(cart => cart.id == cid)
       if(productoEncontrado){
        cartMacht = productoEncontrado
       }
       return cartMacht;
    }

async getProductByPid(pid, cid){
    let encuentroProd = false;
    let carrito  = await this.getCartsById(cid);
    let productoEnc = carrito.products.findIndex( product => product.id == pid)
    if(productoEnc !== -1){
        encuentroProd = true;
    }
    return encuentroProd
}

async addProductToCart(cid,pid){
    let carrito;
    let carritos = await this.getCarts();
    let indice = carritos.findIndex(cart => cart.id == cid);
    let indiceProduct = carritos[indice].products.findIndex( cart => cart.id == pid)
    console.log(indiceProduct)
    let buscProd = await this.getProductByPid(pid, cid);
    let quantity = 1;
    
    if (indice == -1){
        return carrito;
    } 
    if(buscProd == true){
        quantity = carritos[indice].products[indiceProduct].quantity ++;
        await fs.promises.writeFile(this.path, JSON.stringify(carritos[indice].products[indiceProduct].quantity)) 
    }else     
    carritos[indice].products.push({id:pid, quantity:quantity})
    try {
        await fs.promises.writeFile(this.path, JSON.stringify(carritos))
    } catch (error) {
        console.log(error);
        throw error;
        
    }
    return carritos[indice]

}

getNextId(){
    return Date.now();
}

async createCar(){
    let newCart = {
        id: this.getNextId(),
        products: []
       
    }
    let carritos = await this.getCarts();
    carritos.push(newCart)
    try {
        await fs.promises.writeFile(this.path, JSON.stringify(carritos))
    } catch (error) {
        console.log(error);
        throw error;
    }
    
    return newCart
    }

}

export default cartManager;