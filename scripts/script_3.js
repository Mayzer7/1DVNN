$(function() {
	
	var mouseDragEnabled = true;
	if ($(window).width()<1200) mouseDragEnabled = false;
	
	
	$(".slider").owlCarousel({
		items: 1,
		pagination: true,
		nav: ($(".slider .item").length > 1) ? true: false,
		dots: ($(".slider .item").length > 1) ? true: false,
		loop: ($(".slider .item").length > 1) ? true: false,
		singleItem:true,
		autoplay:false,
	    responsive: {
	        0: {
	            items: 1,
	        },
	        500: {
	            items: 1,
	        },
	        768: {
	            items: 1,
	        }
	    },
	    navText : ['<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="icons"><path id="Vector 252" d="M9.5 13.5L4 8L9.5 2.5" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></svg>',
		           '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M6.5 13.5L12 8L6.5 2.5" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></svg>'],
	    mouseDrag: mouseDragEnabled,
		//navText : ["",""],
		//autoWidth:true,
		//lazyLoad: true //<img class="owl-lazy" data-src="SRC" alt="">
		//margin:20,
		//stagePadding:0
		//dotsEach: 3 
	});
	
	$('.slider .slider_form').each(function() {
		$(this).html($('#slider_form').html());
		
		$('.slider_form [data-code="PHONE"]').each(function() {
			$(this).mask("+7 (999) 999-9999");
		});

	});
	
	/*Фон картинки*/
	$(window).on("load resize", function () {
	    
		/*if ($(window).width()<575)
		{
			
			$('.slider .item').each(function() {
				if ($(this).data('image')!='')
				{
					$(this).css('background-image', 'url(' + $(this).data('image') + ')');
					
				}

			});
		}*/
	});
	
	

	
	
});