$(function() {
	$('.about_house_slide-img').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.about_house_slide-text'
	  });
	  $('.about_house_slide-text').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.about_house_slide-img',
		dots: true,
		focusOnSelect: true,
		prevArrow: '<button type="button" class="slick-prev"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M9.5 2.5L4 8L9.5 13.5" stroke="black" stroke-width="1.5" stroke-linecap="square"/></g></svg></button>',
  		nextArrow: '<button type="button" class="slick-next"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M6.5 13.5L12 8L6.5 2.5" stroke="black" stroke-width="1.5" stroke-linecap="square"/></g></svg></button>'
	  });
	
});