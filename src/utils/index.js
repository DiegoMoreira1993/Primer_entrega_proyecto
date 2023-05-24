
export const validarProducto = product => {
    let result = true;
    if(!product.title || !product.descripcion || !product.code || !product.stock || !product.category){
        result = false;
    }
    return result;
}

