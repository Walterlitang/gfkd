function enterEffects2(){
	var sWSon = document.documentElement.clientWidth;
	if(sWSon >= 992){
		$(".effect").each(function(index, element) {
			var e = $(this),c = $('.body_b').height();
			if( 0 >= $(e).offset().top - 0.9 * c){
				$(e).addClass("isView");
			}else{
				$(e).removeClass("isView");
			}
		});
		$('.q_lazyload').each(function(){
			var e = $(this);
			var c = $(window).height();
			if( !$(this).attr('src') ){
				if( $(window).scrollTop() >= e.offset().top - 2 * c ){
					e.attr('src', e.attr('data-src'));
				}
			}
		});
	
	}
}
$(function() {
	$(".body_home").addClass("showdiv");
	setTimeout(function() { $(".body_home").addClass("s"); }, 500);
});
$(".bb").click(function() {
	$(".body_b").addClass("showdiv");
	setTimeout(function() { $(".body_home").removeClass("showdiv"); }, 500);
	$(".header").addClass("currents");
	setTimeout(function() { enterEffects2(); }, 500);
})
$(".body_b").scrollTop(0);
$(".body_home").mousewheel(function(event, delta, deltaX, deltaY) {
	if(delta < 0){
		$(".bb").click();
		setTimeout(function(){ enterEffects2();}, 500);
	}
});
var sw_k = 1;
document.onkeydown = function(event) {
	// 判断键盘按下的键是否为回车键、空格键或右键
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if ((e.keyCode == 40 || e.keyCode == 34) && $(".body_home").hasClass("showdiv")) {
		// 如果按下的是回车键、空格键或右键，则设置sw_k为0，点击body_b，并将body_b的scrollTop设置为0，并将body_b的focus设置为body_b的最前面
		sw_k = 0;
		$(".bb").click();
		$(".body_b").animate({ scrollTop: 0 }, 10);
		$(".body_b").focus();
		setTimeout(function() { sw_k = 1; }, 1000);
	}
	// 判断键盘按下的键是否为上键、下键
	if ((e.keyCode == 38 || e.keyCode == 33) && $(".body_b").hasClass("showdiv") && $(".body_b").scrollTop() == 0) {
		// 如果按下的是上键、下键，则设置sw_k为0，将body_home的showdiv类添加，并将body_b的showdiv类移除，并将header的currents类移除
		sw_k = 0;
		$(".body_home").addClass("showdiv").focus();
		$(".body_b").removeClass("showdiv");
		if ($(".body_b").css("position") == "fixed") $(".header").removeClass("currents");
		setTimeout(function() { sw_k = 1; }, 1000);
	}
	setTimeout(function() { enterEffects2(); }, 500);
	// enterEffects2()
}


// 触屏滑动
var startX, startY, moveEndX, moveEndY, X, Y;
$(".body_home").on("touchstart", function(e) {
	startX = e.originalEvent.changedTouches[0].pageX,
	startY = e.originalEvent.changedTouches[0].pageY;
});
$(".body_home").on("touchend", function(e) {
	moveEndX = e.originalEvent.changedTouches[0].pageX,
	moveEndY = e.originalEvent.changedTouches[0].pageY,
	X = startX - moveEndX ,
	Y = startY - moveEndY ;
	if (Y > 0 && Math.abs(Y) > Math.abs(X) && $(".body_home").hasClass("showdiv")) {
		$(".bb").click();
	}
});
$(".body_b").on("touchstart", function(e) {
	startX = e.originalEvent.changedTouches[0].pageX,
	startY = e.originalEvent.changedTouches[0].pageY;
});
$(".body_b").on("touchend", function(e) {
	moveEndX = e.originalEvent.changedTouches[0].pageX,
	moveEndY = e.originalEvent.changedTouches[0].pageY,
	X = startX - moveEndX ,
	Y = startY - moveEndY ;
	if (Y < 0 && Math.abs(Y) > Math.abs(X) && $(".body_b").hasClass("showdiv") && $(".body_b").scrollTop() == 0) {
		$(".body_home").addClass("showdiv").focus();
		$(".body_b").removeClass("showdiv");
		if ($(".body_b").css("position") == "fixed") $(".header").removeClass("currents");
	}
});


// $(window).scroll(function() {
// 	if ($(window).width() <= 850) {
// 		if ($(window).scrollTop() < 50) {
// 			$(".header").removeClass("currents")
// 		} else {
// 			$(".header").addClass("currents")
// 		}
// 	}
// 	enterEffects2()
// 	// lazyload();
// });
$('.body_b').scroll(function() {
	if ($(window).width() <= 850) {
		if ($('.body_b').scrollTop() < 50) {
			$(".header").removeClass("currents")
		} else {
			$(".header").addClass("currents")
		}
	}
	enterEffects2()
	// lazyload();
});
$(".body_b").mousewheel(function(event, delta, deltaX, deltaY) {
	if (delta > 0 && $(".body_b").scrollTop() == 0) {
		$(".body_home").addClass("showdiv");
		$(".body_b").removeClass("showdiv");
		if ($(".body_b").css("position") == "fixed") $(".header").removeClass("currents");
	}
	if (deltaY > 0) {
		$(".fixedNav").removeClass("lit");
	}
	if (deltaY < 0) {
		$(".fixedNav").addClass("lit");
	}
	enterEffects2()
	// lazyload();
});
$('.gp-goTop').click(function () {
	$('.body_b').stop().animate({
		scrollTop: 0
	});
	return false;
});


$(function () {

	$(".mode02.tab").tab({
		ev: 'mouseover',
		more: false,
		auto: false
	});
	$(".mode03.tab").tab({
		ev: 'mouseover',
		more: false,
		auto: false
	});

	//头图
	var swiperFlag = true;
	var BannerSwiper = new Swiper('.swiper1', {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		// autoplay: false,
		// loop: true,
		effect: 'fade',
		pagination: {
			el: '.banner .swiper-pagination',
			clickable: true,
		},
		touchStartPreventDefault : false,
		touchStartForcePreventDefault : false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		lazy: {
			loadPrevNext: true,
			elementClass: 'swiper-lazy',
			loadOnTransitionStart: true,
		},
		on: {
			slideChange: function (swiper) {
				var _this = $('.swiper1 .swiper-slide').eq(this.activeIndex);
				if (!swiperFlag) {
					swiperFlag = true;
				} else {
					videoSelect(_this);
				}
			}
		}
	})

	videoSelect($('.swiper1 .swiper-slide.swiper-slide-active'));

	function videoSelect(_this) {
		var flag = true;
		var cc = _this.hasClass('ban_video');
		if (cc) {
			BannerSwiper.autoplay.stop();
			var videos = '<video src="' + _this.attr('data-video') + '" autoplay="autoplay" muted class="vv" style="object-fit: cover ;" poster=' + _this.attr('poster-src') + ' playsinline x5-video-player-type="h5" x5-video-orientation="portrait"></video>';
			_this.find('.slick-img').append(videos);
			_this.find('video').bind('ended', function () {
				BannerSwiper.slideNext();
				BannerSwiper.autoplay.start();
			});
		} else {
			$('.vv').remove();
		}
	}

	$('.banner-dots span').click(function () {
		BannerSwiper.autoplay.start();
	})


	$('.index_05 ul').addClass('swiper-wrapper')
	$('.index_05 li').addClass('swiper-slide')
	var index_05 = new Swiper('.index_05', {
		loop: true,
		loopAdditionalSlides: 2,
		slidesPerView: 'auto',
		autoplay: {
			disableOnInteraction: false,
		},
		autoplay: false,
		// allowTouchMove: false,
		mousewheel: true,
		watchSlidesProgress: true,
		speed: 800,
		on: {
			init: function (swiper) {
				// $('.index_05 li').eq(0).addClass('on');
				$('.index_05 li.swiper-slide-active').addClass('on');
			},
		},
	})
	$('.index_05').on('click', '.swiper-slide', function () {
		$('.index_05 li').removeClass('on');
		$(this).addClass('on');
	});


});
