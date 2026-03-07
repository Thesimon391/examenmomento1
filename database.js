// ==========================================
// BASE DE DATOS LOCAL - SITIO WEB RESTAURANTE
// ==========================================

// ==========================================
// 1. METADATOS DE PÁGINAS
// ==========================================
const paginasMetadata = {
    index: {
        id: 1,
        nombre: "Home",
        ruta: "index.html",
        titulo: "Burger - Inicio",
        descripcion: "Página principal del restaurante con menú destacado",
        modulo: "home",
        requiereAutenticacion: false
    },
    carrito: {
        id: 2,
        nombre: "Carrito",
        ruta: "cart.html",
        titulo: "Burger - Carrito de Compras",
        descripcion: "Vista del carrito de compras con productos seleccionados",
        modulo: "compras",
        requiereAutenticacion: false
    },
    checkout: {
        id: 3,
        nombre: "Checkout",
        ruta: "checkout.html",
        titulo: "Burger - Finalizar Compra",
        descripcion: "Formulario de datos de entrega y pago",
        modulo: "compras",
        requiereAutenticacion: false
    },
    thankyou: {
        id: 4,
        nombre: "Gracias",
        ruta: "thankyou.html",
        titulo: "Burger - Pedido Confirmado",
        descripcion: "Página de confirmación después del pedido",
        modulo: "compras",
        requiereAutenticacion: false
    }
};

// ==========================================
// 2. CATÁLOGO DE PRODUCTOS
// ==========================================
const catalogo = {
    burgers: [
        {
            id: 1,
            nombre: "Crunch Grillhouse Burger",
            categoria: "burger",
            precio: 240.00,
            descripcion: "Hamburguesa con pan crujiente y parrilla",
            imagen: "images/b1.png",
            disponible: true,
            ingredientes: ["pan", "carne", "lechuga", "tomate"],
            calorías: 450
        },
        {
            id: 2,
            nombre: "Classic Cheeseburger",
            categoria: "burger",
            precio: 200.00,
            descripcion: "Clásica hamburguesa con queso derretido",
            imagen: "images/b2.png",
            disponible: true,
            ingredientes: ["pan", "carne", "queso", "cebolla"],
            calorías: 500
        },
        {
            id: 3,
            nombre: "Mega Burger",
            categoria: "burger",
            precio: 320.00,
            descripcion: "Hamburguesa extra grande con doble carne",
            imagen: "images/b3.png",
            disponible: true,
            ingredientes: ["pan", "carne x2", "queso", "tocino", "salsa"],
            calorías: 750
        }
    ],
    pizza: [
        {
            id: 4,
            nombre: "Pizza Margarita",
            categoria: "pizza",
            precio: 280.00,
            descripcion: "Pizza con tomate, mozzarella y albahaca",
            imagen: "images/p1.png",
            disponible: true,
            ingredientes: ["masa", "tomate", "queso", "albahaca"],
            calorías: 600
        },
        {
            id: 5,
            nombre: "Pizza Pepperoni",
            categoria: "pizza",
            precio: 300.00,
            descripcion: "Pizza con pepperoni y queso",
            imagen: "images/p2.png",
            disponible: true,
            ingredientes: ["masa", "pepperoni", "queso"],
            calorías: 650
        }
    ],
    papas: [
        {
            id: 6,
            nombre: "Papas Fritas Clásicas",
            categoria: "papas",
            precio: 80.00,
            descripcion: "Papas fritas crujientes con sal",
            imagen: "images/topcard1.png",
            disponible: true,
            ingredientes: ["papas", "aceite", "sal"],
            calorías: 300
        },
        {
            id: 7,
            nombre: "Papas Picantes",
            categoria: "papas",
            precio: 100.00,
            descripcion: "Papas fritas con especias picantes",
            imagen: "images/topcard2.png",
            disponible: true,
            ingredientes: ["papas", "aceite", "picante"],
            calorías: 320
        }
    ],
    pollo: [
        {
            id: 8,
            nombre: "Pollo Frito Crispy",
            categoria: "pollo",
            precio: 250.00,
            descripcion: "Pollo frito crujiente con salsa especial",
            imagen: "images/topcard3.png",
            disponible: true,
            ingredientes: ["pollo", "rebozado", "especias"],
            calorías: 550
        },
        {
            id: 9,
            nombre: "Tiras de Pollo",
            categoria: "pollo",
            precio: 180.00,
            descripcion: "Tiras de pollo frito acompañadas con salsa",
            imagen: "images/b4.png",
            disponible: true,
            ingredientes: ["pollo", "rebozado"],
            calorías: 400
        }
    ]
};

// ==========================================
// 3. ESTRUCTURA DE FORMULARIOS
// ==========================================
const formularios = {
    checkout: {
        id: "form-checkout",
        nombre: "Formulario de Checkout",
        campos: [
            {
                nombre: "nombres",
                id: "nombres-checkout",
                tipo: "text",
                placeholder: "Mr. John",
                requerido: true,
                validacion: "text",
                label: "Nombres"
            },
            {
                nombre: "apellidos",
                id: "apellidos-checkout",
                tipo: "text",
                placeholder: "Deo",
                requerido: true,
                validacion: "text",
                label: "Apellidos"
            },
            {
                nombre: "email",
                id: "email-checkout",
                tipo: "email",
                placeholder: "email@example.com",
                requerido: true,
                validacion: "email",
                label: "Email"
            },
            {
                nombre: "celular",
                id: "celular-checkout",
                tipo: "tel",
                placeholder: "12345679",
                requerido: true,
                validacion: "tel",
                label: "Celular"
            },
            {
                nombre: "direccion",
                id: "direccion-checkout",
                tipo: "text",
                placeholder: "Calle 123, Apt 456",
                requerido: true,
                validacion: "text",
                label: "Dirección"
            }
        ]
    }
};

// ==========================================
// 4. FUNCIONES DEL CARRITO
// ==========================================

// Obtener carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarProducto(producto) {
    let carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
}

// Vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
}

// ==========================================
// 5. FUNCIONES DEL CATÁLOGO
// ==========================================

// Obtener todos los productos
function obtenerTodosProductos() {
    const todos = [];
    Object.values(catalogo).forEach(categoria => {
        todos.push(...categoria);
    });
    return todos;
}

// Obtener productos por categoría
function obtenerProductosPorCategoria(categoria) {
    return catalogo[categoria] || [];
}

// Obtener producto por ID
function obtenerProductoPorId(id) {
    const todos = obtenerTodosProductos();
    return todos.find(p => p.id === id);
}

// Buscar productos por nombre
function buscarProductos(termino) {
    const todos = obtenerTodosProductos();
    return todos.filter(p => 
        p.nombre.toLowerCase().includes(termino.toLowerCase())
    );
}

// ==========================================
// 6. FUNCIONES DE METADATOS
// ==========================================

// Obtener información de página
function obtenerPaginaMetadata(clave) {
    return paginasMetadata[clave];
}

// Obtener todas las páginas
function obtenerTodasPaginas() {
    return Object.values(paginasMetadata);
}

// ==========================================
// 7. FUNCIONES DE FORMULARIOS
// ==========================================

// Obtener estructura de formulario
function obtenerFormulario(nombreFormulario) {
    return formularios[nombreFormulario];
}

// Guardar datos del formulario
function guardarDatosFormulario(nombreFormulario, datos) {
    const clave = `formulario_${nombreFormulario}`;
    localStorage.setItem(clave, JSON.stringify(datos));
}

// Obtener datos guardados del formulario
function obtenerDatosFormulario(nombreFormulario) {
    const clave = `formulario_${nombreFormulario}`;
    return JSON.parse(localStorage.getItem(clave)) || {};
}

// ==========================================
// 8. UTILIDADES GENERALES
// ==========================================

// Calcular total del carrito
function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => {
        const producto = obtenerProductoPorId(item.id);
        return total + (producto ? producto.precio * (item.cantidad || 1) : 0);
    }, 0);
}

// Obtener cantidad de items en carrito
function obtenerCantidadCarrito() {
    return obtenerCarrito().length;
}

// Limpiar toda la base de datos local
function limpiarBaseDatos() {
    localStorage.clear();
}

// Obtener resumen de la base de datos
function obtenerResumenBD() {
    return {
        paginas: obtenerTodasPaginas().length,
        productosTotal: obtenerTodosProductos().length,
        categorias: Object.keys(catalogo),
        formularios: Object.keys(formularios),
        itemsCarrito: obtenerCantidadCarrito(),
        totalCarrito: calcularTotalCarrito()
    };
}