class Pedido {
    constructor(clienteId, items = []) {
        this._clienteId = clienteId;
        this._items = items; // Array de objetos {productoId, cantidad, precio}
        this._fecha = new Date();
        this._estado = 'Pendiente';
    }

    // GETTER: Calcula el total sumando (precio * cantidad) de cada item
    get total() {
        return this._items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    }

    // MÉTODO: Para agregar un producto a la lista del pedido
    agregarProducto(productoId, nombre, cantidad, precio) {
        const nuevoItem = { productoId, nombre, cantidad, precio };
        this._items.push(nuevoItem);
    }

    // MÉTODO: Limpia el formato para enviarlo a tu API de MongoDB/Node
    toJSON() {
        return {
            cliente: this._clienteId,
            productos: this._items,
            total: this.total,
            fecha: this._fecha,
            estado: this._estado
        };
    }
}