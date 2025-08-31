$(document).ready(function() {
	
	
	var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
	};
	
	
	var slide = getUrlParameter('slide');
	
	setTimeout(function(){
		$('.slider').trigger('to.owl.carousel', [slide,0]);
	}, 5000);
	
	$(".lab_tab_1").addClass("tabs_block_active");
	
	$(document).on('click', '.tabs_block label', function(){
		$(".tabs_block label").removeClass("tabs_block_active");
		$(this).addClass("tabs_block_active");

	});
	
	$(document).on('click', '#s1', function(){
		$('.sect0').click();
		setTimeout(function(){
			$('.fullhouse').css({'display':'none'});
			console.log('clc');
		},1000);
		
	});
	$(document).on('click', '#s2', function(){
		$('.sect1').click();
		setTimeout(function(){
			$('.fullhouse').css({'display':'none'});
		},1000);
		
	});	
		$(document).on('click', '#s3', function(){
		$('.sect2').click();
		setTimeout(function(){
			$('.fullhouse').css({'display':'none'});
		},1000);
		
	});	
		$(document).on('click', '#s4', function(){
			$('.sect3').click();
			setTimeout(function(){
				$('.fullhouse').css({'display':'none'});
			},1000);
		
	});	
		$(document).on('click', '#s5', function(){
			$('.sect4').click();
			setTimeout(function(){
				$('.fullhouse').css({'display':'none'});
			},1000);
		
	});	
		$(document).on('click', '#s6', function(){
			$('.sect5').click();
			setTimeout(function(){
				$('.fullhouse').css({'display':'none'});
			},1000);
		
	});	
	
	
	$(document).on('click', '.backhouse', function() {
		$('.fullhouse').css({'display':'block'});
	});
	
	
	
	var show = true;
	$(window).on("scroll load resize", function() {
  	if (!show) return false;
  	var countbox = $(".a_numb-fluid");
  	if (countbox.length > 0) {
    var w_top = $(window).scrollTop();
    var e_top = countbox.offset().top;
    var w_height = $(window).height();
    var d_height = $(document).height();
    var e_height = countbox.outerHeight();
	var ww_top = 0;
	if($(window).width() < 2561) {
		ww_top = w_top + 1000;
	} else if ($(window).width() < 1900) {
		ww_top = w_top + 600;
	} else if ($(window).width() < 1024) { 
		ww_top = w_top + 400;
	}
	
	
    if (
      ww_top >= e_top ||
      w_height + w_top == d_height ||
      e_height + e_top < w_height
    ) {
      $('.benefits__number').css('opacity', '1');
      $('.benefits__number').spincrement({
        thousandSeparator: "&nbsp;",
        duration: 1000
      });

      show = false;
    }
  }
});

$(function () { 
	
	var controller = new ScrollMagic.Controller();

	//Проценты от ширины родителя, сейчас он 400%(с 4мя элементами по 100%), т.е. если надо чтобы было 3 элемента, ширина родителя 300% и в процентах потомкам 33% и 66%
	var wipeAnimation = new TimelineMax()
			.to("#slideContainer", 1,   {x: "-25%"})	
			.to("#slideContainer", 1,   {x: "-50%"})
			.to("#slideContainer", 1,   {x: "-75%"});

		new ScrollMagic.Scene({
				triggerElement: "#pinContainer",
				triggerHook: "onLeave",
				offset: -70,
				duration: "500%"
			})
			.setPin("#pinContainer")
			.setTween(wipeAnimation)
			.addTo(controller);
});


if ($('#tab-btn-1').is(':checked')){
	$('.cont').hide();
	$('#content-1').show();
};

$('.lab_tab_1').click(function(){
	$('.cont').hide();
	$('#content-1').show();
});
$('.lab_tab_2').click(function(){
	$('.cont').hide();
	$('#content-2').show();
});
$('.lab_tab_3').click(function(){
	$('.cont').hide();
	$('#content-3').show();
});
$('.lab_tab_4').click(function(){
	$('.cont').hide();
	$('#content-4').show();
});
$('.lab_tab_5').click(function(){
	$('.cont').hide();
	$('#content-5').show();
});
$('.lab_tab_6').click(function(){
	$('.cont').hide();
	$('#content-6').show();
});
$('.lab_tab_7').click(function(){
	$('.cont').hide();
	$('#content-7').show();
});
$('.lab_tab_8').click(function(){
	$('.cont').hide();
	$('#content-8').show();
});
/*табы*/



$('.sel_1').click(function(){
	$('.cont').hide();
	$('#content-1').show();
});
$('.sel_2').click(function(){
	$('.cont').hide();
	$('#content-2').show();
});
$('.sel_3').click(function(){
	$('.cont').hide();
	$('#content-3').show();
});
$('.sel_4').click(function(){
	$('.cont').hide();
	$('#content-4').show();
});
$('.sel_5').click(function(){
	$('.cont').hide();
	$('#content-5').show();
});
$('.sel_6').click(function(){
	$('.cont').hide();
	$('#content-6').show();
});
$('.sel_7').click(function(){
	$('.cont').hide();
	$('#content-7').show();
});
$('.sel_8').click(function(){
	$('.cont').hide();
	$('#content-8').show();
});



/*выпадающий список*/

$(document).on('click', '.act_v', function(){
	/*$('.inmenu').removeClass('menu');*/
	/*$('.inmenu').removeClass('d-flex');*/
	$('.inmenu').toggleClass('flex-wrap');
	$('.select-box__icon').toggleClass('recurs');

});


/*function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}*/


$(document).on('click', '.inmenu', function(){
	console.log('clcik');
	setTimeout(function(){
		var name_vib = $('.inmenu a.active').find('.name_vib').html();
		console.log($('.inmenu a.active').html());
		$('.is_name').html(name_vib);	
		
		
		/*запись в куки*/
		 var data_at=$('.inmenu a.active').find('span').attr('class');;
		 console.log(data_at);
		 document.cookie = "vkladka="+data_at; 
		
		//getCookie(vkladka);
		
		
	}, 1000);
	
	
	
	
	
});


/*возврат к выбору квартиры*/

/*$(document).on('click', '.tovib', function() {
	console.log(getCookie('vkladka'));
});*/



/*картинка в фильтре*/


$(document).on('mouseover', '.table-flat tr', function(){
	var pic = $(this).find('.thispic').clone(true);
	$(this).find('.thisb2').addClass("hover_img");
	console.log(pic);
	$('.form_search .thispic').remove();
	$('.form_search').append(pic);
	
});


$(document).on('mouseout', '.table-flat', function(){
	$('.form_search .thispic').remove();
	$(this).find('.thisb2').removeClass("hover_img");
});


$('.phone_inp').mask("+7 (999) 999-9999");
$('.kv_phone').mask("+7 (999) 999-9999");

$('.phone_inp').on('click', function () {
    if ($(this).val() === '+7 (___) ___-____') {
        $(this).get(0).setSelectionRange(0, 0);
    }
});

$('input[data-code="PHONE"]').on('click', function () {
    if ($(this).val() === '+7 (___) ___-____') {
        $(this).get(0).setSelectionRange(0, 0);
    }
});


$('.kv_phone').on('click', function () {
    if ($(this).val() === '+7 (___) ___-____') {
        $(this).get(0).setSelectionRange(0, 0);
    }
});

	$(".iblock_add_main_form_2").submit(function() {
		$.ajax({
			type: "POST",
			url: "/mail.php",
			data: $(".iblock_add_main_form_2").serialize()
		}).done(function() {

			$('#callbackModalThanks').modal('show');
		});
		return false;
	});
	
	
	$(".iblock_add_main_form_3").submit(function() {
		$.ajax({
			type: "POST",
			url: "/mail2.php",
			data: $(".iblock_add_main_form_3").serialize()
		}).done(function() {

			$('#callbackModalThanks').modal('show');
		});
		return false;
	});
	
	$(".menu_callback").submit(function() {
		$.ajax({
			type: "POST",
			url: "/mail3.php",
			data: $(".menu_callback").serialize()
		}).done(function() {

			$('#callbackModalThanks').modal('show');
		});
		return false;
	});
	

	
	$(".menu_callback2").submit(function() {
		$.ajax({
			type: "POST",
			url: "/mail4.php",
			data: $(".menu_callback2").serialize()
		}).done(function() {

			$('#callbackModalThanks').modal('show');
		});
		return false;
	});
	

	
	$(".iblock_add_popup_callback2").submit(function() {
		$.ajax({
			type: "POST",
			url: "/mail5.php",
			data: $(".iblock_add_popup_callback2").serialize()
		}).done(function() {
			$.fancybox.close();
			$('#callbackModalThanks').modal('show');
		});
		return false;
	});	
	
	

	
	$('.head_link').each(function(){
		if ('/'+window.location.hash == $(this).attr('href')) {
			$('.head_link').removeClass('active_hl');
			$(this).addClass('active_hl');
		}	
	});
	
	$(document).on('click','.head_link',function(){

		var thislink = $(this);
		var atrh = $(this).attr('href');
		console.log(atrh);
		setTimeout(function(){
			
		
		//console.log('/'+window.location.hash);			
			
			if ('/'+window.location.hash == atrh) {
				$('.head_link').removeClass('active_hl');
				thislink.addClass('active_hl');
			}
		}, 300);
	});

	$('.head_link').each(function(){
		if (window.location.pathname == $(this).attr('href')) {
			$('.head_link').removeClass('active_hl');
			$(this).addClass('active_hl');
		}	
	});
	
	$(document).on('click','.head_link',function(){
		if (window.location.pathname == $(this).attr('href')) {
			$('.head_link').removeClass('active_hl');
			$(this).addClass('active_hl');
		}
	});
	
	/*плавная прокрутка*/
	
   var margin = -80; // переменная для контроля докрутки
   $(document).on('click','.head_link',function(){ // тут пишите условия, для всех ссылок или для конкретных
   
		var hrf = $(this).attr("href");
		console.log(hrf);
		hrf = hrf.replace('/', '');
		console.log($(hrf));	
			
      $("html, body").animate({
         scrollTop: $(hrf).offset().top+margin+ "px" // .top+margin - ставьте минус, если хотите увеличить отступ
      }, {
         duration: 1600, // тут можно контролировать скорость
         easing: "swing"
      });
      //return false;
   });

   $(document).on('click','.new-nav-link',function(){ // тут пишите условия, для всех ссылок или для конкретных
		$('.new-nav-link').removeClass('act_l');
		$(this).addClass('act_l');
   });	
	





	/*карусель в квартире*/
               if ($('.elemet_detail_slider.newowl').length)
                {
                    var owl=$(".elemet_detail_slider").owlCarousel({
                        pagination: true,
                        nav: true,
                        dots: true,
                        loop: false,
                        items: 1,
                        navText : ['<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M326.391,209.918L130.01,388.8h429.494c16.132,0,29.823,16.489,29.823,32.622c0,16.133-14.882,37.74-31.015,37.74H129.95L308.712,628.58c11.489,11.428,10.239,37.979-4.286,50.658c-12.263,10.654-30.121,11.428-41.609,0L14.346,447.435c-6.132-6.131-8.751-14.227-8.334-22.264c-0.417-7.977,2.202-18.751,8.334-24.882l266.745-238.588c11.488-11.429,32.323-8.75,44.05,2.441C337.881,176.226,337.881,198.43,326.391,209.918z"/></svg>',
                                   '<svg width="24" height="24" viewBox="0 0 595.279 841.89" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#FFF" d="M270.155,164.142c11.727-11.191,32.562-13.87,44.05-2.441L580.95,400.289c6.132,6.131,8.751,16.906,8.334,24.882c0.417,8.037-2.202,16.133-8.334,22.264L332.48,679.238c-11.488,11.428-29.347,10.654-41.609,0c-14.525-12.68-15.775-39.23-4.286-50.658l178.762-169.418H36.984c-16.133,0-31.015-21.607-31.015-37.74c0-16.132,13.691-32.622,29.823-32.622h429.494L268.905,209.918C257.416,198.43,257.416,176.226,270.155,164.142z"/></svg>'],
                    });
                    
                    owl.on('translated.owl.carousel', function(event) {
                           
                      $('.preview_images a').removeClass('active');
                      $('.preview_images a[data-id='+$(".elemet_detail_slider .owl-item.active").find('.item').data("id")+']').addClass('active');
                       
                    });
                }
				
				
				
				
				
	/*слайдер о компании*/		

if($(window).width() < 769) {
      $('.ab_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        focusOnSelect: true,
        prevArrow: '<button type="button" class="slick-prev"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M9.5 2.5L4 8L9.5 13.5" stroke="black" stroke-width="1.5" stroke-linecap="square"/></g></svg></button>',
          nextArrow: '<button type="button" class="slick-next"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="icons"> <path id="Vector 252" d="M6.5 13.5L12 8L6.5 2.5" stroke="black" stroke-width="1.5" stroke-linecap="square"/></g></svg></button>'
      });
} 




/*получение гет параметров*/

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});

console.log($_GET["vkl"]);
	
	setTimeout(function() {
		if($_GET["vkl"] != '') {
			$('.'+$_GET["vkl"]+'_1').click();
		};
	} , 1000);
	
	
	
	
if($(window).width() < 769) {	
	console.log('perek');
	setTimeout(function() {
		$('.view_table_1').click();
	}, 1000);
}
	
   
   
   

   
   
   
});


$(document).ready(function() {
	
	
	
(function( $ ) {
  $.fn.selectbox = function() {
    
    // начальные параметры
    // задаем стандартную высоту div'a. 
    var selectDefaultHeight = $('#selectBox_sort').height();
    // угол поворота изображения в div'e 
    var rotateDefault = "rotate(0deg)";
   
        // после нажатия кнопки срабатывает функция, в которой 
        // вычисляется исходная высота нашего div'a. 
        // очень удобно для сравнения с входящими параметрами (то, что задается в начале скрипта) 
        $('body').on('click','#selectBox_sort > .arrow', function() {
          // вычисление высоты объекта методом height() 
          var currentHeight = $('#selectBox_sort').height();
		   
          // проверка условия на совпадение/не совпадение с заданной высотой вначале,
          // чтобы понять. что делать дальше. 
          if (currentHeight < 100 || currentHeight == selectDefaultHeight) {
              // если высота блока не менялась и равна высоте, заданной по умолчанию,
              // тогда мы открываем список и выбираем нужный элемент.
              $('#selectBox_sort').height("160px");  // «точка остановки анимации»
              // здесь стилизуем нашу стрелку и делаем анимацию средствами CSS3 
              $('img.arrow').css({borderRadius: "1000px", transition: ".2s", transform: "rotate(180deg)"});
          }


         // иначе если список развернут (высота больше или равна 250 пикселям), 
         // то при нажатии на абзац с классом valueTag, сворачиваем наш список и
         // и присваиваем блоку первоначальную высоту + поворот стрелки в начальное положение
          if (currentHeight >= 160) {
            $('#selectBox_sort').height(selectDefaultHeight);
            $('.arrow').css({transform: rotateDefault});
          }
		  
		  $('.newar').toggleClass('newarnew');
		  
		  $('.polyg').toggleClass('polygrot');
		  if ($('.polyg').hasClass('polygrot')) {
		  $('.polyg').attr('src','/img/Vector252.svg');
		  } else {
			$('.polyg').attr('src','/img/Vector252.svg');  
		  }
      });

     // так же сворачиваем список при выборе нужного элемента 
     // и меняем текст абзаца на текст элемента в списке
      $('body').on('click', 'a.option', function() {
		
        $('#selectBox_sort').height(selectDefaultHeight);
       $('.arrow').css({transform: rotateDefault});
        $('.valueTag').text($(this).text());
      });
	  
  };
})( jQuery );


$('#selectBox_sort').selectbox();
/*****/



  /*окно куки*/
  
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    function checkCookies() {
        let cookieNote = document.getElementById('cookie_note');
        let cookieBtnAccept = cookieNote.querySelector('.cookie_accept');

        // Если куки cookies_policy нет или она просрочена, то показываем уведомление
		let x = getCookie('cookies_policy');
		if (!getCookie('cookies_policy')) {
            cookieNote.classList.add('show');
        }
		if(typeof x === "undefined") {
		    cookieNote.classList.add('show');	
		}
		

        // При клике на кнопку устанавливаем куку cookies_policy на один год
        cookieBtnAccept.addEventListener('click', function () {
            setCookie('cookies_policy', 'true', 365);
            cookieNote.classList.remove('show');
        });
    }

    checkCookies();  
  

  
  /**/




});
