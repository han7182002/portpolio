var main = (function () {
  var root = this;

  //Device Check
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS) {
    $('html').addClass('ios');
  }

  var isIE = false;
  var agent = navigator.userAgent.toLowerCase();
  if (
    (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) ||
    agent.indexOf('msie') != -1 ||
    agent.indexOf('edge') != -1
  ) {
    isIE = true;
    $('html').addClass('IE');
  }

  var oldConsoleLog = null;
  var logger = {};

  logger.on = function () {
    if (oldConsoleLog == null) return;

    window['console']['log'] = oldConsoleLog;
  };

  logger.off = function () {
    oldConsoleLog = console.log;
    window['console']['log'] = function () {};
  };

  /* �곸긽 ID */
  const videoId = {
    player1: 'wKfcycHxpU0',
  };

  /* var */
  var wW = $(window).width();
  var wH = $(window).height();
  var scTop = $(window).scrollTop();
  var scTopH = scTop + wH;
  var $fixedLogo = $('.wrap_fixed .logo_set');
  var $fixedSticky = $('.wrap_fixed .btn_sticky');
  var $visual = $('.section_visual');
  var $sec01 = $('.section01');
  var $sec02 = $('.section02');
  var $sec02Gallery = $('.section02 .gallery_set');
  var $sec02GalleryBox01 = $('.section02 .gallery_set .box01');
  var $sec02GalleryBox02 = $('.section02 .gallery_set .box02');
  var $sec02GalleryBox03 = $('.section02 .gallery_set .box03');
  var $sec02GalleryBox04 = $('.section02 .gallery_set .box04');
  var $sec02GalleryBox05 = $('.section02 .gallery_set .box05');
  var $sec03 = $('.section03');
  var $sec04 = $('.section04');
  var $sec05 = $('.section05');
  var $sec06 = $('.section06');
  var $sec07 = $('.section07');
  var $secVideo = $('.section_video');
  var $secCTA = $('.section_cta');
  var $secTab = $('.section_tab');
  var $footer = $('.footer');
  var $warpVideo = $('.wrap_cont_video');
  var $video = $('.wrap_cont_video .video_set');

  var videoFlag = false;
  var trackcode = '';

  const slideStatus = {
    s03Init: false,
    s03Start: false,
    s06Init: false,
    s06Start: false,
  };
  const galleryBoxTimer = {
    delay: 100,
    box01: null,
    box02: null,
    box03: null,
    box04: null,
    box05: null,
  };
  var eleSize = {};
  var eleSizeCalculate = function () {
    eleSize = {
      visual: getElementsInfo($visual),
      sec01: getElementsInfo($sec01),
      sec02: getElementsInfo($sec02),
      sec02Gallery: getElementsInfo($sec02Gallery),
      sec02GalleryBox01: getElementsInfo($sec02GalleryBox01),
      sec02GalleryBox02: getElementsInfo($sec02GalleryBox02),
      sec02GalleryBox03: getElementsInfo($sec02GalleryBox03),
      sec02GalleryBox04: getElementsInfo($sec02GalleryBox04),
      sec02GalleryBox05: getElementsInfo($sec02GalleryBox05),
      sec03: getElementsInfo($sec03),
      sec04: getElementsInfo($sec04),
      sec05: getElementsInfo($sec05),
      sec06: getElementsInfo($sec06),
      secVideo: getElementsInfo($secVideo),
      sec07: getElementsInfo($sec07),
      secCTA: getElementsInfo($secCTA),
      secTab: getElementsInfo($secTab),
      footer: getElementsInfo($footer),
    };
  };

  /**
   * 媛쒖껜 �꾩튂 諛� �믪씠 �뺣낫 由ы꽩
   * @param $ele
   * @returns {{init: init, logger: {}}|{top, topH: (function(): *), height: *}}
   */
  var getElementsInfo = function ($ele) {
    try {
      return {
        top: $ele.offset().top,
        height: $ele.outerHeight(),
        topH: function () {
          return this.top + this.height;
        },
      };
      // return ($ele.length > 0) ? {
      // 	top: $ele.offset().top,
      // 	height: $ele.outerHeight(),
      // 	topH: function () {
      // 		return this.top + this.height;
      // 	}
      // } : {top: 0, height: 0, topH : function(){ return 0}};
    } catch (e) {
      console.error('媛쒖껜 �뺣낫瑜� 媛��몄삤�붾뜲 �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.', $ele);
    }
  };
  eleSizeCalculate();

  var syncBrowserHeight = function () {
    wW = $(window).width();
    wH = $(window).height();

    eleSizeCalculate();
  };

  var s;
  let resizeTimer = null;
  let visualSliderIng = false;
  let visualSliderTimer = null;
  var init = function () {
    makeTrackcode();
    videoInit();
    videoStatusCheck();
    //Mute button
    $('.btn_mute').on('click', function () {
      var id = $(this).data('player');
      var obj = eval(id);
      if (obj.isMuted()) {
        obj.unMute();
        $(this).addClass('on');
      } else {
        obj.mute();
        $(this).removeClass('on');
      }
    });

    //�대쫫 �욊린
    $('.name_set .item').shuffle();

    TweenMax.set($(`.portrait_set li`), { zIndex: 1 });
    autoMove();

    $('.people_btn_set .btn_next').on('click', function (e) {
      movePrev();
    });

    $('.people_btn_set .btn_prev').on('click', function (e) {
      moveNext();
    });

    photoZoom();

    $('.section02 .name_set').slick({
      slidesToShow: 1,
      fade: true,
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
    });

    $('.section03 .slide_set')
      .on('init', function () {
        slideStatus.s03Init = true;
      })
      .slick({
        slidesToShow: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 3000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        prevArrow: $('.section03 .slide_prev'),
        nextArrow: $('.section03 .slide_next'),
        appendDots: $('.section03 .pagination'),
      });

    $('.section06 .slide_set')
      .on('init', function () {
        slideStatus.s06Init = true;

        //珥덇린��
        //slick-active-m �명똿
        $('.section06 .slide_set .slick-slide').removeClass('slick-active-m');
        $('.section06 .slide_set .slick-center').addClass('slick-active-m');
        $('.section06 .slick-active-m').prev().prev().addClass('slick-active-m-prev-prev');
        $('.section06 .slick-active-m').next().next().addClass('slick-active-m-next-next');
      })
      .slick({
        slidesToShow: 3,
        arrows: true,
        dots: true,
        centerMode: true,
        variableWidth: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 5000,
        appendDots: $('.section06 .pagination'),
        prevArrow: $('.section06 .slide_prev'),
        nextArrow: $('.section06 .slide_next'),
        pauseOnFocus: false,
        pauseOnHover: false,
      })
      .on('beforeChange', function (slick, currentSlide, nextSlide, index) {
        let currentSlideClass = '.item0' + (currentSlide.currentSlide + 1);
        let nextSlideClass = '.item0' + (index + 1);
        $('.section06 .slide_set .slick-slide' + currentSlideClass).removeClass('slick-active-m');
        $('.section06 .slide_set .slick-slide' + nextSlideClass).addClass('slick-active-m');

        // $(".section06 .item img").css("transform-origin", "center center");
        // $(".section06 .slick-active-m").prev().prev().find("img").css("transform-origin", "right center");
        // $(".section06 .slick-active-m").next().next().find("img").css("transform-origin", "left center");

        $('.section06 .slide_set .slick-slide').removeClass('slick-active-m-prev-prev slick-active-m-next-next');
        $('.section06 .slide_set .slick-active-m').prev().prev().addClass('slick-active-m-prev-prev');
        $('.section06 .slide_set .slick-active-m').next().next().addClass('slick-active-m-next-next');
      });

    gallerySlideInit();

    $('.section07 .img_slide').slick({
      slidesToShow: 1,
      fade: true,
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
    });

    $('.section_tab .tab_menu li .tab').on('click', function () {
      let idx = $(this).parent().index();
      $('.section_tab .tab_list ul').removeClass('show');
      $('.section_tab .tab_list ul').eq(idx).addClass('show');
    });

    $('.section_tab .tab_list .head button').on('click', function () {
      $(this).parent().toggleClass('show');
    });

    $('.img_list li').on('click', function (e) {
      const no = Number($(this).index()) + 1;

      $('.popup_ring').attr('data-num', no).addClass('show');
    });
    $('.popup_ring').on('click', function (e) {
      $('.popup_ring').removeClass('show');
    });

    //GA Event 諛붿씤��
    bindBtnGAEvent();

    $(window)
      .on('scroll', function () {
        scrollDetect();
      })
      .trigger('scroll');

    $(window)
      .on('resize', function () {
        syncBrowserHeight();
        scrollDetect();

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          syncBrowserHeight();
        }, 500);
        //s.refresh();
      })
      .trigger('resize');

    setTimeout(function () {
      syncBrowserHeight();
    }, 500);
    setTimeout(function () {
      syncBrowserHeight();
    }, 1000);
    setTimeout(function () {
      syncBrowserHeight();
    }, 1500);
  };

  const autoMove = function () {
    clearTimeout(visualSliderTimer);
    visualSliderTimer = setTimeout(function () {
      moveNext();
      autoMove();
    }, 4000);
  };

  const moveNext = function () {
    if (visualSliderIng) return;

    visualSliderIng = true;
    clearTimeout(visualSliderTimer);

    $('.box_right').removeClass('right').addClass('left');
    let leftAddNo = Number($('.thumb_left .thumb_list li:first-child').attr('data-people'));
    let centerNo = Number($('.thumb_left .thumb_list li:last-child').attr('data-people'));
    let rightAddNo = Number($('.thumb_right .thumb_list li:first-child').attr('data-people'));

    if (leftAddNo < 17) {
      leftAddNo++;
    } else {
      leftAddNo = 1;
    }

    $('.thumb_left .thumb_list').prepend(`<li data-people="${leftAddNo}"></li>`);
    //
    setTimeout(function () {
      $('.thumb_left .thumb_list li:first-child').addClass('ext');
      setTimeout(function () {
        $('.thumb_left .thumb_list li:first-child').addClass('show');
      }, 100);
    }, 15);
    setTimeout(function () {
      $('.thumb_left .thumb_list li:last-child').removeClass('show');
      setTimeout(function () {
        $('.thumb_left .thumb_list li:last-child').remove();
        visualSliderIng = false;
      }, 500);
    }, 100);

    let prevNo = centerNo - 1;
    if (prevNo < 1) {
      prevNo = 17;
    }

    TweenMax.set($(`.portrait_set li:nth-child(${prevNo})`), { zIndex: 2 });
    TweenMax.set($(`.portrait_set li:nth-child(${centerNo})`), { zIndex: 3, autoAlpha: 0, scale: 1.2 });
    TweenMax.to($(`.portrait_set li:nth-child(${centerNo})`), 1, { autoAlpha: 1, scale: 1 });
    TweenMax.to($(`.portrait_set li:nth-child(${prevNo})`), 0.1, { delay: 1, zIndex: 1 });
    //TweenMax.to($(`.portrait_set li:nth-child(${prevNo})`), 1, {autoAlpha: 0});
    $('.people_pagination').attr('data-people', centerNo);

    if (rightAddNo < 17) {
      rightAddNo++;
    } else {
      rightAddNo = 1;
    }

    $('.thumb_right .thumb_list').prepend(`<li data-people="${rightAddNo}"></li>`);

    setTimeout(function () {
      $('.thumb_right .thumb_list li:first-child').addClass('ext');
      setTimeout(function () {
        $('.thumb_right .thumb_list li:first-child').addClass('show');
      }, 100);
    }, 15);
    setTimeout(function () {
      $('.thumb_right .thumb_list li:last-child').removeClass('show');
      setTimeout(function () {
        $('.thumb_right .thumb_list li:last-child').remove();
      }, 500);
    }, 100);
  };
  const movePrev = function () {
    if (visualSliderIng) return;

    visualSliderIng = true;
    clearTimeout(visualSliderTimer);

    $('.box_right').removeClass('left').addClass('right');

    let leftAddNo = Number($('.thumb_left .thumb_list li:last-child').attr('data-people'));
    let centerNo = Number($('.thumb_right .thumb_list li:first-child').attr('data-people'));
    let rightAddNo = Number($('.thumb_right .thumb_list li:last-child').attr('data-people'));

    if (leftAddNo === 1) {
      leftAddNo = 17;
    } else {
      leftAddNo--;
    }

    $('.thumb_left .thumb_list').append(`<li data-people="${leftAddNo}"></li>`);
    //
    setTimeout(function () {
      $('.thumb_left .thumb_list li:last-child').addClass('ext');
      setTimeout(function () {
        $('.thumb_left .thumb_list li:last-child').addClass('show');
      }, 100);
    }, 15);
    setTimeout(function () {
      $('.thumb_left .thumb_list li:first-child').removeClass('show');
      setTimeout(function () {
        $('.thumb_left .thumb_list li:first-child').remove();
        visualSliderIng = false;
      }, 500);
    }, 100);

    let prevNo = centerNo + 1;
    if (prevNo > 17) {
      prevNo = 1;
    }

    TweenMax.set($(`.portrait_set li:nth-child(${prevNo})`), { zIndex: 2 });
    TweenMax.set($(`.portrait_set li:nth-child(${centerNo})`), { zIndex: 3, autoAlpha: 0, scale: 1.2 });
    TweenMax.to($(`.portrait_set li:nth-child(${centerNo})`), 1, { autoAlpha: 1, scale: 1 });
    TweenMax.to($(`.portrait_set li:nth-child(${prevNo})`), 0.1, { delay: 1, zIndex: 1 });
    $('.people_pagination').attr('data-people', centerNo);

    if (rightAddNo > 1) {
      rightAddNo--;
    } else {
      rightAddNo = 17;
    }

    $('.thumb_right .thumb_list').append(`<li data-people="${rightAddNo}"></li>`);

    setTimeout(function () {
      $('.thumb_right .thumb_list li:last-child').addClass('ext');
      setTimeout(function () {
        $('.thumb_right .thumb_list li:last-child').addClass('show');
      }, 100);
    }, 15);
    setTimeout(function () {
      $('.thumb_right .thumb_list li:first-child').removeClass('show');
      setTimeout(function () {
        $('.thumb_right .thumb_list li:first-child').remove();
      }, 500);
    }, 100);
  };

  const photoZoom = function () {
    $('.section02 .gallery_set .box').on('click', function (e) {
      const popName = $(this).attr('data-pop');
      const info = $(this).find('.photo').get(0).getBoundingClientRect();

      const w = info.width;
      const h = info.height;
      const top = info.top;
      const left = info.left;

      const bgCss = $(this).find('.photo').css('background');
      const bgImageUrl = $(this).find('.photo').attr('data-pop-bg');

      const dummy = document.createElement('div');
      dummy.style.position = 'fixed';
      dummy.style.width = w + 'px';
      dummy.style.height = h + 'px';
      dummy.style.top = top + 'px';
      dummy.style.left = left + 'px';
      dummy.style.zIndex = '99';
      dummy.style.opacity = '0';
      dummy.style.background = `url(${bgImageUrl}) no-repeat center top`;
      dummy.style.backgroundSize = 'cover';

      pageBlur.on();

      $('.gallery_set').append(dummy);
      $(dummy).animate(
        {
          opacity: 1,
          top: 0,
          left: 0,
          width: $('.popup_wrap .left:eq(0)').width(),
          height: $('.popup_wrap .left:eq(0)').height(),
        },
        600
      );

      $('.popup_inner .right').scrollTop(0);

      //$(`.${popName} .img_slide`).slick('slickPlay');

      setTimeout(function () {
        $(`.${popName}`).addClass('show');
      }, 600);

      setTimeout(function () {
        $(dummy).remove();
      }, 900);
    });

    $('.btn_pop_close, .btn_pop_back').on('click', function (e) {
      $('.popup').removeClass('show');

      //$(this).closest(".popup_wrap").find(".img_slide").slick('slickPause');

      setTimeout(function () {
        pageBlur.off();
      }, 300);
    });

    $('.popup_inner .right').on('scroll', function (e) {
      let pScTop = $(this).scrollTop();
      let pH = $(this).outerHeight();
      let pScTopH = pScTop + pH;
      let pInnerH = $(this).find('ul').outerHeight();
      //console.log(pScTop, $(this).find("ul").outerHeight());
      if (pScTopH > pInnerH * 0.95) {
        $(this).addClass('end');
      } else {
        $(this).removeClass('end');
      }
    });
  };

  const gallerySlideInit = function () {
    // $('.popup .img_slide').each(function(i, o){
    // 	$(o).slick({
    // 		slidesToShow: 1,
    // 		arrows: true,
    // 		dots: true,
    // 		centerMode: true,
    // 		variableWidth: true,
    // 		infinite: true,
    // 		autoplay: false,
    // 		autoplaySpeed: 5000,
    // 		appendDots: $(o).parent().find(".pagination"),
    // 		prevArrow: $(o).parent().find(".slide_prev"),
    // 		nextArrow: $(o).parent().find(".slide_next"),
    // 		pauseOnFocus: false,
    // 		pauseOnHover: false,
    // 	});
    // });
  };
  const bindBtnGAEvent = function () {
    //濡쒓퀬 踰꾪듉
    $('.logo_set a').on('click', function (e) {
      GAAction('cam_home_click', $(this), null);
    });

    //�ㅽ떚��
    $('.btn_sticky').on('click', function (e) {
      var data = {};
      data.text = '�좊땲�명봽 �� �⑸쪟�섍퀬 諛섏� 諛쏄린';
      data.location = 'sticky';
      data.donation_type = '�뺢린�꾩썝';
      data.data_collect_trackcode = '';
      GAAction('cam_donate_button_click', $(this), data);
    });

    //CTA BTN
    $('.section04 .btn_cta_ring').on('click', function (e) {
      var data = {};
      data.text = '�뺢린�꾩썝�섍퀬 諛섏� 諛쏄린';
      data.location = 'sec04';
      data.donation_type = '�뺢린�꾩썝';
      data.data_collect_trackcode = '';
      GAAction('cam_donate_button_click', $(this), data);
    });
    //CTA �쇱떆 BTN
    $('.section05 .btn').on('click', function (e) {
      var data = {};
      data.text = '�⑦궎吏� �좊Ъ�섍퀬 諛섏� 諛쏄린';
      data.location = 'sec05';
      data.donation_type = '�쇱떆�꾩썝';
      data.data_collect_trackcode = '';
      GAAction('cam_donate_button_click', $(this), data);
    });
    //CTA BTN
    $('.section_cta .btn_cta').on('click', function (e) {
      var data = {};
      data.text = '�좊땲�명봽 �� 諛섏��� �④폁 �대┛�� 吏��ㅺ린';
      data.location = 'sec_cta';
      data.donation_type = '�뺢린�꾩썝';
      data.data_collect_trackcode = '';
      GAAction('cam_donate_button_click', $(this), data);
    });

    //sec02
    $('.gallery_set .box_set .box').on('click', function (e) {
      var data = {};
      data.text = $(this).attr('data-pop');
      data.tp = '';
      data.page = $(this).attr('data-pop');
      GAAction('content_detail_click', $(this), data);
    });

    //媛ㅻ윭由� �щ씪�대뱶 踰꾪듉
    $('.popup_wrap .slide_prev, .popup_wrap .slide_next').on('click', function (e) {
      var data = {};
      data.data_collect_slot = 'gallery_' + $(this).closest('.slide_set').attr('data-slide-name');
      if ($(this).hasClass('slick_prev')) {
        data.arrow_type = 'prev';
      } else {
        data.arrow_type = 'next';
      }

      data.button_type = `slick_slide0${$(this).closest('.slide_set').find('.slick-current').attr('data-slick-index')}`;
      GAAction('slick_click', $(this), data);
    });

    $('.section03 .ctrl_set .slick-dots button, .section06 .ctrl_set .slick-dots button').on('click', function (e) {
      var data = {};
      data.data_collect_slot = $(this).closest('section').attr('id');
      data.arrow_type = $(this).text();
      data.button_type = $(this).attr('aria-controls');
      GAAction('slick_click', $(this), data);
    });

    $('.section03 .slick-arrow, .section06 .slick-arrow').on('click', function (e) {
      console.log($(this).closest('section').find('.slick-current'));
      var data = {};
      data.data_collect_slot = $(this).closest('section').attr('id');
      data.arrow_type = $(this).hasClass('slide_next') ? 'next' : 'prev';
      data.button_type =
        'slide' + (Number($(this).closest('section').find('.slick-current').attr('data-slick-index')) + 1);
      GAAction('slick_click', $(this), data);
    });

    //Tab
    $(".tab_menu input[type='radio']").on('click', function (e) {
      var data = {};
      data.tab_label = $(this).next().text();
      GAAction('tab_menu', $(this), data);
    });

    //Tab List
    $('.tab_list .head button').on('click', function (e) {
      var data = {};
      data.tab_click_text = $(this).text();
      data.tab_class = 'head';
      GAAction('tab_list', $(this), data);
    });
  };

  /**
   * �몃옓肄붾뱶 �앹꽦 (url �먯꽌 媛��몄삤湲�)
   */
  const makeTrackcode = function () {
    //"Trackcode紐� 媛��대뱶 (*�좊땲�명봽 �앹꽦)
    //{solicitcodename}_{medium}_{source}"

    const searchParams = new URLSearchParams(location.search);
    const utms = ['', ''];
    for (const param of searchParams) {
      if (param[0].toLowerCase() == 'trackcode') {
        trackcode = param[1];
      } else if (param[0].toLowerCase() == 'utm_medium') {
        utms[0] = param[1];
      } else if (param[0].toLowerCase() == 'utm_source') {
        utms[1] = param[1];
      }
    }

    //trackcode += (utms[0] != "") ? `_${utms[0]}` : '';
    //trackcode += (utms[1] != "") ? `_${utms[1]}` : '';
  };

  var scrollDetect = function () {
    scTop = $(window).scrollTop();
    scTopH = scTop + wH;
    var scTop10 = scTop + Math.round($(window).height() * 0.1);
    var scTop15 = scTop + Math.round($(window).height() * 0.15);
    var scTop30 = scTop + Math.round($(window).height() * 0.3);
    var scTopHalf = scTop + Math.round($(window).height() * 0.3);
    var scTopMid = scTop + Math.round($(window).height() * 0.5);
    var scTopMid2 = scTop + Math.round($(window).height() * 0.6);
    var scTopUnder = scTop + Math.round($(window).height() * 0.7);
    var scTop80 = scTop + Math.round($(window).height() * 0.8);

    detectFixedColor(scTop, scTopMid2);

    // if(scTopMid2 > eleSize.sec02Gallery.top){
    // 	$sec02Gallery.addClass("show");
    //}
    if (scTopH > eleSize.sec02GalleryBox01.top) {
      clearTimeout(galleryBoxTimer.box01);
      galleryBoxTimer.box01 = setTimeout(() => $sec02GalleryBox01.addClass('show'), galleryBoxTimer.delay);
    } else {
      $sec02GalleryBox01.removeClass('show');
    }
    if (scTopH > eleSize.sec02GalleryBox02.top) {
      clearTimeout(galleryBoxTimer.box02);
      galleryBoxTimer.box02 = setTimeout(() => $sec02GalleryBox02.addClass('show'), galleryBoxTimer.delay);
    } else {
      $sec02GalleryBox02.removeClass('show');
    }
    if (scTopH > eleSize.sec02GalleryBox03.top) {
      clearTimeout(galleryBoxTimer.box03);
      galleryBoxTimer.box03 = setTimeout(() => $sec02GalleryBox03.addClass('show'), galleryBoxTimer.delay);
    } else {
      $sec02GalleryBox03.removeClass('show');
    }
    if (scTopH > eleSize.sec02GalleryBox04.top) {
      clearTimeout(galleryBoxTimer.box04);
      galleryBoxTimer.box04 = setTimeout(() => $sec02GalleryBox04.addClass('show'), galleryBoxTimer.delay);
    } else {
      $sec02GalleryBox04.removeClass('show');
    }
    if (scTopH > eleSize.sec02GalleryBox05.top) {
      clearTimeout(galleryBoxTimer.box05);
      galleryBoxTimer.box05 = setTimeout(() => $sec02GalleryBox05.addClass('show'), galleryBoxTimer.delay);
    } else {
      $sec02GalleryBox05.removeClass('show');
    }

    if (scTopMid2 > eleSize.sec03.top) {
      if (!slideStatus.s03Start) {
        slideStatus.s03Start = true;
        $('.section03 .slide_set').slick('slickPlay');
      }
    }
    if (scTopMid2 > eleSize.sec06.top) {
      if (!slideStatus.s06Start) {
        slideStatus.s06Start = true;
        $('.section06 .slide_set').slick('slickPlay');
      }
    }

    //Video 1
    if (player_ready1) {
      if (scTopH < eleSize.secVideo.top) {
        if (player1.getPlayerState() == YT.PlayerState.PLAYING) {
          player1.pauseVideo();
        }
      } else if (scTopH >= eleSize.secVideo.top && scTop < eleSize.secVideo.topH()) {
        if (
          player1.getPlayerState() == YT.PlayerState.UNSTARTED ||
          player1.getPlayerState() == YT.PlayerState.PAUSED ||
          player1.getPlayerState() == YT.PlayerState.CUED
        ) {
          player1.playVideo();
        }
      } else if (scTop >= eleSize.secVideo.topH()) {
        if (player1.getPlayerState() == YT.PlayerState.PLAYING) {
          player1.pauseVideo();
        }
      }
    }
  };

  //detect color for fixed element
  var detectFixedColor = function (scTop, scTopMid2) {
    var logo_pos = $fixedLogo.offset().top + Math.round($fixedLogo.height() / 2);
    var sticky_pos = $fixedSticky.offset().top + Math.round($fixedSticky.outerHeight() / 1);

    //logo
    if (logo_pos < eleSize.sec04.top) {
      colorChange.white('logo');
    } else if (logo_pos >= eleSize.sec04.top && logo_pos < eleSize.secCTA.top) {
      colorChange.sky('logo');
    } else if (logo_pos >= eleSize.sec04.top && logo_pos < eleSize.secTab.top) {
      colorChange.white('logo');
    } else if (logo_pos >= eleSize.secTab.top) {
      colorChange.sky('logo');
    }
  };

  //change color for fixed elements
  var colorChange = {
    white: function (target) {
      if (target == 'logo') {
        $fixedLogo.removeClass('sky').addClass('wh');
      } else if (target == 'sticky') {
        $('.sticky_btn').removeClass('sky').addClass('show wh');
      }
    },
    sky: function (target) {
      if (target == 'logo') {
        $fixedLogo.removeClass('wh').addClass('sky');
      } else if (target == 'sticky') {
        $('.sticky_btn').removeClass('wh').addClass('show sky');
      }
    },
    hide: function (target) {
      if (target == 'logo') {
        $('.logo_set').removeClass('hide');
      } else if (target == 'txt') {
        $fixedText.removeClass('hide');
      } else if (target == 'htxt') {
        $fixedHText.removeClass('show');
      } else if (target == 'page') {
        $fixedPage.removeClass('show');
      } else if (target == 'sticky') {
        $fixedSticky.removeClass('show');
      } else if (target == 'scroll') {
        $fixedScrolDown.removeClass('show');
      }
    },
    show: function (target) {
      if (target == 'sticky') {
        $fixedSticky.addClass('show');
      } else if (target == 'txt') {
        $fixedText.addClass('show');
      } else if (target == 'htxt') {
        $fixedHText.addClass('show');
      } else if (target == 'page') {
        $fixedPage.addClass('show');
      } else if (target == 'scroll') {
        $fixedScrolDown.addClass('show');
      }
    },
  };

  //YouTube init
  var videoTimer;
  var videoInit = function () {
    if (!YTLoad) {
      clearTimeout(videoTimer);
      videoTimer = setTimeout(function () {
        videoInit();
      }, 500);
      return;
    }
    player1 = new YT.Player('video_player1', {
      width: '100%',
      height: '100%',
      playerVars: {
        showinfo: 0,
        loop: 1,
        autohide: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        disablekb: 1,
        ecver: 2,
        enablejsapi: 1,
        mute: 1,
        playsinline: 1,
        autoplay: 0,
      },
      videoId: videoId.player1,
      events: {
        onReady: function () {
          player_ready1 = true;
          $('.btn_mute.video_player1').addClass('show');
        },
        onStateChange: onPlayerStateChange,
        onError: function (ev) {
          console.log(ev);
        },
      },
    });
  };

  var isFirstStart = false;

  let playTimer;
  const playCheckPoint = {
    10: false,
    25: false,
    50: false,
    75: false,
    100: false,
  };
  const videoStatusCheck = function () {
    clearTimeout(playTimer);
    playTimer = setTimeout(function () {
      if (player_ready1) {
        if (player1.getPlayerState() == YT.PlayerState.PLAYING) {
          Object.keys(playCheckPoint).forEach(function (ele, i) {
            var p = Math.round((player1.getCurrentTime() / player1.playerInfo.duration) * 100);
            if (p == ele) {
              if (!playCheckPoint[ele]) {
                playCheckPoint[ele] = true;
                var evName = p == 100 ? 'video_complete' : 'video_progress';
                GAAction(evName, player1, null);
              }
            }
          });
        }
      }
      videoStatusCheck();
    }, 500);
  };

  var onPlayerStateChange = function (s) {
    switch (s.data) {
      case -1: // unstarted
        return;
      case 0: // ended
        s.target.seekTo(0, true);

        //progress flag init
        Object.keys(playCheckPoint).forEach((k) => {
          playCheckPoint[k] = false;
        });

        return;
      case 1: // playing
        var id = s.target.getIframe().id;
        if (s.target.isMuted()) {
          $('.btn_mute.' + id).removeClass('on');
        } else {
          $('.btn_mute.' + id).addClass('on');
        }

        //start Event
        GAAction('video_start', player1, null);

        return;
      case 2: // paused
        var id = s.target.getIframe().id;
        if (s.target.isMuted()) {
          $('.btn_mute.' + id).removeClass('on');
        } else {
          $('.btn_mute.' + id).addClass('on');
        }

        return;
      case 3: // buffering
        return;
      case 5: // video cued
        return;
    }
  };

  var pageBlur = {
    on: function () {
      $('html').addClass('noScroll');
      //$(".wrap").addClass("blur");
      const scrollBarWidth = getScrollbarWidth();
      //$("body").css("padding-right",  `${scrollBarWidth}px`);
      //$(".btn_sticky").css("right", (Number($(".btn_sticky").css("right").replace("px", "")) + scrollBarWidth)+"px");
    },
    off: function () {
      $('html').removeClass('noScroll');
      //$("body").attr("style", "");
      const scrollBarWidth = getScrollbarWidth();
      //$(".btn_sticky").css("right", (Number($(".btn_sticky").css("right").replace("px", "")) - scrollBarWidth)+"px");
      //$(".wrap").removeClass("blur");
    },
  };

  //�ㅼ젣 �ㅽ겕濡ㅻ컮 �볦씠 援ы븯湲�
  var getScrollbarWidth = function () {
    // Creating invisible container
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    var inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  };

  var msieVersion = function () {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      // If Internet Explorer, return version number
      //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
      return true;
    } // If another browser, return 0
    else {
      return false;
    }
  };

  /**
   *
   * @constructor
   */
  const GAAction = function (event_name, $obj, data) {
    if (event_name == 'cam_home_click') {
      window.dataLayer.push({
        event: 'cam_home_click',
        click_url: $obj.attr('href'),
        data_collect_trackcode: getTrackcodeByUrl($obj.attr('href')),
      });
    } else if (event_name == 'cam_donate_button_click') {
      /*
			- data_collect_slot
				CTA踰꾪듉 class媛� 媛��대뱶
				cta_btn_{location}_{color}_{type]
				-location : section number (ex_ sticky, sec01,sec02��.)
				-color : button box color (ex, wh, sky, red��.)
				-type : type (ex, direct,indirect, age, goods��)
			- cam_donation_type
				�앸챸�� 援ы븯�� �좊Ъ�� 寃쎌슦,
				�대┃ url �곸쓽 �곹뭹踰덊샇 �ъ슜
				�덉떆)
				https://www.unicef.or.kr/involve/individual/ig/0000978?trackcode=23ig_pc_recipe&solicitcode=CM23D

			 */
      var data_collect_slot = `cta_btn_${data.location}`;
      data_collect_slot += data.color ? `_${data.color}` : '';
      data_collect_slot += data.tp ? `_${data.tp}` : '';
      var cam_donation_type = data.donation_type ?? '';
      window.dataLayer.push({
        event: 'cam_donate_button_click',
        click_value: data.text,
        data_collect_slot: data_collect_slot,
        cam_donation_type: cam_donation_type,
        data_collect_trackcode: getTrackcodeByUrl($obj.attr('href')),
      });
    } else if (event_name == 'video_start' || event_name == 'video_progress' || event_name == 'video_complete') {
      /**
       * video_current_time	�꾩옱 �ъ깮 �쒖젏	0
       * video_duration	�곸긽 珥� 湲몄씠	30
       * video_percent	�ъ깮 %	0
       * video_provider	�곸긽 �쒓났 �뚮옯��	YouTube
       * video_title	�곸긽 �쒕ぉ	�� �좊Ъ �덉뿉�� �대뼡 寃껋씠 �닿꺼�덉쓣源뚯슂?
       * video_url	�곸긽 URL	https://www.youtube.com/unicefgift
       * visible	Visibility (Boolean)	O
       */
      window.dataLayer.push({
        event: event_name,
        video_current_time: $obj.getCurrentTime(),
        video_duration: $obj.playerInfo.duration,
        video_percent: `${Math.round(($obj.getCurrentTime() / $obj.playerInfo.duration) * 100)}%`,
        video_provider: 'YouTube',
        video_title: $obj.videoTitle,
        video_url: $obj.playerInfo.videoUrl,
        visible: 'O',
      });
    } else if (event_name == 'content_detail_click') {
      /*
			data_collect_slot
				�곗씠�� �섏쭛 �섎뒗 �곸뿭
				�대┃ �곸뿭 {class紐�} "	btn_link_1

				Class 媛��대뱶
					- class : 肄섑뀗痢좊� ���쒗븯�� 媛믪쑝濡� �ъ슜
				        ex) baby, infant, children��...
					- data_page: �꾩옱泥섎읆 �쒖꽌��濡� 踰덊샇 �ъ슜
			 */
      window.dataLayer.push({
        event: event_name,
        button_value: data.text,
        data_collect_slot: `btn_${data.tp}_${data.page}`,
      });
    } else if (event_name == 'slick_click') {
      /*
			data_collect_slot	"�곗씠�� �섏쭛 �섎뒗 �곸뿭 {class紐�} "	section_visual
			button_type	�대┃�곸뿭 {aira-controls} 紐�	slick_slide00	slick_click 踰꾪듉�� type�� �곕씪�� ����
			arrow_type	�대┃�곸뿭 {class紐�}	prev / next
			 */
      window.dataLayer.push({
        event: event_name,
        data_collect_slot: data.data_collect_slot,
        button_type: data.button_type,
        arrow_type: data.arrow_type,
      });
    }
  };
  const getTrackcodeByUrl = function (url) {
    const u = new URL(url);
    const uParam = u.searchParams;
    const trackcode = uParam.get('trackcode');

    return trackcode ?? '';
  };

  return {
    init: init,
    logger: logger,
    syncBrowserHeight: syncBrowserHeight,
    moveNext: moveNext,
    movePrev: movePrev,
  };
})();

$(function () {
  window.dataLayer = window.dataLayer || [];
  main.init();
  main.logger.on();
});

$.fn.shuffle = function () {
  var allElems = this.get(),
    getRandom = function (max) {
      return Math.floor(Math.random() * max);
    },
    shuffled = $.map(allElems, function () {
      var random = getRandom(allElems.length),
        randEl = $(allElems[random]).clone(true)[0];
      allElems.splice(random, 1);
      return randEl;
    });

  this.each(function (i) {
    $(this).replaceWith($(shuffled[i]));
  });

  return $(shuffled);
};
