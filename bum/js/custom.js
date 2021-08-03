/* 
 * custom js Document
*/ 


//contect number
$(function(){
	setTimeout(function(){
		$('#header nav .gnb > li ul').addClass('active');			
	}, 200);  	
});

$(document).ready(function() {
	smoothScroll();
	responsive();	
	visualAni();
	selcetCustum();

	//popup
	$('#btn_popup').on('click', function() {
		$('.area_popup').toggleClass('active');
		$('#btn_popup').toggleClass('active');
	})
	$('#btn_close').on('click', function() {
		$('.area_popup').toggleClass('active');
		$('#btn_popup').toggleClass('active');
	})
	
	//all menu
	$('#nav-icon4').click(function(){
		$(this).toggleClass('open');
		$('.area_sitemapWrap, body').toggleClass('open');});
});

function responsive(){
	var res = ""
	var param = $("#header");
	var gnbArea = $(".gnb > li");
	var gnbLink = gnbArea.children("a");
	$('#header nav').append('<a href="#" class="btn_close">메뉴닫기</a>');
	$('#header .btn_menu').append('span');
	
	//default 
	if(!$(".btn_menu").is(":hidden")) res = "mob";
	else res = "web";  
	param.attr("class",res);
	def(param);

	$(window).resize(function(){
		if(!$(".btn_menu").is(":hidden")) res2 = "mob";
		else res2 = "web"; 
		param.attr("class",res2);
		if(res != res2){
			res = res2;  
			def(param);
		}
	}); 

	//mobile
	$('.btn_menu').on('click',function(){
		$(this).toggleClass('active');		
		$('body').toggleClass('active');
		param.find('nav').toggleClass('active');
		gnbLink.removeClass('active');	
		gnbLink.parent().find('ul').slideUp();
		return false;
	});	

	$('.btn_close').on('click',function(){
		$('.btn_menu').removeClass('active');
		$('body').removeClass('active');
		param.find('nav').removeClass('active');
		gnbLink.removeClass('active');	
		gnbLink.parent().find('ul').slideUp();
		return false;
	});

	function def(param){
		if(param.attr("class") == "web"){			
			$('#header .gnb > li > a').unbind('click');
			$('#header .gnb > li > ul').removeAttr('style');
			$('.btn_menu, body, #header nav').removeClass('active');
			gnbLink.removeClass('active');
			
			gnbLink.hover(function() {
				if(param.attr("class") == "web"){
					$(this).addClass("active").parent().addClass("active"); 
					$(this).parent().hover(function() {
					}, function(){     
					   $(this).removeClass("active", function(){
							$(this).parent().find("a").removeClass("active");
					   });    
					}); 
					  //하위메뉴가 없을경우  a에 active 추가 없음
					if(!($(this).parent().find("ul").length > 0)) {
					   $(this).parent().removeClass("active").find("a").removeClass("active");
					}
				}
			});
			
		} else if (param.attr("class") == "mob"){ 
			$('#header .gnb li').off('mouseenter mouseleave');
			$('#header.mob .gnb > li').each(function(){
				var gnbLink = $(this).children('a');
				if($(this).children('ul').length > 0){
					gnbLink.on('click',function(e){
						e.preventDefault();
						$(this).toggleClass('active').parent().children('ul').slideToggle();
					});
				}
			});
		}
	}
}


function visualText(){	
	$('.ml3').each(function(){
	  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
	});

	ml.timelines["ml3"] = anime.timeline({loop: false})
	  .add({
		targets: '.ml3 .letter',
		opacity: [0,1],
		easing: "easeInOutQuad",
		duration: 1000,
		delay: function(el, i) {
		  return 150 * (i+1)
		}
	  }).add({
		targets: '.ml3',
		opacity: 1,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 500
	  });
}

//visual slider animation
function visualAni(){
	
	$('.area_visual .list').bxSlider({
		mode:'fade',
		auto:true,
		pager:true,
		controls:false,
		pause:7000,
		speed:1000,
		onSliderLoad: function(currentIndex) {     			
			$('.area_visual .list').children().eq(currentIndex).addClass('active-slide');
			visualText();			
		},
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			$('.area_visual .list').children().removeClass('active-slide');
			$slideElement.addClass('active-slide');
			visualText();						
		}
	});

	$('.list_artist .list').bxSlider({
		mode:'fade',
		auto:true,
		pager:false,
		controls:true,
		pause:7000,
		speed:1000		
	});

	var slider = $('.area_popup .list').bxSlider({
		pagerCustom: '#bx-pager',
		mode: 'fade',
		easing: 'swing',
		captions: true,
		auto:true
	});

	$('a.pager-prev').click(function () {
		var current = slider.getCurrentSlide();
		slider.goToPrevSlide(current) - 1;

	});
	$('a.pager-next').click(function () {
		var current = slider.getCurrentSlide();
		slider.goToNextSlide(current) + 1;
	});


}

//scroll custom
$(window).scroll( function(){
	$('.box_program, .area_notice ul, .scroll_up').each( function(i){
		
		var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		
		if( bottom_of_window > bottom_of_object ){                
			$(this).addClass("active");	                    
		}
		else{
				//$(this).removeClass('active');
			}		
	});      
});	

//scroll down
$(function() {
	$('.scrolldown').click (function() {
		  $('html, body').animate({scrollTop: $('#content').offset().top }, 'slow');
		  return false;
	});
	$('.area_subVisual a').click (function() {
		  $('html, body').animate({scrollTop: $('#content').offset().top }, 'slow');
		  return false;
	});
});

//scroll add class
$(window).scroll(function(){
	if ($(window).scrollTop() >= 300) {
		$('.btn_quick').addClass('color_change');
	}
	else {
		$('.btn_quick').removeClass('color_change');
	}
});

//select custum
function selcetCustum(){
	var x, i, j, selElmnt, a, b, c;
	x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
	  selElmnt = x[i].getElementsByTagName("select")[0];
	  a = document.createElement("DIV");
	  a.setAttribute("class", "select-selected");
	  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	  x[i].appendChild(a);
	  b = document.createElement("DIV");
	  b.setAttribute("class", "select-items select-hide");
	  for (j = 1; j < selElmnt.length; j++) {

		c = document.createElement("DIV");
		c.innerHTML = selElmnt.options[j].innerHTML;
		c.addEventListener("click", function(e) {

			var y, i, k, s, h;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			h = this.parentNode.previousSibling;
			for (i = 0; i < s.length; i++) {
			  if (s.options[i].innerHTML == this.innerHTML) {
				s.selectedIndex = i;
				h.innerHTML = this.innerHTML;
				y = this.parentNode.getElementsByClassName("same-as-selected");
				for (k = 0; k < y.length; k++) {
				  y[k].removeAttribute("class");
				}
				this.setAttribute("class", "same-as-selected");
				break;
			  }
			}
			h.click();
		});
		b.appendChild(c);
	  }
	  x[i].appendChild(b);
	  a.addEventListener("click", function(e) {

		  e.stopPropagation();
		  closeAllSelect(this);
		  this.nextSibling.classList.toggle("select-hide");
		  this.classList.toggle("select-arrow-active");
		});
	}
	function closeAllSelect(elmnt) {

	  var x, y, i, arrNo = [];
	  x = document.getElementsByClassName("select-items");
	  y = document.getElementsByClassName("select-selected");
	  for (i = 0; i < y.length; i++) {
		if (elmnt == y[i]) {
		  arrNo.push(i)
		} else {
		  y[i].classList.remove("select-arrow-active");
		}
	  }
	  for (i = 0; i < x.length; i++) {
		if (arrNo.indexOf(i)) {
		  x[i].classList.add("select-hide");
		}
	  }
	}

	document.addEventListener("click", closeAllSelect);

}

//scroll motion
$(function(){

  $(".box").inertiaScroll({
	parent: $("")
  });

  $(".box").each(function(){
	var speed = $(this).data("speed");
	var height = $(this).height() + "px";
	$(this).css("",height).text();
  });

});  

//text motion
$(document)
	.ready(function () {
		//initialize paroller.js
		$('[data-paroller-factor]').paroller();
		//initialize paroller.js and set options for elements with .paroller class
		$('.paroller-example').paroller({
		factorXs: 0.1,
		factorSm: 0.1,
		factorMd: -0.4,
		factorLg: -0.5,
		factorXl: -0.2,
		factor: -0.4,
		type: 'foreground',
		direction: 'horizontal'
	});
});

//slick slider
$(function(){
	var slickHtml = $('.slick_list').html();
	$('.slick_active').append(slickHtml);
});
$(window).load(function(){
	$('.slick_active').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		arrows: false,
		fade: true,
		asNavFor: '.slick_list',				
	});

	$('.slick_list').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 500,
		asNavFor: '.slick_active',
		dots: false,
		centerMode: true,
		variableWidth: true,
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		  ],
	});
});

//scroll target animate
jQuery(document).ready(function($) {
	$(".txt_announce a:last-child, .area_artist .list_writer li a").click(function(event){            
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 700);
	});
});

function is_mob(){
	return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}

function is_mac(){
	return navigator.platform.indexOf('Mac') > -1;
}

function is_chrome(){
	return /Chrome/.test(navigator.userAgent);
}

function is_firefox(){
	return /Firefox/.test(navigator.userAgent);
}

function smoothScroll(){
	if(is_mob() || is_mac() || is_firefox()) return;
	var $window = $(window);
	if(smoothScroll_passive()){
		window.addEventListener("wheel",smoothScroll_scrolling,{passive: false});
	}else{
		$window.on("mousewheel DOMMouseScroll", smoothScroll_scrolling);
	}
}

function smoothScroll_passive(){
	var supportsPassive = false;
	try {document.addEventListener("test", null, { get passive() { supportsPassive = true }});
	} catch(e) {}
	return supportsPassive;
}

function smoothScroll_scrolling(event){
	event.preventDefault();
	var $window = $(window);
	var scrollTime = 1;
	var scrollDistance = $window.height() / 2.5;
	var delta = 0;
	if(smoothScroll_passive()){
		delta = event.wheelDelta/120 || -event.originalEvent.detail/3;
	}else{
		if(typeof event.originalEvent.deltaY != "undefined"){
			delta = -event.originalEvent.deltaY/120;
		}else{
			delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		}
	}

	var scrollTop = $window.scrollTop();
	var finalScroll = scrollTop - parseInt(delta*scrollDistance);
	TweenMax.to($window, scrollTime, {
		scrollTo : { y: finalScroll, autoKill:true },
		ease: Power3.easeOut,
		overwrite: 5
	});
}