class Cliente {
    constructor(nombre, email, telefono, direccion) {
        this._nombre = nombre;
        this._email = email;
        this._telefono = telefono;
        this._direccion = direccion;
    }

    // GETTERS
    get nombre() { return this._nombre; }
    get email() { return this._email.toLowerCase(); } // Siempre devuelve en minúsculas

    // SETTERS con validación
    set email(nuevoEmail) {
        if (!nuevoEmail.includes('@')) {
            throw new Error("Email no válido");
        }
        this._email = nuevoEmail;
    }

    // Método para convertir a JSON para la API
    toJSON() {
        return {
            nombre: this._nombre,
            email: this._email,
            telefono: this._telefono,
            direccion: this._direccion
        };
    }
}