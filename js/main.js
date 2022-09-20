/*-----------------------------------------------------*/
  	/* Menu de navegação
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // botão toggle 
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // itens de navegação
  	nav.find('li a').on("click", function() {   

   	// atualiza botã toggle 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout no painel navegação
   	nav.fadeOut();   		
   	     
  	});