$(function () 
{
	var mouseDragEnabled = true;
	if ($(window).width()<1200) mouseDragEnabled = false;
	
	
	$(document).on('click','.choice .menu a', function() {
		$('.choice .menu a').removeClass("active");
		var action_item=$(this);
		var view_mode=$(this).data('type');
		
		$.ajax({
	        type: "POST",
	        url: BX.message('SITE_DIR')+'include/mainpage/ajax_flat_choice.php',
	        data: {'ajax_get_page': 'y', 'ajax_mode': 'y', 'view_mode': $(this).data('type')},
	        dataType: "html",
	        success: function (data) 
	        {
	        	$(action_item).addClass("active");
	        	var flat_data = $(data).find('.flat_component_data').html();
	        	$('.flat_choice_wrapper').html('<div class="flat_ajax_wrapper"><div class="flat_component_data">'+flat_data+'</div></div>');
	        
	    		if (view_mode=='view_chess')
	    		{
	    			if($('.flat_content_chess .tooltip.tooltipstered').lenght>0)
	    			$('.flat_content_chess .tooltip').tooltipster('destroy');
	    			
	    			$('.flat_content_chess .tooltip').tooltipster({
	    				  theme: 'tooltipster-chess',
	    				  side: 'bottom',
	    				  contentAsHTML: true,
	    				  //trigger: 'click'
	    			});

	    		}
	    		
	    		if (view_mode=='view_inter') inter_init();
	        
	        }
	    });
		


	});
	
	
	$('.flat_content_chess .tooltip').tooltipster({
		  theme: 'tooltipster-chess',
		  side: 'bottom',
		  contentAsHTML: true,
		  //trigger: 'click'
	});
	
	
	$(document).on('click','.flat_search_menu .apply_filter', function() {
		$(this).parents('.flat_search_menu').find('.fancybox-close-small').trigger('click');
	});
	
	$(".form_search").on( "swipeleft", function(event){$(this).find('.fancybox-close-small').trigger('click');});
	
	/*Квартира popup*/
	function flat_popup(id)	
	{
		
		$("#flat_popup .form_result").html('');
		$("#flat_popup .header3").removeClass('hidden');
		$("#flat_popup .popup_form").removeClass('hidden');
		
		
		$.ajax({
	        type: "POST",
	        url: BX.message('SITE_DIR')+'include/mainpage/ajax_flat_detail.php',
	        data: {'ajax_get_page': 'y', 'ajax_mode': 'y', 'id': id, 'house_id': $('.choice_container').data('house-id')},
	        dataType: "html",
	        success: function (data) 
	        {
	        	$('#flat_popup .flat_detail_data').html(data);
	        	$.fancybox.open({src: '#flat_popup', type: 'inline', 'touch' : false});
	        	
	        	$('#flat_popup input[data-code="PHONE"]').mask("+7 (999) 999-9999");
	    	    $('#flat_popup input[data-code="PHONE"][required]').attr("placeholder", "+7 (999) 999-9999 *");
	    	    $('#flat_popup input[data-code="PHONE"]').not('[required]').attr("placeholder", "+7 (999) 999-9999");
	        	
	        	$('#flat_popup input[data-code="SOURCE_NAME"]').val($('#flat_popup .flat_comment').html());
	        	$('#flat_popup input[data-code="PRICE"]').val($('#flat_popup .flat_price').html());
	        	
	        	
	        	if ($('.elemet_detail_slider.owl-carousel').length)
	        	{
		        	var owl=$(".elemet_detail_slider").owlCarousel({
		        		pagination: true,
		        		nav: true,
		        		dots: true,
		        		loop: false,
		        		items: 1,
		        		navText : ['<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M326.391,209.918L130.01,388.8h429.494c16.132,0,29.823,16.489,29.823,32.622c0,16.133-14.882,37.74-31.015,37.74H129.95L308.712,628.58c11.489,11.428,10.239,37.979-4.286,50.658c-12.263,10.654-30.121,11.428-41.609,0L14.346,447.435c-6.132-6.131-8.751-14.227-8.334-22.264c-0.417-7.977,2.202-18.751,8.334-24.882l266.745-238.588c11.488-11.429,32.323-8.75,44.05,2.441C337.881,176.226,337.881,198.43,326.391,209.918z"/></svg>',
		        		           '<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M270.155,164.142c11.727-11.191,32.562-13.87,44.05-2.441L580.95,400.289c6.132,6.131,8.751,16.906,8.334,24.882c0.417,8.037-2.202,16.133-8.334,22.264L332.48,679.238c-11.488,11.428-29.347,10.654-41.609,0c-14.525-12.68-15.775-39.23-4.286-50.658l178.762-169.418H36.984c-16.133,0-31.015-21.607-31.015-37.74c0-16.132,13.691-32.622,29.823-32.622h429.494L268.905,209.918C257.416,198.43,257.416,176.226,270.155,164.142z"/></svg>'],
		        	    mouseDrag: mouseDragEnabled
		        	});
		        	
		        	owl.on('translated.owl.carousel', function(event) {
		        		   
		        	  $('.preview_images a').removeClass('active');
		        	  $('.preview_images a[data-id='+$(".elemet_detail_slider .owl-item.active").find('.item').data("id")+']').addClass('active');
		        	   
		        	});
	        	}
	        }
	    });
		
	}
	
	$(document).on('click','.flat_content_chess .flat.status_1 a', function() {
		var id=$(this).parents('.flat').data('id');
		if (id>0) flat_popup(id);
	});
	
	$(document).on('click', '.table-flat td', function() {
		var id=$(this).parents('tr').find('.btn').data('id');
		if (id>0) flat_popup(id);
	});
	
	$(document).on('click','.view_plan_slider .btn, .view_plan_slider .img a', function() {
		var id=$(this).parents('.item').data('id');
		if (id>0) flat_popup(id);
	});
	
	$(document).on('click','.flat_floor:not(.disabled)', function() 
	{
		
		var id=$(this).data('id');
		if (id>0) flat_popup(id);
	});
	
	
	/*---Квартира popup---*/
	
	

	
	/*Этаж popup*/
	function floor_popup(id, type="")	
	{
		
		$.ajax({
	        type: "POST",
	        url: BX.message('SITE_DIR')+'include/mainpage/ajax_floor_detail.php',
	        data: {'ajax_get_page': 'y', 'ajax_mode': 'y', 'id': id, 'house_id': $('.choice_container').data('house-id')},
	        dataType: "html",
	        success: function (data) 
	        {

	        	$('#floor_popup .popup_content').html(data);

	        	if (type!='next_floor')
	        	$.fancybox.open({
	        		src: '#floor_popup', 
	        		type: 'inline',
	        		afterClose: function() {$('#floor_popup .popup_content').html('');}
	        	});	
	        	
	        	$(".popup_content").on("swipeleft", function(event){$("#floor_popup .floor_buttons .prev").trigger('click');});
	        	$(".popup_content").on("swiperight", function(event){$("#floor_popup .floor_buttons .next").trigger('click');});

	        	if ($(window).width()>800)
	        	{
		        	if($('#floor_popup .flat_floor .tooltip.tooltipstered').lenght>0)
		        	$('#floor_popup .flat_floor .tooltip').tooltipster('destroy');
		        	
		        	// $('#floor_popup .flat_floor .tooltip').tooltipster({
		      		// 	  theme: 'tooltipster-chess tooltipster-floor',
		      		// 	  side: 'bottom',
		      		// 	  contentAsHTML: true,
		        	// });
	        	}
	        	
	        	
	        }
	    });
		
	}
	$(document).on('click', '.floor_buttons a', function() {
		if (!$(this).hasClass('disabled'))
		{
			var id=$(this).data('floor-id')
			if (id>0) floor_popup(id, 'next_floor');
		}
	});
	$(document).on('click','.floor_select .flat_path', function() {
		var id=$(this).data('id');
		if (id>0) floor_popup(id);
	});
	/*---Этаж popup---*/


	/*Интерактив*/
	$(document).on('mouseenter', '.flat_floor:not(.disabled),.flat_path', function() {
		$(this).find('g').attr('class','active');
	});
	
	$(document).on('mouseleave', '.flat_floor,.flat_path', function() {
		$(this).find('g').attr('class','');	
	});
	function inter_init()
	{
		if($('.floor_select .flat_path .tooltip.tooltipstered').lenght>0)
		$('.floor_select .flat_path .tooltip').tooltipster('destroy');
		
		$('.floor_select .flat_path .tooltip').tooltipster({
			  theme: 'tooltipster-custom',
			  side: 'bottom',
			  delay: 0,
			  animationDuration: 0,
			  contentAsHTML: true,
			  //trigger: 'click'
		});
		
	}
	
	$(document).on('click','.inter_section_menu a', function() {
		var section_id=$(this).data('id');
		
		$.ajax({
	        type: "POST",
	        url: BX.message('SITE_DIR')+'include/mainpage/ajax_flat_choice.php',
	        data: {'ajax_get_page': 'y', 'ajax_mode': 'y', 'view_mode': 'view_inter', 'section_id': section_id},
	        dataType: "html",
	        success: function (data) 
	        {
	        	var flat_data = $(data).find('.flat_component_data').html();
	        	$('.flat_choice_wrapper').html('<div class="flat_ajax_wrapper"><div class="flat_component_data">'+flat_data+'</div></div>');
	        	inter_init();
	        }
	    });
	});
	if ($('.menu.view_type .active').data('type')=='view_inter') inter_init();
	/*---Интерактив---*/
	
	$("polygon").on("mouseover", function() {
		var polygonId = $(this).attr("id");
		var containerId = $("div").find("[data-pol='" + polygonId + "']");
		var infoId = $("div").find("[data-info='" + polygonId + "']");
		$(containerId).addClass("house_active");
		$(infoId).fadeIn(500);
		
		
	  });
	  
	  $("polygon").on("mouseout", function() {
		var polygonId = $(this).attr("id");
		var containerId = $("div").find("[data-pol='" + polygonId + "']");
		var infoId = $("div").find("[data-info='" + polygonId + "']");
		$(containerId).removeClass("house_active");
		// $(infoId).removeClass("info_house-active");
		$(infoId).css("display","none");
	  });

	  if ($(window).width() > 600) {
		$(document).on('mouseover', '[data-id]', function() {
			
		  var dataId = $(this).attr('data-id');
		//   console.log(dataId);
		//   $('[data-flat="' + dataId + '"]').addClass('floor_flats-box-active');
		  $('[data-flat="' + dataId + '"]').fadeIn(500);
		  $('.floor_popup_info-chess').addClass('floor_popup_info-chess--hidden');
		});
	
		$(document).on('mouseout', '[data-id]', function() {
		  var dataId = $(this).data('id');
		//   $('[data-flat="' + dataId + '"]').removeClass('floor_flats-box-active');
		  $('[data-flat="' + dataId + '"]').css("display", "none");
		  $('.floor_popup_info-chess').removeClass('floor_popup_info-chess--hidden');
		});
	  }
});