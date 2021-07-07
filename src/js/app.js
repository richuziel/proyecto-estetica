let pagina = 1;


document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    // Resalta el div segun el tab presionado
    mostrarSeccion();
    // Oculta o muestra una seccion dependiendo del tab presionado
    cambiarSeccion();
    // paginacion siguiente y anterior
    paginaSiguiente();

    paginaAnterior();

    //Comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginacion();
};

function mostrarSeccion() {

      // Eliminar mostrar-seccion de la seccion anterior
     const seccionAnterior = document.querySelector('.mostrar-seccion')
    if(seccionAnterior ) {
        seccionAnterior.classList.remove('mostrar-seccion')
    }
      const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    const tabAnterior = document.querySelector('.tabs .actual')
        // eliminar la clase actual en el tab anterior
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }


    

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`)
    tab.classList.add('actual')
};

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button')

    enlaces.forEach( enlace => {
        enlace.addEventListener('click' , e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

          
    // llamar la funcion de mostrar seccion
    mostrarSeccion();

    botonesPaginacion();
        });
    });
};

async function mostrarServicios(){
    
    try {
     const resultado = await fetch('./servicios.json');
    const DB = await resultado.json();

    const { servicios } = DB;
        // generar el html
        servicios.forEach(servicio => {
            
            const { id, nombre, precio } = servicio;

            //DOM scripting listado servicios
            const nombreServicio = document.createElement('P'); 
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');


            //Generar precio del servicio

            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio')
            
            // Generar div contenedor de servicio
            const servicioDiv = document.createElement('DIV')
            servicioDiv.classList.add('servicio')
            servicioDiv.dataset.idServicio = id;

             // selecciona un servicio para la cita
             servicioDiv.onclick = seleccionarServicio;

            // inyectar precio y nombre al div de servicio
            servicioDiv.appendChild(nombreServicio)
            servicioDiv.appendChild(precioServicio)


            // Inyectarlo en el html
            document.querySelector('#Servicios').appendChild(servicioDiv);
        });
    } catch (error) {
        console.log('error')
    }
}

 function seleccionarServicio(e) {
     
    let elemento;

    // Forzar que el elemento a clickear sea el div
    if (e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        elemento = e.target;
    }
    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado')
    } else {
        elemento.classList.add('seleccionado')
    }

    
};

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
        pagina++;
        console.log(pagina)
        botonesPaginacion();
    });
};

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
        pagina--;
        console.log(pagina)
        botonesPaginacion();
    });
}

function botonesPaginacion() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if (pagina === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar')
    } else if (pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    } else  {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
};