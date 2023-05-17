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

async addProductToCart(cid,pid){
    let carrito;
    let carritos = await this.getCarts();
    let indice = carritos.findIndex(cart => cart.id == cid);

    if (indice == -1){
        return carrito;
    }

    carritos[indice].products.push(pid)
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