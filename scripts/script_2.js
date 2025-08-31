$(function() {
	
	var mouseDragEnabled = true;
	if ($(window).width()<1200) mouseDragEnabled = false;
	
	function progress_init()
	{
		var active_month=$('.month_select .items.has_select a.active');
		$('.month_select .items.has_select').prepend('<a data-id="'+$(active_month).data('id')+'" class="selected" href="#" onclick="return false;">'+$(active_month).html()+'</a>');
		
		var active_year=$('.year_select .items.has_select a.active');
		$('.year_select .items.has_select').prepend('<a data-id="'+$(active_month).data('id')+'" class="selected" href="#" onclick="return false;">'+$(active_year).html()+'</a>');	
		
		$(".slider_progress").owlCarousel({
			items: 1,
			pagination: true,
			//autoplay: true,
			nav: true,
			loop: false,
			dots: true,
		    mouseDrag: mouseDragEnabled,
			navText : ['<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13.833L4 8.33301L9.5 2.83301" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			           '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 13.833L12 8.33301L6.5 2.83301" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'],
		});
	}
	function ajax_progress()
	{
		$.ajax({
	        type: "POST",
	        url: BX.message('SITE_DIR')+'include/mainpage/ajax_progress.php',
	        data: {'ajax_get_page': 'y', 'ajax_mode': 'y', 'year': $('.year_select .items a.active').data('id'), 'month':  $('.month_select .items a.active').data('id')},
	        dataType: "html",
	        success: function (data) 
	        {

	        	var ajax_content = $(data).find('.progress_content_wrapper').html();
	        	$('.progress_content_wrapper').html('<div class="progress_content_wrapper">'+ajax_content+'</div>');
	        	progress_init();
	        	
	        }
	    });
	}

	progress_init();
	
	$(document).on('click','.month_select .items a', function() 
	{
		if (!$(this).hasClass('.double'))
		{
			$('.month_select .items a.selected').remove();
			$('.month_select .items a.active').removeClass('active');
			var active_month=this;
			$(this).addClass('active');
			$('.month_select .items.has_select').prepend('<a data-id="'+$(active_month).data('id')+'" class="selected" href="#" onclick="return false;">'+$(active_month).html()+'</a>');
			$('.month_select .items').addClass('min');
			ajax_progress();
		}
	});
	
	$(document).on('mouseenter','.month_select .items', function() {$('.month_select .items').removeClass('min');});
	

	$(document).on('click','.year_select .items a', function() 
	{
		if (!$(this).hasClass('.double'))
		{
			$('.year_select .items a.selected').remove();
			$('.year_select .items a.active').removeClass('active');
			var active_year=this;
			$(this).addClass('active');
			$('.year_select .items.has_select').prepend('<a data-id="'+$(active_year).data('id')+'" class="selected" href="#" onclick="return false;">'+$(active_year).html()+'</a>');
			$('.year_select .items').addClass('min');
			ajax_progress();
		}
	});
	
	
	$(document).on('mouseenter','.year_select .items', function() {$('.year_select .items').removeClass('min');});
	
	
});