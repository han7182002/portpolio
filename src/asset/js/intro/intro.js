$('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $anchor.parent().addClass('on').siblings().removeClass('on') //이거 css

    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault(); //a 태그의 링크기능을 죽이기
});


$(window).scroll(function(){
    // 스크롤이 될때마다 위치를 담아라 
    var scrollTopPos = $(window).scrollTop();
    if(scrollTopPos > 0){//스크롤을 아래로 내리는 순간 처리}
        $('body').addClass('scroll')
    }
    else{ //스크롤이 완전 위에 닿았을때 처리
        $('body').removeClass('scroll')
    }
});



var dtnum = 0;

$("#interview dt").click(function(){
    clearInterval(autoDt);
    dtnum  = $(this).data('num');
    interview(dtnum);
});


var autoDt= setInterval(function(){
        dtnum++;
        dtnum = dtnum % 5;
        interview(dtnum);
        },2000);

function interview(num){    //선언
    $("#interview dt").eq(num).toggleClass('on').siblings().removeClass('on')
}


 /*******나의 능력 ********/
 $(window).scroll(function(){
    $('#sec1 .guage').each( function() {      //나의 능력 슬라이드 바들이 각각 처리
      var dataWidth = $(this).data('value'); // 그 그래픽만 들어라... 그 그래픽바의 속성 data-value
        // var를 절대 생략해서는 안돼!!!! .graph-bar객체 마다 자신만의 변수 dataWidth를 가지고 있는 것이기에...
       //  var dataWidth = $(this).attr('data-value'); // 일반적인 표현 attr("속성명")
       if( $(window).scrollTop()  > ( $("#sec1").offset().top - 200) ){
        $(this).width(dataWidth + "%");
       }
     });
  });


  
