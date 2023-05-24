import fs from 'fs';

 class ProductManager {
  
    constructor(){
        this.path = 'product.json';
    }

    async getproduct(){  /*Parseo a mis productos y los traigo */
        //leer archivo
        try {
        let contenido = await fs.promises.readFile(this.path)
        //pareso a objeto
        let producto = JSON.parse(contenido)
                return producto;
        } catch (error) {
            console.log(error)
            throw error;
        }
    } 

    async getProductById(id){ /* busco a mi producto por su ID */
        let productMacht = 'Not found'
       let contenido = await fs.promises.readFile(this.path)
       let producto = JSON.parse(contenido)
       let productoEncontrado = producto.find(product => product.id == id)
       if(productoEncontrado){
        productMacht = productoEncontrado
       }
       return productMacht;
    }

    async updateProduct(pid,fields){ /*Actualizo a mi producto segun su ID */
    let productos   
    try{ 
        let producto = await this.getproduct()
        let indice = producto.findIndex(product => product.id == pid)
        if(indice == -1){
            return producto;
        }
            producto[indice].title = fields.title;
            producto[indice].descripcion = fields.descripcion;
            producto[indice].stock = fields.stock;
            producto[indice].category = fields.category;
            producto[indice].status = fields.status;

            productos = producto[indice]
        await fs.promises.writeFile(this.path, JSON.stringify(producto))
    }catch (error){
        console.log(error)
        throw error;
    }
    return productos
        
    }

    async deleteProduct(pid){ /*Elimino a el producto segun su ID */
    let productDelete;
    try{
    let producto = await this.getproduct()
    let indice = producto.findIndex(product => product.id == pid)
    //let productDelete
    if(indice == -1){
        return producto;
    }
        productDelete = producto.splice(indice, 1)[0];
    
    await fs.promises.writeFile(this.path, JSON.stringify(producto))
    }catch (error){
        console.log(error)
        throw error;
    }
    return productDelete;
}


    async AutoAddId(){ /* Creo un auto incrementable del ID */
        
        let contenido = await fs.promises.readFile(this.path)
        //pareso a objeto
        let producto = JSON.parse(contenido)
        let countID = await producto.length +1

        return  countID 
    }

    async machCode(code){ /*Verifico si el codigo existe en los productos insertados */
        let producto = await this.getproduct()
        let indice = producto.findIndex(product => product.code === code)
        //if(indice !== -1){
           return indice //{msg:  `El codigo ${producto[indice].code} ya existe`}
       // }
    }

    async addProduct(product){ /*Agrego un producto nuevo */
        /*Verifico que el codigo no se repita */
            product.id = await this.AutoAddId();
            product.status = true;
        //try{
            let producto = await this.getproduct()
            producto.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(producto))
          //  } catch(error){
                // console.log(error)
                //  throw error;
       // }
     
}
}

export default ProductManager;
