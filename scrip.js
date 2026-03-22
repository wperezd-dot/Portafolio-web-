$(document).ready(function() {

    //GESTIÓN DE SONIDOS

    const sonidoClick = new Audio('media/sonidos/Click.mp3');
    
    // Seleccion de botones, enlaces y iconos sociales
    const elementosInteractivos = $('.btn, a, .social-links a, .project-links a');

    elementosInteractivos.on('click', function() {
        // Se reinicia el audio por si se hace clic rápido varias veces
        sonidoClick.currentTime = 0;
        sonidoClick.play().catch(error => {
            console.log("El navegador bloqueó el audio momentáneamente hasta que haya interacción.");
        });
    });

    //VALIDACIÓN Y DINAMISMO DEL FORMULARIO

    const form = $('#formContacto');
    const btnEnviar = $('#btnEnviar');
    const mensajeExito = $('#mensajeExito');

    form.on('submit', function(event) {
        //Detener el envío por defecto para validar
        event.preventDefault();

        //Validación nativa de JavaScript asistida por Bootstrap
        if (!this.checkValidity()) {
            event.stopPropagation();
            
            //EFECTO JQUERY: Sacudida lateral para indicar error
            form.animate({ marginLeft: "-15px" }, 50)
                .animate({ marginLeft: "15px" }, 50)
                .animate({ marginLeft: "-15px" }, 50)
                .animate({ marginLeft: "0px" }, 50);
            
        } else {
            //SI EL FORMULARIO ES VÁLIDO:
            
            // Cambiar estado del botón con jQuery
            btnEnviar.prop('disabled', true)
                     .html('<span class="spinner-border spinner-border-sm"></span> Enviando...');

            // Simulación de envío (delay de 1.5 segundos)
            setTimeout(function() {
                // EFECTO JQUERY: Desvanecer formulario y mostrar éxito
                form.fadeOut(500, function() {
                    mensajeExito.removeClass('d-none').hide().fadeIn(1000);
                });
            }, 1500);
        }

        // Añade la clase de Bootstrap para mostrar los mensajes de error visuales
        form.addClass('was-validated');
    });

 
    //INTERACTIVIDAD EXTRA (Hover y Focus)
    
    //Resaltar suavemente los inputs al entrar con jQuery
    $('.form-control').on('focus', function() {
        $(this).animate({ borderLeftWidth: "10px" }, 200);
    }).on('blur', function() {
        $(this).animate({ borderLeftWidth: "1px" }, 200);
    });

    //Animación suave para la aparición de las tarjetas de proyectos al hacer scroll
    $(window).on('scroll', function() {
        $('.project-card').each(function() {
            const bottomOfObject = $(this).offset().top + $(this).outerHeight() / 3;
            const bottomOfWindow = $(window).scrollTop() + $(window).height();

            if (bottomOfWindow > bottomOfObject) {
                $(this).animate({ 'opacity': '1', 'margin-top': '0px' }, 600);
            }
        });
    });
});
