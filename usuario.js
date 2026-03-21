class Usuario {
    constructor(nombre, email, password, rol) {
        this._nombre = nombre;
        this._email = email;
        this._password = password;
        this._rol = rol;
    }

    // GETTERS
    get nombre() { return this._nombre; }
    get email() { return this._email.toLowerCase(); }

    // SETTER: Validación de seguridad simple
    set password(nuevaPassword) {
        if (nuevaPassword.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }
        this._password = nuevaPassword;
    }

    // Método para preparar los datos para la API
    toJSON() {
        return {
            nombre: this._nombre,
            email: this._email,
            password: this._password,
            rol: this._rol
        };
    }
}