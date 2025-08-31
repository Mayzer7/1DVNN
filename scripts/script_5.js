// $(function() {
	
// 	var mouseDragEnabled = true;
// 	if ($(window).width()<1200) mouseDragEnabled = false;

// 	if ($(window).width()<1200)
// 	{
		
// 		$(".advantage").addClass("owl-carousel");
// 		$(".advantage").addClass("owl-theme");
// 		$(".advantage").addClass("small-controls");
		
// 		$(".advantage").owlCarousel({
// 			pagination: true,
// 			//autoplay: true,
// 			nav: ($(".advantage .item").length > 1) ? true: false,
// 			loop: false,
// 			dots: false,
// 			autoWidth:true,
// 		    mouseDrag: mouseDragEnabled,
// 			navText : ['<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M326.391,209.918L130.01,388.8h429.494c16.132,0,29.823,16.489,29.823,32.622c0,16.133-14.882,37.74-31.015,37.74H129.95L308.712,628.58c11.489,11.428,10.239,37.979-4.286,50.658c-12.263,10.654-30.121,11.428-41.609,0L14.346,447.435c-6.132-6.131-8.751-14.227-8.334-22.264c-0.417-7.977,2.202-18.751,8.334-24.882l266.745-238.588c11.488-11.429,32.323-8.75,44.05,2.441C337.881,176.226,337.881,198.43,326.391,209.918z"/></svg>',
// 			           '<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M270.155,164.142c11.727-11.191,32.562-13.87,44.05-2.441L580.95,400.289c6.132,6.131,8.751,16.906,8.334,24.882c0.417,8.037-2.202,16.133-8.334,22.264L332.48,679.238c-11.488,11.428-29.347,10.654-41.609,0c-14.525-12.68-15.775-39.23-4.286-50.658l178.762-169.418H36.984c-16.133,0-31.015-21.607-31.015-37.74c0-16.132,13.691-32.622,29.823-32.622h429.494L268.905,209.918C257.416,198.43,257.416,176.226,270.155,164.142z"/></svg>'],
// 		});
// 	}
	
// });

$(document).ready(function() {
	$(".cards_inner:first").addClass("cards_inner-active");
  	$("#image-1").addClass("advant_img-active");
	//   $("#image-1").fadeIn(500);
	$(".cards_inner").on("mouseover", function() {

	  let selectedImage = $(this).data("cardnum");
	  $(".cards_inner").removeClass("cards_inner-active");
	  $(this).addClass("cards_inner-active");
	  $(".advant_img").removeClass("advant_img-active");
	//   $(".advant_img").css("display","none")
	  $("#image-" + selectedImage).addClass("advant_img-active");
	  $("#image-" + selectedImage).fadeIn(1000);
	});
  });

