class TicketManager {
    //Definimos atributos privados
    // Los atributos privados se definen con el símbolo # y sirven para que no se puedan acceder desde fuera de la clase
    #precioBase = 0.15;
    #id=0;

    //Definimos el constructor de la clase con el atributo eventos como un arreglo vacio `[]`, que es donde se van a guardar los eventos
    // El constructor es un metodo especial que se ejecuta automaticante cuando se crea una instancia de la clase
    // Es decir que cuando se crea un objeto de la clase TicketManager, se ejecuta el constructor
    // Por ejemplo: `let ticketManager = new TicketManager();` nos devolvera   `TicketManager {eventos: Array(0)}`
    constructor(){
        this.eventos =[];
    }
    // La funcion en un metodo de la clase; que devuelve la lista de eventos registrados en el objeto `ticketManager`.Esta funcion se llama `getEventos`
    // La funcion `getEventos` devuelve el atributo `eventos` de la clase `TicketManager`
    getEventos(){
        return this.eventos;
    }
    // Documentacion de la funcion `getEventos`
    /**
	 * Permite agregar un evento a la lista de eventos
	 * @param {string} nombre Nombre del Evento
	 * @param {string} lugar Lugar del Evento
	 * @param {number} precio Precio del evento
	 * @param {number} capacidad Capacidad del evento
	 * @param {Date} fecha Fecha del evento
	 */

    agregarEvento(nombre, lugar, precio, capacidad=50, fecha=NewDate()){
        // Creamos un objeto de tipo evento
        const evento = {
            // El atributo id se genera automaticamente con el valor del atributo privado `#id` y se incrementa en 1
            nombre,
            lugar,
            precio:precio + precio*this.#precioBase,
            capacidad,
            fecha,
            participantes:[], // El atributo participantes es un arreglo vacio por que al crear un evento no hay participantes
        };
        // Agregamos el ID al evento
        evento.id = this.#getID(); // Otra forma de agregar el id al evento
        // Agregamos el evento al arreglo de eventos
        this.eventos.push(evento);
    };

    // Metodo privado que incrementa en 1 el valor de ID y lo retorna
	// permite evitar id repetidos
	// Es privado para que nadie pueda utilizarlo y afectar la correlatividad de los id
	#getID() {
		// Incremento en 1 el valor de id
		this.#id++; // Otra forma de incrementar el id
		return this.#id;
	};

    // Documentacion de la funcion `agregarUsuario`
    /**
	 * Permite agregar un participante a un evento
	 * @param {number} idEvento ID del evento
	 * @param {number} idUsuario ID del Usuario
	 * @returns void
	 */
    
    agregarUsuario(idEvento, idUsuario){
        // Buscamos el indice del evento que coincida con el idEvento
        const eventoIndex = this.eventos.findIndex(evento => evento.id === idEvento);

        // Si el indice es -1 significa que no se encontro el evento
        if(eventoIndex===1){
            console.log('No se encontro el evento');
            return;//Este return impide que se siga ejecutando el codigo
        }
        // Obtengo el evento mediante su indice
        const evento = this.eventos[eventoIndex];

        //Si el participante ya esta registrado en el evento, no se agrega
        // Includes es un metodo default para arreglos en JS y sirve para verificar un elemento en un arreglo
        if(evento.participantes.includes(idUsuario)){
            console.log('El usuario ya esta registrado en el evento');
            return;
        };

        // Agrego el aprticipante
		evento.participantes.push(idUsuario);
    };
        //Documentacion de la funcion `ponerEventoGira`
        /**
         * Permite repetir un evento en otro lugar u otra fecha
         * @param {number} idEvento ID del evento que se repite
         * @param {string} nuevaLocalidad Lugar de la nueva repeticion
         * @param {Date} nuevaFecha Decha de la nueva Repeticion
         * @returns
         */

    ponerEventoGira(idEvento, nuevaLocalidad, nuevaFecha){
        // Buscamos el indice del evento que coincida con el idEvento
        const eventoIndex = this.eventos.findIndex(evento => evento.id === idEvento);

        // Si el indice es -1 significa que no se encontro el evento
        if(eventoIndex===-1){
            console.log('No se encontro el evento');
            return;//Este return impide que se siga ejecutando el codigo
        }
        // Obtengo el evento mediante su indice
        const evento = this.eventos[eventoIndex];

        // Creamos un nuevo evento con los mismos datos del evento original
        const nuevoEvento = {
            // agregamos las propiedades del evento original y le agregamos lugar y fecha 
            ...evento,
            // Que pasaria si ya tiene definido lugar y fecha?
            // usamos el ?? para que si ya tiene lugar y fecha, no se sobreescriban
            lugar: nuevaLocalidad?? evento.lugar,
            fecha: nuevaFecha??evento.fecha,
            id:this.#getID(),// Creamos un nuevo id para el evento
            participantes: [], // El arreglo de participantes es vacio porque al crear un evento no hay participantes
        };
        // Agregamos el nuevo evento al arreglo de eventos
        this.eventos.push(nuevoEvento);
    }

}

// Pruebas
const ticketManager = new TicketManager();
ticketManager.agregarEvento('Concierto de Rock', 'Bogota', 100000, 100, new Date());
ticketManager.ponerEventoGira(1, 'Mexico', new Date());
ticketManager.agregarUsuario(1, 927);
ticketManager.agregarUsuario(1, 10);
ticketManager.agregarUsuario(1, 859);

console.log(ticketManager.getEventos());