$(document).ready(function() {
	
	// 下来多语言
	$('.language-dropdown ul.sf-menu').superfish({ 
		delay:       100,
		animation:   {opacity:'fast',height:'show'},
		speed:       'fast',
		autoArrows:  true,
		dropShadows: false
	});
	
	
	// 导航菜单
	$('.main-nav ul.sf-menu').superfish({ 
		delay:       100,
		animation:   {opacity:'fast',height:'show'},
		speed:       'fast',
		autoArrows:  true,
		dropShadows: false 
	});
	$('.main-nav ul.sf-menu > li').last().addClass('last').end().hover(function(){ $(this).addClass('nav-hover'); },function(){ $(this).removeClass('nav-hover'); });
	
	// mobile-menu	
	$('.mobile-menu-icons a').click(function(event){
		var className = $(this).attr('data-drawer');
		
		if( $('.'+className).css('display') == 'none' ){						
			$('.'+className).stop().slideDown().siblings('.drawer-section').slideUp('fast');
		}else{
			$('.drawer-section').stop().slideUp('fast');	
		}
		event.stopPropagation();
	});
	$('.mobile-nav a').click(function(){					
		if( $(this).next().is('ul') ){
			if( $(this).next('ul').css('display') == 'none' ){
				$(this).next('ul').slideDown('fast');
				$(this).find('i').attr('class','mobile-arrow mobile-arrow-close');					
			}else{
				$(this).next('ul').slideUp('fast');
				$(this).next('ul').find('ul').slideUp('fast');
				$(this).find('i').attr('class','mobile-arrow mobile-arrow-open');
			}			
		}
	});
	
	// context-menu & category-list
	$('.context-menu, .category-list').children('li:last').addClass('last');
	$('.context-menu ul, .category-list ul').find('li:last').addClass('last');		
	$('.context-menu a, .category-list a').click(function(){		
		if( $(this).parent('li').find('ul') ){
			$(this).parent('li').find('ul').slideDown('fast');
			$(this).parent('li').siblings('li').find('ul').slideUp('fast');
			$(this).parent('li').addClass('current').siblings('li').removeClass('current');
			$(this).parent('li').siblings('li').find('i').attr('class', 'icon-open');
			$(this).find('i').attr('class', 'icon-close');
		}
	});
	
	
	// table	
	$(".table-striped tbody>tr:odd").addClass("tr-odd");
	$(".table-striped tbody>tr:even").addClass("tr-even");
	
	
	// tabs
	$('.tabs-resp').respTabs();
	$('.tabs-no-resp').respTabs({ responsive:false });
	$('.accordion-default').respTabs({ model:'accordions' });	
	$('.accordion-toggle').respTabs({ model:'accordions', toggles:true });
	
	// slider and scrollable
	$(".owl-slider-default").owlCarousel({		  
		autoPlay : true,
		stopOnHover: true,
		paginationNumbers : true,
		singleItem:true,
		autoHeight : true,		
		afterUpdate : function(elem) {
			 owlAddThumbsPage(elem)
		},		
		afterInit : function(elem) {
			owlAddThumbsPage(elem)
		}
	});
	$(".owl-slider-caption").owlCarousel({
		navigation : true,	
		paginationNumbers : true,
		singleItem:true,
		autoHeight : true
	});
	$(".owl-scrollable-4col").owlCarousel({
		autoPlay : true,
		navigation : true,
		pagination : false,
		scrollPerPage : true,
		autoHeight : true,
		items : 4,		
		stopOnHover: true/*,
		rewindNav : false*/
	});
	$(".owl-scrollable-5col").owlCarousel({
		autoPlay : true,
		navigation : true,
		pagination : false,
		scrollPerPage : true,
		autoHeight : true,
		items : 5,		
		stopOnHover: true/*,
		rewindNav : false*/
	});
	$(".owl-scrollable-zoom").owlCarousel({
		autoPlay : false,
		navigation : true,
		pagination : false,
		scrollPerPage : true,
		autoHeight : true,
		items : 5
	});
	
	function owlAddThumbsPage(elem){
		var owlImgItem = elem.find('.owl-wrapper').children(),
			owlPage = elem.find('.owl-pagination'),
			owlPageItem = elem.find('.owl-pagination').children(),
			thumbsImgSrc = '';
		
		if( owlImgItem.eq(0).find('img').attr('data-img-thumbs') ){
			owlPage.addClass('owl-pagination-thumbs');
			owlImgItem.each(function(){
				var index = owlImgItem.index($(this));
				thumbsImgSrc = owlImgItem.eq(index).find('img').attr('data-img-thumbs');
				thumbsImgAlt = owlImgItem.eq(index).find('img').attr('alt');
				owlPageItem.eq(index).html('<img src="'+ thumbsImgSrc +'" alt="'+ thumbsImgAlt +'" />' );
			});
		}
	}
	
	
	//图库切换
	$('.pgwSlideshow-gallery').pgwSlideshow({
		mainClassName : 'pgwSlideshow-gallery pgwSlideshow'
	});
	$('.pgwSlideshow-gallery-simple').pgwSlideshow({
		mainClassName : 'pgwSlideshow-gallery-simple pgwSlideshow',
		displayList : false		
	});	
	$('.pgwSlideshow-gallery-zoom').pgwSlideshow({
		mainClassName : 'pgwSlideshow-gallery-zoom pgwSlideshow',
		displayControls : false
	});
	
	
	
	// 有弹窗的图库切换
	$('.gallery-img-fancybox').each(function(){
		var relName = $(this).attr('data-rel-name');
		var zoomText = $(this).attr('data-icon-zoom-text') || "查看大图";
		$(this).find('.ps-current > ul').find('a').attr("rel", relName).append('<span class="icon-zoom">'+ zoomText +'</span>');
	});
	
	
	// 弹窗视频
	$('.fancybox-video-play').fancybox({
		'autoScale'   		: false,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'hideOnOverlayClick': false,
		'centerOnScroll'	: true,
		'overlayColor'		: '#000',
		'padding'			: '0',
		'margin'			: '0'
	});	
	// 初始化手机弹窗视频宽度
	var touchWindowWidth = $(window).width();
	if( touchWindowWidth < 1000 ){
		$('.video-player-wrapper-fancybox').css("width", touchWindowWidth-60);
	}
	// 弹窗大图
	//$('a').each(function(){
	$('a[rel]').each(function(){		
		var _rel = $(this).attr('rel');		
		if( _rel ){
			$('a[rel='+ _rel +']').fancybox({
				'transitionIn'		: 'elastic',
				'transitionOut'		: 'elastic',				
				'hideOnOverlayClick': false,
				'centerOnScroll'	: true,
				'padding'  			: 0,
				'overlayColor'      : '#000'
			});	
		}
	});
	
	
	//没有下载文件提示
	$('.no-file').click(function(){ var noFilePrompt = $(this).attr('data-prompt') || '暂无下载文件！';  alert(noFilePrompt); });
	
	
	//全屏搜索	
	$('.fullscreen-search-trigger').click(function(){
		$('.fullscreen-search-section').addClass('fullscreen-search-section-show');		
		setTimeout(function(){
	      $('.fullscreen-search-input').focus();
	    }, 300);
		return false;		
	});
	$('.fullscreen-search-close').click(function(){
		$(this).parents('.fullscreen-search-section').removeClass('fullscreen-search-section-show');
		return false;
	});
	
	
	
	//产品选项
	$('.option-select-list a').click(function(){		
		if( $(this).parent('li').hasClass('selected') ) return false;
		
 		if( $(this).attr('data-disabled') !='disabled' ){
			var selectValue = $(this).find('label').attr('title');
			$(this).parent('li').addClass('selected').siblings().removeClass('selected');
			$(this).parents('.product-option-item').children('.product-option-label').find('span').text(selectValue);										
			return false;
		}else{
			var disabledTips = $(this).attr('data-disabled-tips') || "暂时缺货！";
			alert( disabledTips );
			return false;
		}
	});
	//购买数量加减
	$('.quantity-wrapper').each(function(){				
		var quantityMsg =  $(this).nextAll('.msg-note-wrappper');
		var decrease = $(this).children('.quantity-decrease');
		var increase = $(this).children('.quantity-increase');
		var quantityInput = $(this).children('.quantity-input');
				
		var minVal = parseInt(quantityInput.attr('min')) || 1;
		var maxVal = parseInt(quantityInput.attr('max'));
		var step = parseInt(quantityInput.attr('step')) || 1;
		
		decrease.click(function(){
			var currentQuantity = parseInt(quantityInput.val());
			quantityMsg.hide();
			if( currentQuantity != minVal && (currentQuantity - step) > minVal ){
				quantityInput.val( currentQuantity - step );	
			}else{
				quantityInput.val( minVal );	
			}
		});		
		increase.click(function(){
			var currentQuantity = parseInt(quantityInput.val());
			if( (isNaN(maxVal) || currentQuantity < maxVal) && (currentQuantity + step) < maxVal ){
				quantityInput.val( currentQuantity + step );
			}else{
				quantityInput.val( maxVal );
				quantityMsg.show();
			}
		});
		
		quantityInput.keyup(function(){
			//只能输入数字
			var tmptxt=$(this).val();     
        	$(this).val(tmptxt.replace(/\D|^0/g,''));
			
			var currentQuantity = parseInt($(this).val());
			quantityMsg.hide();			
			if( isNaN(currentQuantity) || currentQuantity < minVal ){
				quantityInput.val( minVal );
				quantityMsg.hide();
			}else if( currentQuantity > maxVal ){
				quantityInput.val( maxVal );
				quantityMsg.show();
			}
		});
	});
	//多描述选项卡固定	
	$(".product-desc > .tabs > .tabs-list").each(function(){			
		var fixedTab = $(this),
			tabPlaceholder = fixedTab.parent().prevAll(".tabs-placeholder"),										
			tabTopVal,											
			tabLeftVal,
			tabListWidth,
			tabListheigh,
			tabContentHeight
			;
		
		function addFix(){
			fixedTab.addClass("tabs-fixed");
			fixedTab.css({"width":tabListWidth});
			tabPlaceholder.height(tabListheight);
		}
		function removeFix(){
			fixedTab.removeClass("tabs-fixed");
			fixedTab.removeAttr("style");
			tabPlaceholder.height(0);
		}
		
		function getTabContentHeight (){
			$(".tabs-container").find(".tab-content").each(function(){
				if( $(this).is(":visible") ) { tabContentHeight = $(this).height(); }
				return tabContentHeight;
			});
		}
		function setTabFixed() {
			getTabContentHeight();
			if ( tabTopVal <= $(window).scrollTop() && $(window).scrollTop() < tabTopVal + tabContentHeight ){
				addFix();
			}else{
				removeFix();
			}																																
		}		
		function initTabFix(){
			removeFix();
			tabTopVal  =  parseInt(fixedTab.offset().top);														
			tabLeftVal  =  parseInt(fixedTab.offset().left);
			tabListWidth  =  fixedTab.width();
			tabListheight  =  fixedTab.height();	
			setTabFixed();
		}
		
	   initTabFix();
		
		fixedTab.find('a').click(function(){                                                
			setTabFixed();
			if ($(window).scrollTop() > tabTopVal) { $(window).scrollTop(tabTopVal); }
		});
		$(window).bind("scroll",function(){  setTabFixed() });																						
		$('html').bind("resize",function(){  initTabFix()  });
	});
	
	
	
	//返回顶部
	goTop();
	
	
	//内容运动效果
	var bAnimateSwitch = true;	// 控制是否使用运动
	if( bAnimateSwitch ){
		dataAnimate();
	}else{
		$('[data-animation]').each(function(){
			var elem = $(this);
			elem.removeClass('not-animated').removeAttr('data-animation-delay data-animation');
		});	
	}
	
	
});


$(window).bind("load resize", function() {
	
	var postList = $(".post-list");	
	postList.each(function(){
		var postImg = $(this).find(".post-img");
		var postTextBox = $(this).find(".post-text-box");	
		var postText = $(this).find(".post-text");
		var postTextSummary = $(this).find(".post-text-summary");
		var postMaxHeight = postImg.eq(0).height();
		var summaryMaxHeight = 0;			
			
		postImg.each(function(){
			postMaxHeight = $(this).height() > postMaxHeight ? $(this).height() : postMaxHeight;
		}).find("img").height( postMaxHeight );			
		
		postTextBox.each(function(){
			$(this).height( postMaxHeight - parseInt($(this).css("paddingTop")) - parseInt($(this).css("paddingBottom")) );
		});
		
		postTextSummary.each(function(){			
			summaryMaxHeight = postMaxHeight - $(this).prevAll("h2").height() - parseInt($(this).prevAll("h2").css("marginBottom")) - parseInt($(this).parent(".post-text").css("paddingBottom"))*2 - $(this).nextAll(".post-text-detail").height() - 0;						
			if( $(this).prevAll(".price").length ){ 
				//有价格
				summaryMaxHeight = summaryMaxHeight - $(this).prevAll(".price").height() - parseInt($(this).prevAll(".price").css("marginBottom")) 
			}
			if( $(this).height() > summaryMaxHeight ){			
				$(this).height( summaryMaxHeight );
			}
		});		
		
		//三列 - 特殊处理第二列
		if( $(this).hasClass("post-list-3col") ){
			$(this).find(".post-list-item-spec").find(".post-img").css("top", postMaxHeight);
			$(this).find(".post-list-item-spec").find(".post-text-box").css("top", -postMaxHeight);
		}
	});
	
});


function goTop(){	
	$(window).scroll(function() {
		if($(window).scrollTop() > 100){
			$(".gotop").fadeIn('fast');
		}else{
			$(".gotop").fadeOut('fast');
		}
	});
		
	$(".gotop").click(function() {
		$('body,html').animate({scrollTop:0},500);
		return false;
	});		
};