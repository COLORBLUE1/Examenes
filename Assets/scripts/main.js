document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la sección inicial al cargar la página
    showSection('home-section'); 

    // Añadir eventos de clic a los elementos de la lista
    document.querySelectorAll('ul li').forEach(li => {
        li.addEventListener('click', () => {
            const id = li.id; // Obtener el ID del elemento clicado
            showSection(id);
        });
    });
});

function showSection(id) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección correspondiente
    const sectionToShow = document.getElementById(id + '-section');
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }

    // Desmarcar todos los elementos de la lista
    document.querySelectorAll('ul li').forEach(li => {
        li.classList.remove('active');
    });

    // Marcar el elemento de la lista como activo
    const itemToActivate = document.getElementById(id);
    if (itemToActivate) {
        itemToActivate.classList.add('active');
    }
}
