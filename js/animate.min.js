/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function($){$.fn.appear=function(fn,options){var settings=$.extend({data:undefined,one:true,accX:0,accY:0},options);return this.each(function(){var t=$(this);t.appeared=false;if(!fn){t.trigger('appear',settings.data);return}var w=$(window);var check=function(){if(!t.is(':visible')){t.appeared=false;return}var a=w.scrollLeft();var b=w.scrollTop();var o=t.offset();var x=o.left;var y=o.top;var ax=settings.accX;var ay=settings.accY;var th=t.height();var wh=w.height();var tw=t.width();var ww=w.width();if(y+th+ay>=b&&y<=b+wh+ay&&x+tw+ax>=a&&x<=a+ww+ax){if(!t.appeared)t.trigger('appear',settings.data)}else{t.appeared=false}};var modifiedFn=function(){t.appeared=true;if(settings.one){w.unbind('scroll',check);var i=$.inArray(check,$.fn.appear.checks);if(i>=0)$.fn.appear.checks.splice(i,1)}fn.apply(this,arguments)};if(settings.one)t.one('appear',settings.data,modifiedFn);else t.bind('appear',settings.data,modifiedFn);w.scroll(check);$.fn.appear.checks.push(check);(check)()})};$.extend($.fn.appear,{checks:[],timeout:null,checkAll:function(){var length=$.fn.appear.checks.length;if(length>0)while(length--)($.fn.appear.checks[length])()},run:function(){if($.fn.appear.timeout)clearTimeout($.fn.appear.timeout);$.fn.appear.timeout=setTimeout($.fn.appear.checkAll,20)}});$.each(['append','prepend','after','before','attr','removeAttr','addClass','removeClass','toggleClass','remove','css','show','hide'],function(i,n){var old=$.fn[n];if(old){$.fn[n]=function(){var r=old.apply(this,arguments);$.fn.appear.run();return r}}})})(jQuery);


/* 
 * Multi-item animate
 * Mobile and pad isn't animate
 */
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	isWindowsPhone = ua.match(/(Windows Phone\sOS)\s+([\d.]+)/),
	isMobile = isIphone || isAndroid || isWindowsPhone;

function dataAnimate() {
    if(isMobile) {
		$('[data-animation]').each(function(){
			var elem = $(this);
			elem.removeClass('not-animated').removeAttr('data-animation-delay data-animation');
		});
	}else{
		//PC
		$('[data-animation]').each(function() {
	        var $toAnimateElement = $(this);
	        var toAnimateDelay = $(this).attr('data-animation-delay');
	        var toAnimateDelayTime = 0;
	        if (toAnimateDelay) {
	            toAnimateDelayTime = Number(toAnimateDelay)
	        } else {
	            toAnimateDelayTime = 200
	        }
	        if (!$toAnimateElement.hasClass('animated')) {
	            $toAnimateElement.addClass('not-animated');
	            var elementAnimation = $toAnimateElement.attr('data-animation');
	            $toAnimateElement.appear(function() {
	                setTimeout(function() {
	                    $toAnimateElement.removeClass('not-animated').addClass(elementAnimation + ' animated')
	                },
	                toAnimateDelayTime)
	            },
	            {
	                accX: 0,
	                accY: -30
	            },
	            'easeInCubic')
	        }
	    });
	
	}
}


/*function dataAnimate() {
	if(isMobile) {
		$('[data-animation]').each(function(){
			var elem = $(this);
			elem.removeClass('not-animated');
		});
	}else{
		//PC
		$('[data-animation]').each(function(){
			var elem = $(this);
			var animation = elem.data('animation');		
			elem.appear(function() {
				if ( !elem.hasClass('animated') ) {
					var animationDelay = elem.data('animation-delay');
					
					if ( animationDelay ) {
						setTimeout(function(){					
							elem.removeClass('not-animated').addClass(animation + ' animated');
						}, animationDelay);
					}else {
						elem.removeClass('not-animated').addClass(animation + ' animated');
					}
				}
			});	
		});
		
	}	
}*/