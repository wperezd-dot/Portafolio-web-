$(document).ready(function() {

    //CARGA DE EXPERIENCIAS (API)
    const apiURL = 'http://localhost:3000/api/experiencias';

    function cargarExperiencias() {
        const timeline = $('.timeline');
        
        // Indicador de carga visual
        timeline.html('<p class="text-center w-100">Cargando experiencia profesional...</p>');

        $.get(apiURL, function(data) {
            timeline.empty(); 

            if (data.length === 0) {
                timeline.html('<p class="text-center w-100">No hay experiencias registradas en la base de datos.</p>');
                return;
            }

            data.forEach(exp => {
                timeline.append(`
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <span class="date">${exp.periodo}</span>
                            <h3>${exp.cargo}</h3>
                            <h4 style="color: var(--primary-color); font-size: 1.1rem; margin-bottom: 0.5rem;">${exp.empresa}</h4>
                            <p>${exp.descripcion}</p>
                        </div>
                    </div>
                `);
            });
        })
        .fail(function() {
            timeline.html('<p class="text-center text-danger w-100">Error: No se pudo conectar con el servidor backend.</p>');
        });
    }

    cargarExperiencias();


    //GESTIÓN DE LOS SONIDOS
    const sonidoClick = new Audio('media/sonidos/Click.mp3');
    const elementosInteractivos = $('.btn, a, .social-links a, .project-links a');

    elementosInteractivos.on('click', function() {
        sonidoClick.currentTime = 0;
        sonidoClick.play().catch(error => console.log("Interacción requerida para audio."));
    });


    //VALIDACIÓN Y ENVÍO DE FORMULARIO
    const form = $('#formContacto');
    const btnEnviar = $('#btnEnviar');
    const mensajeExito = $('#mensajeExito');

    form.on('submit', function(event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            event.stopPropagation();
            // Efecto de sacudida
            form.animate({ marginLeft: "-10px" }, 50)
                .animate({ marginLeft: "10px" }, 50)
                .animate({ marginLeft: "0px" }, 50);
        } else {
            btnEnviar.prop('disabled', true)
                     .html('<span class="spinner-border spinner-border-sm"></span> Enviando...');

            // Simulación de envío
            setTimeout(function() {
                form.fadeOut(500, function() {
                    mensajeExito.removeClass('d-none').hide().fadeIn(1000);
                });
            }, 1500);
        }
        form.addClass('was-validated');
    });


    //ANIMACIONES Y EFECTOS VISUALES
    
    // Resaltado de inputs
    $('.form-control').on('focus', function() {
        $(this).animate({ borderLeftWidth: "10px" }, 200);
    }).on('blur', function() {
        $(this).animate({ borderLeftWidth: "1px" }, 200);
    });

    // Revelar tarjetas con el Scroll
    $(window).on('scroll', function() {
        $('.project-card, .timeline-item').each(function() {
            const bottomOfObject = $(this).offset().top + $(this).outerHeight() / 4;
            const bottomOfWindow = $(window).scrollTop() + $(window).height();

            if (bottomOfWindow > bottomOfObject) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)',
                    'transition': 'all 0.6s ease-out'
                });
            }
        });
    });
});