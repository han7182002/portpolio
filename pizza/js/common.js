$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs>li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})

$(document).ready(function(){
	$('.btn_gnb').on('click',function(){
		$('.depth_sitemap').stop().slideToggle();
	})
});

$(document).ready(function(){
	$('.mo_gnb_btn>i').on('click',function(){
		$('.mo_gnb_wrap').stop().slideToggle();
	})
})

$(document).ready(function(){
	$('.mo_gnb_close_btn').on('click',function(){
		$('.mo_gnb_wrap').stop().slideToggle();
	})
})
