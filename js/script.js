$(document).ready(function () {
    function actualizarEstadoSidebar() {
      const sidebarColapsado = $('#sidebar').hasClass('collapsed');

    }

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('collapsed');
      actualizarEstadoSidebar();
      
      // Cambiar los valores de data-bs-toggle
      const nuevoValor = $('#sidebar').hasClass('collapsed') ? 'dropdown' : 'collapse';
      $('[data-bs-toggle]').attr('data-bs-toggle', nuevoValor);
    });

    $('#sidebar.collapsed .menu-item').hover(
      function () {
        $(this).find('.submenu').fadeIn();
      },
      function () {
        $(this).find('.submenu').fadeOut();
      }
    );


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

    $('#navbarResponsive a').on('click', function () {
      $('#navbarResponsive').collapse('hide');
    });

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

    actualizarEstadoSidebar(); // Estado inicial


    $('.dropdown-submenu-m > a').on('click', function (e) {
              e.preventDefault(); // Evitar que se recargue la página
              $(this).next('.dropdown-menu-m').toggle(); // Mostrar/ocultar el submenú
              return false;
          });



  });
