/* Autor Carlos Andres Sierra */
$(document).ready(function () {

    /*reabre de barra de menu*/
    function actualizarEstadoSidebar() {
      const sidebarColapsado = $('#sidebar').hasClass('collapsed');

    }

    /*Cierre de barra de menu*/ 
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('collapsed');
      actualizarEstadoSidebar();
      
      // los menus abiertos con menus
      const nuevoValor = $('#sidebar').hasClass('collapsed') ? 'dropdown' : 'collapse';
      $('[data-bs-toggle]').attr('data-bs-toggle', nuevoValor);
    });


    // Controla el hover de los menus y despliegue de los submenus
    $('#sidebar.collapsed .menu-item').hover(
      function () {
        $(this).find('.submenu').fadeIn();
      },
      function () {
        $(this).find('.submenu').fadeOut();
      }
    );


      //(des)oculta el menu izquierda si accede el movil
      function verificarTamañoPantalla() {
        if ($(window).width() < 768) {
          $('#sidebar').hide(); // Oculta el nav en pantallas móviles
        } else {
          $('#sidebar').show(); // Muestra el nav en pantallas más grandes
        }
      }

      // Detecta el cambio de tamaño de pantalla
      $(window).on('resize', verificarTamañoPantalla);
      verificarTamañoPantalla(); // Comprobación inicial


      //Deshabilita los menus de tercer nivel
    $('.submenu-nivel-3').on('show.bs.collapse', function () {
      $('.submenu-nivel-3').not(this).collapse('hide');
    });

    // Lógica para mantener visible el submenú y su submenú de tercer nivel
    $('.menu-item[data-bs-toggle="dropdown"]').on('mouseenter', function () {
      $(this).find('.submenu-v').stop(true, true).fadeIn(200); // Mostrar submenú
    }).on('mouseleave', function (e) {
      const submenu = $(this).find('.submenu-v');
      if (!submenu.is(':hover')) {
        submenu.stop(true, true).fadeOut(200); // Ocultar si el cursor no está en el submenú
      }
    });

    // Control para submenú de tercer nivel
    $('.submenu-v > li').on('mouseenter', function () {
      $(this).find('.submenu-nivel-3-v').stop(true, true).fadeIn(200); // Mostrar submenú de tercer nivel
    }).on('mouseleave', function (e) {
      const submenuNivel3 = $(this).find('.submenu-nivel-3-v');
      if (!submenuNivel3.is(':hover')) {
        submenuNivel3.stop(true, true).fadeOut(200); // Ocultar si el cursor no está en el submenú de tercer nivel
      }
    });

    //DEspues de hacer click en los links superiores se ocultan
    $('#navbarResponsive a').on('click', function () {
      $('#navbarResponsive').collapse('hide');
    });

    //Mantiene los iconos sin importa si ocultan el menu
    $('#navbarResponsive').on('show.bs.collapse', function () {
      $('#menu-icon').removeClass('bi-list').addClass('bi-x');
    }).on('hide.bs.collapse', function () {
      $('#menu-icon').removeClass('bi-x').addClass('bi-list');
    });


      // Cambia la clase activa al hacer clic en una pestaña
      $('.nav-link').on('click', function () {
          $('.nav-link').removeClass('active');
          $(this).addClass('active');
      });

     //Controla  validacion de un formulario derecho
    $('#form-generar').on('submit', function (e) {
              e.preventDefault(); // Evita el envío real del formulario
              const select1 = $('#select1').val();
              const select2 = $('#select2').val();
              const select3 = $('#select3').val();

              if (select1 && select2 && select3) {
                  alert(`Opción seleccionada:\n1: ${select1}, 2: ${select2}, 3: ${select3}`);
              } else {
                  alert('Por favor, complete todas las opciones.');
              }
     });

      // Alterna la visibilidad del texto al hacer clic (por ejemplo, en modo mobile)
      $('.d-inline-block').click(function () {
        $(this).find('.link-text').collapse('hide');
      });       

      actualizarEstadoSidebar(); // Estado inicial del boton de (Des)ocultar menu

        //Controla la visbilidad de los menus
        $('.dropdown-submenu-m > a').on('click', function (e) {
              e.preventDefault(); // Evitar que se recargue la página
              $(this).next('.dropdown-menu-m').toggle(); // Mostrar/ocultar el submenú
              return false;
          });

        /* Controla el desplazamiento vertical del menu que se sea siempre visible */
          const $nav = $('#sidebar'); // Sidebar
          const $footer = $('footer'); // Footer
          const $window = $(window); // Ventana del navegador
          const offsetTop = $nav.offset().top; // Posición inicial del nav
          const navHeight = $nav.outerHeight(true); // Altura del nav
          let hasScrolled = false; // Variable para controlar si se ha hecho scroll
 
          
          // Ajustar la altura del contenido principal para evitar espacios vacíos
          function ajustarAlturaContenido() {
            const footerHeight = $footer.outerHeight(true); // Altura del footer
            const windowHeight = $window.height(); // Altura de la ventana
            const headerHeight = $('header').outerHeight(true); // Altura del header
          
            // Calculamos la altura disponible para el contenido
            const contenidoAltura = windowHeight - headerHeight - footerHeight;
          
            // Aplicamos la altura mínima al contenido principal (#main)
            $('#main').css('min-height', `${contenidoAltura}px`);
          }
          
          // Ejecutamos al cargar y redimensionar la ventana
          ajustarAlturaContenido();
          $window.on('resize', ajustarAlturaContenido);
          
          // Lógica para limitar el scroll más allá del footer
          $window.on('scroll', function () {
            const scrollTop = $window.scrollTop(); // Posición del scroll actual
            const footerTop = $footer.offset().top; // Posición superior del footer
            const documentHeight = $(document).height(); // Altura total del documento
            const windowHeight = $window.height(); // Altura de la ventana
          
            // Calculamos el máximo scroll permitido (justo antes del footer)
            const maxScroll = footerTop + $footer.outerHeight() - windowHeight;
          
            // Si el scroll supera el límite, lo bloqueamos
            if (scrollTop >= maxScroll) {
              $('html, body').scrollTop(maxScroll); // Fijamos el scroll en el límite
            }
          
            // Lógica para mover el <nav> sin que supere el footer
            let newPosition = Math.min(Math.max(offsetTop, scrollTop), footerTop - navHeight);
            $nav.css('transform', `translateY(${newPosition - offsetTop}px)`);
          
            // Cambiar el padding-top del sidebar
            if (scrollTop > 0 && !hasScrolled) {
              $nav.css('padding-top', '50px'); // Cambiar el padding-top al hacer scroll
              hasScrolled = true; // Marcar que se ha hecho scroll
            } else if (scrollTop === 0 && hasScrolled) {
              $nav.css('padding-top', '0px'); // Restaurar el padding-top al volver al top
              hasScrolled = false; // Marcar que se ha vuelto al top
            }
          });





  });
