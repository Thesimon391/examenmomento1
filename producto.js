class Producto {
    constructor(nombre, precioBase, stock, categoria) {
        this._nombre = nombre;
        this._precioBase = precioBase;
        this._stock = stock;
        this._categoria = categoria;
        this._descuento = 0; // Porcentaje de descuento (0-100)
        this._aumento = 0;    // Porcentaje de aumento (ej. IVA)
    }

    // GETTERS
    get precioBase() { return this._precioBase; }
    
    // El Getter "mágico" que calcula el total real
    get precioTotal() {
        const valorAumento = this._precioBase * (this._aumento / 100);
        const valorDescuento = this._precioBase * (this._descuento / 100);
        return this._precioBase + valorAumento - valorDescuento;
    }

    // SETTERS con validación
    set descuento(valor) {
        if (valor < 0 || valor > 100) throw new Error("El descuento debe estar entre 0 y 100");
        this._descuento = valor;
    }

    set aumento(valor) {
        if (valor < 0) throw new Error("El aumento no puede ser negativo");
        this._aumento = valor;
    }

    // Para enviar a tu API (PATCH o POST)
    toJSON() {
        return {
            nombre: this._nombre,
            precioBase: this._precioBase,
            precioTotal: this.precioTotal, // Aquí enviamos el resultado final
            stock: this._stock,
            categoria: this._categoria,
            descuento: this._descuento,
            aumento: this._aumento
        };
    }
}