$(function() {
	$('.engineer_slide-img').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.engineer_slide-text'
	  });
	  $('.engineer_slide-text').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.engineer_slide-img',
		dots: true,
		focusOnSelect: true,
		prevArrow: '<button type="button" class="slick-prev"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M9.5 2.5L4 8L9.5 13.5" stroke="black" stroke-width="1.5" stroke-linecap="square"/></g></svg></button>',
  		nextArrow: '<button type="button" class="slick-next"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M6.5 13.5L12 8L6.5 2.5" stroke="black" stroke-width="1.5" stroke-linecap="square"/></g></svg></button>'
	  });


	var mouseDragEnabled = true;
	if ($(window).width()<1200) mouseDragEnabled = false;
	
	
	// $(".slider").owlCarousel({
	// 	items: 1,
	// 	pagination: true,
	// 	nav: ($(".slider .item").length > 1) ? true: false,
	// 	dots: ($(".slider .item").length > 1) ? true: false,
	// 	loop: ($(".slider .item").length > 1) ? true: false,
	// 	singleItem:true,
	// 	autoplay:false,
	//     responsive: {
	//         0: {
	//             items: 1,
	//         },
	//         500: {
	//             items: 1,
	//         },
	//         768: {
	//             items: 1,
	//         }
	//     },
	//     navText : ['<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M326.391,209.918L130.01,388.8h429.494c16.132,0,29.823,16.489,29.823,32.622c0,16.133-14.882,37.74-31.015,37.74H129.95L308.712,628.58c11.489,11.428,10.239,37.979-4.286,50.658c-12.263,10.654-30.121,11.428-41.609,0L14.346,447.435c-6.132-6.131-8.751-14.227-8.334-22.264c-0.417-7.977,2.202-18.751,8.334-24.882l266.745-238.588c11.488-11.429,32.323-8.75,44.05,2.441C337.881,176.226,337.881,198.43,326.391,209.918z"/></svg>',
	// 	           '<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M270.155,164.142c11.727-11.191,32.562-13.87,44.05-2.441L580.95,400.289c6.132,6.131,8.751,16.906,8.334,24.882c0.417,8.037-2.202,16.133-8.334,22.264L332.48,679.238c-11.488,11.428-29.347,10.654-41.609,0c-14.525-12.68-15.775-39.23-4.286-50.658l178.762-169.418H36.984c-16.133,0-31.015-21.607-31.015-37.74c0-16.132,13.691-32.622,29.823-32.622h429.494L268.905,209.918C257.416,198.43,257.416,176.226,270.155,164.142z"/></svg>'],
	//     mouseDrag: mouseDragEnabled,
	// 	//navText : ["",""],
	// 	//autoWidth:true,
	// 	//lazyLoad: true //<img class="owl-lazy" data-src="SRC" alt="">
	// 	//margin:20,
	// 	//stagePadding:0
	// 	//dotsEach: 3 
	// });
	
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