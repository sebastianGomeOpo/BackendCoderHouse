class productManager {
    //Definimos el atributo privado `#id` que es un numero que se va a utilizar para generar el id de los products
    #id=0;
    //Definimos el constructor de la clase con el atributo products como un arreglo vacio `[]`, que es donde se van a guardar los productos
    // El constructor es un metodo especial que se ejecuta automaticante cuando se crea una instancia de la clase
    // Es decir que cuando se crea un objeto de la clase productManager, se ejecuta el constructor
    // Por ejemplo: `let productManager = new productManager();` nos devolvera   `productManager {products: Array(0)}`
    constructor(){
        this.products =[];
    }
    // La funcion en un metodo de la clase; que devuelve la lista de products registrados en el objeto `productManager`.Esta funcion se llama `getProducts`
    // La funcion `getProducts` devuelve el atributo `products` de la clase `productManager`
    getProducts(){
        return this.products;
    }
    // Documentacion de la funcion `addProduct`
    /**
	 * Permite agregar un product a la lista de products
	 * @param {string} title title del product
	 * @param {string}   del product
	 * @param {number} price price del product
	 * @param {string} thumbnail product
	 * @param {Date} fecha Fecha del product
	 */

    addProduct(title, description, price, thumbnail, code, stock){
        // Creamos un objeto de tipo product
        const product = {
            // El atributo id se genera automaticamente con el valor del atributo privado `#id` y se incrementa en 1
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            participantes:[], // El atributo participantes es un arreglo vacio por que al crear un product no hay participantes
        };
        // Agregamos el ID al product
        product.id = this.#getID(); // Otra forma de agregar el id al product
        
        // Validamos que el codigo no este repetido
        if (this.isCodeRepeated(code)) {
            throw new Error('El codigo del producto ya existe');
        }
        
        // Agregamos el product al arreglo de products
        this.products.push(product);
    };

    // Metodo privado que incrementa en 1 el valor de ID y lo retorna
	// permite evitar id repetidos
	// Es privado para que nadie pueda utilizarlo y afectar la correlatividad de los id
	#getID() {
		// Incremento en 1 el valor de id
		this.#id++; // Otra forma de incrementar el id
		return this.#id;
	};

    
    //getProductById(id) , que devuelve el product con el id pasado por parámetro. Si no existe, debe devolver un error.
    getProductById(id) {
        // Buscamos el product con el id pasado por parametro
        const product = this.products.find((p) => p.id === id);
        // Si no existe, devolvemos un error
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        // Si existe, devolvemos el product
        return product;
    }
    // isCodeRepeated(code) , que devuelve true si el código pasado por parámetro ya existe en el arreglo de products, false en caso contrario.
    isCodeRepeated(code) {
        // Buscamos si existe un product con el codigo pasado por parametro
        // some devuelve true si al menos un elemento cumple con la condicion
        return this.products.some((p) => p.code === code);
    }

} 

// ************** Pruebas *************
// Crear instancia de ProductManager
const pm = new productManager();

// Obtener productos (debe devolver arreglo vacío)
console.log(pm.getProducts()); // []

// Agregar producto
pm.addProduct('zapatos', 'Calzado de lujo', 200, 'Sin imagen', '123-R', 25);

// Obtener productos (debe aparecer el producto recién agregado)
console.log(pm.getProducts()); 
// Agregar producto con código repetido (debe arrojar un error)

// try {
//   pm.addProduct('zapatilla', 'zapatilla de lujo', 300, 'Sin imagen', '123-R', 15);
// } catch (error) {
//   console.log(error.message); // 
// }

// // Obtener producto por id (debe devolver el producto)
// //console.log(pm.getProductById('random-id')); 
// // Obtener producto por id inexistente (debe arrojar un error)
// try {
//   pm.getProductById('non-existent-id');
// } catch (error) {
//   console.log(error.message); // 
// }
