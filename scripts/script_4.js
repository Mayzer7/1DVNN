var jshover = function()
{
	var menuDiv = document.getElementById("horizontal-multilevel-menu")
	if (!menuDiv)
		return;

	var sfEls = menuDiv.getElementsByTagName("li");
	for (var i=0; i<sfEls.length; i++) 
	{
		sfEls[i].onmouseover=function()
		{
			this.className+=" jshover";
		}
		sfEls[i].onmouseout=function() 
		{
			this.className=this.className.replace(new RegExp(" jshover\\b"), "");
		}
	}
}

if (window.attachEvent) 
	window.attachEvent("onload", jshover);

$(function() {
	 /*многоуровневое меню*/
	$('.main_menu .has-child > a').attr('href','javascript:void(0);');
	$('.main_menu > ul > li').hover(function() {
        if ($(this).has('ul')) {
        	$(this).contents('ul').stop(true, true).slideDown(200);
        }
    }, function() {
        if ($(this).has('ul')) {
        	$(this).contents('ul').stop(true, true).slideUp(200);
        }
    });
	/*$('.main_menu > ul > li > ul > li').hover(function() {
        if ($(this).has('ul')) {
        	$(this).contents('ul').stop(true, true).show();
        }
    }, function() {
        if ($(this).has('ul')) {
        	$(this).contents('ul').stop(true, true).hide();
        }
    });*/
	
	$('.mobile_menu_content .has-child > a').attr('href','javascript:void(0);');
	$(".mobile_menu_content .has-child").click(function() {
		
		if ($(this).find('ul').is(":visible"))
		$(this).contents('ul').stop(true, true).slideUp(200);
		else
		$(this).find('ul').stop(true, true).slideDown(200);
	});
	
});




