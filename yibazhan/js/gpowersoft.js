// jquery.mousewheel.js
(function ($) {

	var types = ['DOMMouseScroll', 'mousewheel'];

	if ($.event.fixHooks) {
		for (var i = types.length; i;) {
			$.event.fixHooks[types[--i]] = $.event.mouseHooks;
		}
	}

	$.event.special.mousewheel = {
		setup: function () {
			if (this.addEventListener) {
				for (var i = types.length; i;) {
					this.addEventListener(types[--i], handler, false);
				}
			} else {
				this.onmousewheel = handler;
			}
		},

		teardown: function () {
			if (this.removeEventListener) {
				for (var i = types.length; i;) {
					this.removeEventListener(types[--i], handler, false);
				}
			} else {
				this.onmousewheel = null;
			}
		}
	};

	$.fn.extend({
		mousewheel: function (fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},

		unmousewheel: function (fn) {
			return this.unbind("mousewheel", fn);
		}
	});


	function handler(event) {
		var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
		event = $.event.fix(orgEvent);
		event.type = "mousewheel";

		// Old school scrollwheel delta
		if (orgEvent.wheelDelta) { delta = orgEvent.wheelDelta / 120; }
		if (orgEvent.detail) { delta = -orgEvent.detail / 3; }

		// New school multidimensional scroll (touchpads) deltas
		deltaY = delta;

		// Gecko
		if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
			deltaY = 0;
			deltaX = -1 * delta;
		}

		// Webkit
		if (orgEvent.wheelDeltaY !== undefined) { deltaY = orgEvent.wheelDeltaY / 120; }
		if (orgEvent.wheelDeltaX !== undefined) { deltaX = -1 * orgEvent.wheelDeltaX / 120; }

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

})(jQuery);
// jquery.mousewheel.js end


resizefs()
Nav('#nav') //导航
Nav2('#nav2')
mobileMenu('#gp-menu'); //移动端导航
SerMax('#searchBtn5', '#gp-search5');
wechat()

$(document).ready(function () {
	SerMax('#gp-serBtn4,#gp-serBtn4_1', '#gp-search4');
	SerMax('#gp-serBtn44', '#gp-search44');

	if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
		handleFontSize();
	} else {
		if (document.addEventListener) {
		  document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
		} else if (document.attachEvent) {
		  document.attachEvent("WeixinJSBridgeReady", handleFontSize);
		  document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
		}
	}
	function handleFontSize() {
		// 设置网页字体为默认大小
		WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
		// 重写设置网页字体大小的事件
		WeixinJSBridge.on('menu:setfont', function() {
		  WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
		});
	}

	if( $(window).width() > 1020 ){
		NavLevel3()
		$('.level2_list > li').hover(function () {
			NavLevel3()
		});
	}else{
		$('.level2_list .toggle').click(function () {
			var ul = $(this).next('ul');
			// 类似 NavLevel3()，但是不需要判断是否有子菜单，点击展开和收起
			if( $('.level3').hasClass('on') ){
				$('.level3').removeClass('on');
			}else{
				var level3Html = ul.html();
				$('.level3 ul').html(level3Html);
				$('.level3').addClass('on');
			}
		});
	}
});



function wechat() {
	var sWSon = document.documentElement.clientWidth;
	if (sWSon > 1020) {
		$('.ft_link .weChet').hover(function () {
			$(this).parent().find('.wechatList').slideToggle(300)
		})
	} else {
		$('.ft_link .weChet').click(function (event) {
			$(this).parent().find('.wechatList').slideToggle(300);
			//取消事件冒泡 
			event.stopPropagation();
		})
		//点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
		$(document).click(function (event) {
			var _con = $('.ft_link .weChet'); // 设置目标区域
			if (!_con.is(event.target) && _con.has(event.target).length === 0) {
				$(this).parent().find('.wechatList').slideUp(300);
			}
		});
	}
}

/* 国科大导航栏 */
function NavLevel3() {
	if ($('#nav li.on').find('ul').length > 0) {
		var level3Html = $('#nav li.on').find('ul').html();
		$('.level3 ul').html(level3Html);
		$('.level3').addClass('on');
	}else{
		$('.level3').removeClass('on');
	}
}
$('.topMenu').click(function (e) {
	e.preventDefault();
	$('.menuBox').toggleClass('show');
	$(this).parent().toggleClass('on');
	$(this).toggleClass('close');
});
// $('.menuBox .close').click(function (e) {
// 	e.preventDefault();
// 	$('.menuBox').toggleClass('show');
// });
var sidemenu;
$('.menuBox').mouseleave(function () {
	if( $(window).width() > 1020 ){
		var that = this;
	 	sidemenu = setTimeout(function () {
			if ($(that).hasClass('show') && !$(that).is(':hover')) {
				$(that).removeClass('show');
				$('.topNav').removeClass('on');
				$('.topMenu').removeClass('close');
			}
		}, 200);
	}
});
$('.topNav').mouseenter(function () {
	if( $(window).width() > 1020 ){
		clearTimeout(sidemenu);
	}
});


//鼠标跟随,在类名为no-follow情况下不跟随
// var oldx = 0;
// var oldy = 0;
// var prevY = 0;
// var direction = "";
// $(document).mousemove(function (e) {
// 	var follower = $(".follower span");
// 	if ($('.no-follow').length > 0) {
// 		var noFollow = $('.no-follow');
// 		if (noFollow.is(':hover')) {
// 			follower.hide();
// 		} else {
// 			follower.show();
// 		}
// 	}
// 	// clientY
// 	var width = $(window).width();
// 	var height = $(window).height();
// 	var t = e.clientY - (follower.height() / 2);
// 	var l = e.clientX - (follower.width() / 2);

// 	// var t = e.clientY + (follower.height() / 2);
// 	// var l = e.clientX + (follower.width() / 2);

// 	// if (l < width - (follower.width() + 20)) {
// 		setTimeout(function () {
// 			follower.eq(0).css({
// 				'top': t + 'px',
// 				'left': l + 'px'
// 			})
// 		}, 0);
// 		setTimeout(function () {
// 			follower.eq(1).css({
// 				'top': t + 'px',
// 				'left': l + 'px'
// 			})
// 		}, 150);
// 		setTimeout(function () {
// 			follower.eq(2).css({
// 				'top': t + 'px',
// 				'left': l + 'px'
// 			})
// 		}, 300);
// 	// }

// 	// 判断鼠标移动方向
// 	if (e.clientX > oldx) {
// 		// direction = "right";
// 		// $('html').css('cursor', 'url(images/cursor_r.ico),auto');
// 		$('.follower span').css({ 'transform': 'rotateZ(90deg) translate3d(50%,-50%,0)' })
// 	} else if (e.clientX < oldx) {
// 		// direction = "left";
// 		// $('html').css('cursor', 'url(images/cursor_l.ico),auto');
// 		$('.follower span').css({ 'transform': 'rotateZ(-90deg) translate3d(-50%,50%,0)' })
// 	}
// 	if (e.clientY > oldy) {
// 		// $('html').css('cursor', 'url(images/cursor.ico),auto');
// 		$('.follower span').css({ 'transform': 'rotateZ(0deg) translate3d(0%,%,0)' })
// 	}
// 	oldx = e.clientX;
// 	oldy = e.clientY;
// });
// setInterval(function () {
// 	var span0 = $('.follower span').eq(0).css('top');
// 	var span1 = $('.follower span').eq(1).css('top');
// 	if (span0 == span1) {
// 		$('html').css('cursor', '');
// 		$('.follower span').css({
// 			'transform': ''
// 		})
// 	}
// }, 500);
// $('a,.pointer').hover(function () {
// 	// over
// 	$('.follower span').eq(0).addClass('focus')
// 	$('.follower span').eq(1).addClass('hide');
// 	$('.follower span').eq(2).addClass('hide');
// }, function () {
// 	// out
// 	$('.follower span').eq(0).removeClass('focus')
// 	$('.follower span').eq(1).removeClass('hide');
// 	$('.follower span').eq(2).removeClass('hide');
// });


HeaderFix()
if (isTouchDevice()) {
	$('body').removeClass('desktop').addClass('mobile')
	mobileDivSelect()
	$('.footer_link').find('li').click(function () {
		$(this).find('span').fadeToggle(500)
	})
} else {
	$('body').addClass('desktop').removeClass('mobile')
	desktopDivSelect();
	$('.footer_link').find('li').hover(function () {
		$(this).find('span').fadeIn(500)
	}, function () {
		$(this).find('span').fadeOut(500)
	})
}




/*
下拉菜单 
例调用：Nav('#nav');
*/
function Nav(id) {
	var oNav = $(id);
	var aLi = oNav.find('li');
	var aLia = oNav.find('li >a');
	aLi.hover(function () {
		$(this).addClass('on').siblings().removeClass('on');
	}, function () {
		// $(this).removeClass('on');
	})
	aLia.hover(function () {
		$(this).addClass('on').siblings().removeClass('on');
	}, function () {
		// $(this).removeClass('on');
	})
};
function Nav2(id) {
	var oNav = $(id);
	var aLi = oNav.find('li');
	var aLia = oNav.find('li >a');
	aLi.hover(function () {
		$(this).addClass('on').siblings().removeClass('on');
	}, function () {
		$(this).removeClass('on');
	})
	aLia.hover(function () {
		$(this).addClass('on').siblings().removeClass('on');
	}, function () {
		$(this).removeClass('on');
	})
};
/*
搜索点击弹出效果 
例调用：SerMax('#gp-serBtn2','#gp-search2');
*/
function SerMax(id, main, close) {
	var serBtn = $(id);
	var wrapSer = $(main);
	serBtn.click(function () {
		$(this).filter('#gp-serBtn2').fadeOut(300);
		$(this).filter('#gp-serBtn3').toggleClass('active');
		$(this).filter('#gp-serBtn3').toggleClass('icon-sousuo', 'icon-')
		if ($(main).hasClass('no-overlay')) {
			wrapSer.toggleClass('active');
		} else {
			serFun()
		}
		console.log('show')
	})
	$(close).click(function () {
		serFun()
	})

	function serFun() {
		wrapSer.toggleClass('active');
		if ($(wrapSer).hasClass('active')) {
			$('body').addClass('searchActive');
			$('.gp-overlay').fadeIn(300)
		} else {
			wrapSer.removeClass('active');
			$('.gp-overlay').fadeOut(300)
			$('body').removeClass('searchActive');
		}
	}

	//点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
	$(document).click(function (event) {
		console.log('hide')
		var _con1 = serBtn // 设置目标区域
		var _con2 = wrapSer; // 设置目标区域
		if (!_con1.is(event.target) && _con1.has(event.target).length === 0 && !_con2.is(event.target) && _con2.has(event.target).length === 0) {
			if (wrapSer.hasClass('active')) {
				$('.gp-overlay').fadeOut(300)
			}
			wrapSer.removeClass('active')
			$('body').removeClass('searchActive')
			serBtn.delay(300).fadeIn(300);
		}
	});
}


/*
移动端主导航 
例调用：mobileMenu('#gp-menu');
*/
function mobileMenu(id) {
	var oMenu = $(id);
	oMenu.find(".gp-menu-header .gp-menu-header-icon").click(function () {
		oMenu.find(this).toggleClass("gp-menu-header-icon-click gp-menu-header-icon-out");
		$('.mobile_bg').fadeToggle(300)
		oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown1').slideToggle(300); //下拉竖排
		oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown2').slideToggle(300); //下拉横排
		oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown2').find('ul:first').children('li').find('a.iconfont').attr('href', 'javascript:void(0)')
		// oMenu.find(".gp-menu-nav").filter('.gp-menu-offcanvas1').slideToggle(300);//下拉横排
		$('body').toggleClass('open')
	});
	$('.mobile_bg').click(function () {
		oMenu.find('.gp-menu-header-icon').toggleClass("gp-menu-header-icon-click gp-menu-header-icon-out");
		oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown1,.gp-menu-dropdown2').slideToggle(300);
		$(this).fadeToggle(300)
		$('body').removeClass('open');
	})
	// oMenu.find(".gp-menu-nav > ul > li").each(function( index ) {
	//   var len = oMenu.find(".gp-menu-nav > ul > li").length;
	// 	$( this ).css({'transition-delay': (index/len)+0.5+'s'});
	// });
	oMenu.find(".gp-menu-nav li > ul").each(function () {
		var $this = $(this);
		$this.find('li').each(function (index) {
			var len = $this.find('li').length;
			$(this).css({
				'animation-delay': (index / len) + 's'
			});
		})
	});
	oMenu.find('.gp-menu-nav li .gp-menu-arrow').click(function () {
		if ($(this).parent('li').hasClass('on')) {
			$(this).next('ul').slideUp(500)
			$(this).parent('li').removeClass('on')
		} else {
			$(this).next('ul').slideDown(500);
			$(this).parent().siblings().find('ul').slideUp(500)
			$(this).parent().siblings().removeClass('on')
			$(this).parent('li').addClass('on')
		}
	})
	oMenu.find('.gp-menu-nav').filter('.gp-menu-dropdown2').find('a.icon-down').click(function () {
		if ($(this).parent('li').hasClass('on')) {
			$(this).next('ul').slideUp(500)
			$(this).parent('li').removeClass('on')
		} else {
			$(this).next('ul').slideDown(500);
			$(this).parent().siblings().find('ul').slideUp(500)
			$(this).parent().siblings().removeClass('on')
			$(this).parent('li').addClass('on')
		}
	})

}



/*
tab切换
例调用:$(".tab").tab({ev : 'mouseover',more : false,auto : false});
*/
;
(function ($) {
	$.fn.extend({
		tab: function (options) {
			var defaults = { //默认参数
				ev: 'mouseover', //默认事件'mouseover','click'
				delay: 100, //延迟时间
				auto: true, //是否自动切换 true,false
				speed: 2000, //自动切换间隔时间(毫秒)
				more: false //是否有more,false,true
			};
			var options = $.extend(defaults, options); //用户设置参数覆盖默认参数
			return this.each(function () {
				var o = options;
				var obj = $(this);
				var oTil = obj.find('.til_tab');
				var oBox = obj.find('.tabListBox');
				var oMore = null;
				var iNum = 0;
				var iLen = oTil.length;
				obj.find('.til_tab').eq(0).addClass('on')
				obj.find('.tabListBox').eq(0).addClass('on')
				obj.find('.more_tab').eq(0).css('display', 'block')
				//鼠标事件绑定
				oTil.bind(o.ev, function () {
					var _this = this;
					if (o.ev == 'mouseover' && o.delay) {
						_this.timer = setTimeout(function () {
							change(_this);
						}, o.delay);
					} else {
						change(_this);
					};
				})

				oTil.bind('mouseout', function () {
					var _this = this;
					clearTimeout(_this.timer);
				});

				//自动切换效果
				(function autoPlay() {
					var timer2 = null;
					if (o.auto) {
						function play() {
							iNum++;
							if (iNum >= iLen) {
								iNum = 0;
							};
							change(oTil.eq(iNum));
						};
						timer2 = setInterval(play, o.speed);

						obj.on('mouseover', function () {
							clearInterval(timer2);
						})

						obj.on('mouseout', function () {
							timer2 = setInterval(play, o.speed);
						})
					};
				})();

				function change(box) {
					iNum = $(box).index();
					oTil.removeClass('on');
					oBox.removeClass('on');
					if (o.more) {
						oMore = obj.find('.more_tab');
						oMore.css('display', 'none');
						oMore.eq(iNum).css('display', 'block');
					};
					oTil.eq(iNum).addClass('on');
					oBox.eq(iNum).addClass('on');

				}
			});
		},
		tab2: function (options) {
			var defaults = { //默认参数
				ev: 'mouseover', //默认事件'mouseover','click'
				delay: 200, //延迟时间
				auto: true, //是否自动切换 true,false
				speed: 2000, //自动切换间隔时间(毫秒)
				more: false //是否有more,false,true
			};
			var options = $.extend(defaults, options); //用户设置参数覆盖默认参数
			return this.each(function () {
				var o = options;
				var obj = $(this);
				var oTil = obj.find('.til_tab');
				var oBox = obj.find('.tabListBox');
				var oMore = null;
				var iNum = 0;
				var iLen = oTil.length;
				obj.find('.til_tab').eq(0).addClass('on')
				obj.find('.tabListBox').eq(0).addClass('show')
				obj.find('.more_tab').eq(0).css('display', 'block')
				//鼠标事件绑定
				oTil.bind(o.ev, function () {
					var _this = this;
					if (o.ev == 'mouseover' && o.delay) {
						_this.timer = setTimeout(function () {
							change(_this);
						}, o.delay);
					} else {
						change(_this);
					};
				})

				oTil.bind('mouseout', function () {
					var _this = this;
					clearTimeout(_this.timer);
				});

				//自动切换效果
				(function autoPlay() {
					var timer2 = null;
					if (o.auto) {
						function play() {
							iNum++;
							if (iNum >= iLen) {
								iNum = 0;
							};
							change(oTil.eq(iNum));
						};
						timer2 = setInterval(play, o.speed);

						obj.on('mouseover', function () {
							clearInterval(timer2);
						})

						obj.on('mouseout', function () {
							timer2 = setInterval(play, o.speed);
						})
					};
				})();

				function change(box) {
					iNum = $(box).index();
					oTil.removeClass('on');
					oBox.addClass('hide').removeClass('show')
					if (o.more) {
						oMore = obj.find('.more_tab');
						oMore.css('display', 'none');
						oMore.eq(iNum).css('display', 'block');
					};
					oTil.eq(iNum).addClass('on');
					oBox.eq(iNum).addClass('show').removeClass('hide')
					// $('.tabList4').find('.slick-slider').eq(iNum).slick('slickNext',1)
				}
			});
		}
	})
})(jQuery);

/*
返回顶部
*/
// $(window).scroll(function () {
// 	var docHeight = $(document).height()
// 	var winHeight = $(window).height();
// 	var scrollTop = $(window).scrollTop();
// 	if (scrollTop > 200) {
// 		$('.gp-goTop').fadeIn(500)
// 	} else {
// 		$('.gp-goTop').fadeOut(500)
// 	}
// 	if (scrollTop >= docHeight - winHeight) {
// 		$('.gp-goTop-fixed').addClass('bottom')
// 	} else {
// 		$('.gp-goTop-fixed').removeClass('bottom')
// 	}
// })
// // var goTopHtml = '<a href="javascript:void(0)" class="gp-goTop gp-goTop-fixed iconfont icon-zhiding"></a>'
// // $(goTopHtml).insertAfter('footer');
// $('.gp-goTop').click(function () {
// 	$('body,html').stop().animate({
// 		scrollTop: 0
// 	});
// 	return false;
// });

/*
奇数偶数不同的样式
例调用:
odd= {"background":"#fff","color":"#666"};//奇数样式
even={"background":"#f7f7f5","color":"#666"};//偶数样式
单个元素: odd_even('.list',odd,even,'tr'); 
多个元素:
odd= {"background":"#fff","color":"#666"};//奇数样式
even={"background":"#f7f7f5","color":"#666"};//偶数样式
$('.list').each(function(){
	odd_even($(this),odd,even,'tr'); 
 })
*/
function odd_even(id, odd, even, className) {
	$(id).find(className).each(function (index, element) {
		if (index % 2 == 1) {
			$(this).css(odd);
			$(this).addClass('odd');
		} else {
			$(this).css(even);
			$(this).addClass('even');
		}
	});
}

/*
侧边栏三级
例调用: asideMenu('#gp-subLeft')
*/
function asideMenu(menu) {
	//当前状态高亮
	$(menu).find('.active').each(function () {
		if ($(this).parents('dl').hasClass('gp-second-nav')) {
			$(this).parents('dl').css('display', 'block');
			$(this).parents('li').addClass('active')
			$(this).parents('li').find('.gp-toggles').addClass('icon-down').removeClass('icon-a-gong1');
			$(this).parents('.gp-subNavs').css('padding-bottom', '43px')
		}
	})
	$(menu).find('.gp-toggles').click(function () {
		if ($(this).parents('li').hasClass('active')) {
			$(this).addClass('icon-a-gong1').removeClass('icon-down')
			$(this).next('.gp-second-nav').slideUp(500)
			$(this).parents('li').removeClass('active')
			$(this).parents('.gp-subNavs').css('padding-bottom', '0')
		} else {
			$(this).addClass('icon-down').removeClass('icon-a-gong1');
			$(this).next('.gp-second-nav').slideDown(500);
			$(this).parents('li').siblings().find('.gp-second-nav').slideUp(500)
			$(this).parents('li').siblings().removeClass('active')
			$(this).parents('li').siblings().find('.gp-toggles').addClass('icon-a-gong1').removeClass('icon-down')
			$(this).parents('li').addClass('active')
			$(this).parents('.gp-subNavs').css('padding-bottom', '43px')
		}
	})
}


//移动端侧边栏菜单
function mobileAsideMenu(menu, main) {
	$(menu).find('.gp-m-inner-header').click(function () {
		$(this).toggleClass("gp-m-inner-header-icon-click gp-m-inner-header-icon-out");
		$(this).find('.iconfont').toggleClass("icon-up icon-down")
		$(".gp-subNavm").slideToggle(500);

	});
	$('.gp-subNavm').find('.gp-m-toggle').click(function () {
		if ($(this).parents('li').hasClass('active')) {
			$(this).addClass('icon-right').removeClass('icon-down')
			$(this).next('dl').slideUp(500)
			$(this).parents('li').removeClass('active')
		} else {
			$(this).addClass('icon-down').removeClass('icon-right');
			$(this).next('dl').slideDown(500);
			$(this).parents('li').siblings().find('dl').slideUp(500)
			$(this).parents('li').siblings().removeClass('active')
			$(this).parents('li').siblings().find('.gp-m-toggle').addClass('icon-right').removeClass('icon-down')
			$(this).parents('li').addClass('active')
		}
	})
};
//首页头部置顶固定
function HeaderFix() {
	var iWSon = document.documentElement.clientWidth;
	var windowHeight = $(window).height();
	var bannerHeight = windowHeight;
	if ($('.banner').length > 0) {
		bannerHeight = $('.banner').height();
	} else if ($('.subBanner').length > 0) {
		bannerHeight = $('.subBanner').height();
	}
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();
		if (scrollTop >= bannerHeight * 0.5) {
			if (iWSon > 996) {
				$('header,body').addClass('currents');
			} else {
				$('header,body').removeClass('currents');
			}
		} else {
			$('header,body').removeClass('currents');
		}
	})
	$("body").mousewheel(function (event, delta, deltaX, deltaY) {
		if (deltaY > 0) {
			$(".fixedNav").removeClass("lit");
		} else {
			$(".fixedNav").addClass("lit");
		}
	});
}


// $(window).scroll(function () {
// 	$(".effect2").each(function (index, element) {
// 		var e = $(this);
// 		var f = 9;
// 		if (!f && f != 0) {
// 			f = $(window).height() * 6 * 0.1;
// 		} else {
// 			f = $(window).height() * f * 0.1;
// 		}
// 		if ($(window).scrollTop() >= $(e).offset().top - f) {
// 			if (!$(e).hasClass("isView")) {
// 				$(e).addClass("isView");

// 			}
// 		} else {
// 			if ($(e).hasClass("isView")) {
// 				$(e).removeClass("isView");
// 			}
// 		}
// 	});
// });
//点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
$(document).click(function (event) {
	var _con = $('.divSelect'); // 设置目标区域
	if (!_con.is(event.target) && _con.has(event.target).length === 0) {
		//$('#divTop').slideUp('slow');  //滑动消失
		$('.divSelect').find('.linkList02').slideUp(300); //淡出消失
		$('.divSelect').removeClass('active')
	}
});
/*
top置顶
*/
$(window).scroll(function () {
	var docHeight = $(document).height()
	var winHeight = $(window).height();
	var scrollTop = $(window).scrollTop();
	if (scrollTop >= 165) {
		// $('.gp-goTop').stop().fadeIn(500)
		$('.gp-goTop').addClass('show')
	} else {
		// $('.gp-goTop').stop().fadeOut(500)
		$('.gp-goTop').removeClass('show')
	}
	if (scrollTop >= docHeight - winHeight) {
		$('.gp-goTop-fixed').addClass('bottom')
	} else {
		$('.gp-goTop-fixed').removeClass('bottom')
	}
})
$(window).ready(function () {
	var docHeight = $(document).height()
	var winHeight = $(window).height();
	var scrollTop = $(window).scrollTop();
	if (scrollTop >= 165) {
		$('.gp-goTop').addClass('show')
	} else {
		$('.gp-goTop').removeClass('show')
	}
})
// var goTopHtml = '<a href="javascript:void(0)" class="gp-goTop gp-goTop-fixed iconfont icon-up"></a>'
// $(goTopHtml).insertAfter('footer')
$('.gp-goTop').click(function () {
	$('body,html').stop().animate({
		scrollTop: 0
	});
	return false;
});
//banner图片

function isTouchDevice() {
	return 'ontouchstart' in document.documentElement;
}

function desktopDivSelect() {
	$('.divSelect').hover(function (event) {
		//取消事件冒泡 
		$(this).find('ul').stop().slideToggle(300);
		$(this).toggleClass('active');
		return false;
	}, function () {
		$(this).find('ul').stop().slideUp(300);
		$(this).removeClass('active');
		return false;
	});
}

function mobileDivSelect() {
	$('.divSelect').find('cite').click(function (event) {
		//取消事件冒泡 
		event.stopPropagation('active');
		$('.divSelect2').find('ul').slideUp(300);
		$('.divSelect2').removeClass('active');
		if ($(this).parents('.divSelect2').hasClass('active')) {
			$(this).next('ul').slideUp(300);
			$(this).parents('.divSelect2').removeClass('active');
		} else {
			$(this).next('ul').slideDown(300);
			$(this).parents('.divSelect2').addClass('active');
		}
		return false;
	});
}



//点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
$(document).click(function (event) {
	var _con = $('.divSelect'); // 设置目标区域
	if (!_con.is(event.target) && _con.has(event.target).length === 0) {
		//$('#divTop').slideUp('slow');  //滑动消失
		$('.divSelect').find('.linkList02').slideUp(300); //淡出消失
		$('.divSelect').removeClass('active')
	}
});

// 板块进入效果
{setTimeout("enterEffects();","200");
$(document).ready(function(){
	enterEffects();
});
$(window).resize(function(){
	var resizeTimer = null;
	if (resizeTimer)
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){
		enterEffects();
	},50);
});
$(window).scroll(function(){
	enterEffects();
});
// 鼠标滚动渐渐出现
$('.effect11,.effect21,.effect31,.effect41,.effect51,.effectChildren').each(function() {
	$(this).find("li").each(function(index){
		var len = $(this).parent().find("li").length;
		$( this ).css({'transition-delay': (index*0.5/len)+'s'});
		// $( this ).css({'transition-delay': (index*0.05)+'s'});
	})
});
function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
		// deal with browser quirks with body/window/document and page scroll
		var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
		var yScroll = el.scrollTop || document.documentElement.scrollTop;

		xPos += (el.offsetLeft - xScroll + el.clientLeft);
		yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
		// for all other non-BODY elements
		xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}
function enterEffects(){
	var sWSon = document.documentElement.clientWidth;
	if(sWSon >= 992){
		$(".effect").each(function(index, element) {
			var e = $(this);
			var c = $(window).height();
			if( $(window).scrollTop() >= e.offset().top - 0.9 * c ){
				if( !e.hasClass("isView") ){
					e.addClass("animated");
					var x = 0;
					e.find("*").each(function(index, element) {
						$(this).on('webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart', function(){
							x++;
						});
					});
					e.find("*").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						x--;
						if(x == 0){
							e.removeClass("animated");
						}
					});
				}
				e.addClass("isView");
			}else{
				e.removeClass("isView");
			}
		});
	}else{
		$(".effect").each(function(){ $(this).addClass("isView"); })
	}
	$('.q_lazyload').each(function(){
		var e = $(this);
		var c = $(window).height();
		if( !$(this).attr('src') ){
			if( $(window).scrollTop() >= e.offset().top - 2 * c ){
				e.attr('src', e.attr('data-src'));
			}
		}
	});

}}

// $(window).resize(function () {
// 	var resizeTimer = null;
// 	if (resizeTimer) clearTimeout(resizeTimer);
// 	resizeTimer = setTimeout(function () {}, 100);
// })

function directionNav() {
	$('.slick-arrow').each(function (e) {
		var $this = $(this)
		$this.text('');
		$(this).addClass('iconfont')
		if ($this.hasClass('slick-prev')) {
			$(this).addClass('icon-left')
		} else if ($this.hasClass('slick-next')) {
			$(this).addClass('icon-right')
		}
	})
}
var maodian = function (id) {
	var target_top = $("#" + id).offset().top - 60;
	$("html,body").animate({
		scrollTop: target_top
	}, 1000); //带滑动效果的跳转
}

function asideFix() {
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();
		var asideHeight = $(".wrap_subLeft > ul").height()
		var conHeight = $(".subRight").innerHeight();
		var headerHeight = $('.subPage > .gp-container').offset().top
		var footerHeight = $('.wrap_footer').offset().top
		var $ww = $(window).width()
		conHeight2 = (conHeight + headerHeight) - asideHeight;
		// console.log(headerHeight)
		if ($ww > 767) {
			if (asideHeight < conHeight) {
				if (scrollTop < headerHeight) {
					$('.wrap_subLeft').removeClass('fixTop');
				} else {
					$('.wrap_subLeft').addClass('fixTop');
				}
				if (scrollTop > conHeight2) {
					$('.wrap_subLeft').removeClass('fixTop');
					$('.wrap_subLeft').addClass('fixBottom');
				} else {
					$('.wrap_subLeft').removeClass('fixBottom');
				}
			}
		}
		$('.wrap_subLeft').find('li').click(function () {
			$(this).addClass('active').siblings().removeClass('active')
		})
	})
}

function scrollActive(wrap, ele) {
	if ($(wrap).length > 0) {
		$(wrap).find(ele + ' > .active').each(function () {
			var index = $(this).parent(ele).index();
			var thisWidth = $(this).parent(ele)[0].offsetWidth
			var distance = index * thisWidth;
			var left = ($(wrap).scrollLeft() + distance);

			$(wrap).scrollLeft(left)
		})
	}
}
if ($('.gp-subLeft').length > 0) {
	scrollActive('.gp-subLeft', 'li')
}
// scrollActive('.gp-subLeft','li')
// scrollActive('.phone-second-nav','dd')


function slideToggle() {
	$('.gf-list10 li').find('.toggle2').click(function () {
		if ($(this).parents('li').hasClass('active')) {
			$(this).addClass('icon-right').removeClass('icon-down');
			$(this).parent('.gf_title').next('dl').slideUp(500);
			$(this).parents('li').removeClass('active')
		} else {
			$(this).addClass('icon-down').removeClass('icon-right');
			$(this).parent('.gf_title').next('dl').slideDown(500);
			$(this).parents('li').siblings().find('dl').slideUp(500)
			$(this).parents('li').siblings().removeClass('active')
			$(this).parents('li').siblings().find('.toggle2').addClass('icon-right').removeClass('icon-down')
			$(this).parents('li').addClass('active')
		}

	})
}
FontSize(".gp-article")

function FontSize(main) {

	$('#large').click(
		function () {
			// $(main).find("*").css("fontSize","16px");
			$(main).find("*").each(function () {
				var fontSize = parseInt($(this).css('font-size')) + 2;
				// debugger
				$(this).css('font-size', fontSize)
				$(this).css('line-height', 1.8)
			})
		});
	// $('#standard').hide()
	//     $('#standard').click(
	//             function(){
	// 	$(main).find("*").each(function(){
	// 			var fontSize =  parseInt($(this).css('font-size')) - 1 ;
	// 			// debugger
	// 			$(this).css('font-size',fontSize)
	// 			$(this).css('line-height',1.8)
	// 		})
	// });
	$('#small').click(
		function () {
			$(main).find("*").each(function () {
				var fontSize = parseInt($(this).css('font-size')) - 2;
				// debugger
				$(this).css('font-size', fontSize)
				$(this).css('line-height', 1.8)
			})
		});
}
// function FontSize(main){
// 	var largeNum ;
// 	if(getCookie('largeNum')){
// 		largeNum = parseInt(getCookie('largeNum'))
// 	}else{
// 		largeNum = 0 ;
// 	}
// 			$('#large').click(function(){
// 				if(parseInt($(main).find("*").css('font-size')) >= 30)
// 				return false
// 				setCookie("mode",1)
// 					switchFontSize();
// 					parseInt(getCookie('largeNum'))
// 					largeNum ++
// 					setCookie("largeNum",largeNum)
// 					console.log(largeNum);

// 			});
// 			$('#standard').click(function(){
// 					setCookie("largeNum",0);
// 					location.reload();
// 			});
// 			$('#small').click(function(){
// 					setCookie("mode",3)
// 							switchFontSize();
// 							parseInt(getCookie('largeNum'))
// 							if(largeNum == 0)return false
// 							largeNum --
// 							setCookie("largeNum",largeNum)
// 							console.log(largeNum);
// 			});
// 			init()
// 			function init(){
// 			    var mode = getCookie("mode");
// 			    if(mode==1){// 大
// 			        $(main).addClass("large").removeClass('standard').removeClass('small');
// 							// $(main).find("*").css("fontSize","18px");
// 							var largeN = parseInt(getCookie('largeNum'))
// 							$(main).find("*").each(function(){
// 								var fontSize =  parseInt($(this).css('font-size')) + (2 * largeN) ;
// 								// debugger
// 								$(this).css('font-size',fontSize)
// 								$(this).css('line-height',1.8)
// 							})
// 			    }else if(mode == 3){//小
// 			        $(main).addClass("small").removeClass('large').removeClass('standard');
// 			        // $(main).find("*").css("fontSize","12px");
// 							var largeN = parseInt(getCookie('largeNum'))
// 							return false ;
// 							$(main).find("*").each(function(){
// 								var fontSize =  parseInt($(this).css('font-size')) + (2 * largeN) ;
// 								// debugger
// 								$(this).css('font-size',fontSize)
// 								$(this).css('line-height',1.8)
// 							})
// 			    }
// 			    // return false;
// 			}
// 			function switchFontSize(){
// 			    var mode = getCookie("mode");
// 					if(mode==1){// 大
// 					    $(main).addClass("large").removeClass('standard').removeClass('small');
// 							addSize(main,2)
// 					}else{//小
// 					    $(main).addClass("small").removeClass('large').removeClass('standard');
// 					    // $(main).find("*").css("fontSize","12px");
// 							addSize(main,-2)
// 					}
// 			}
// 			function addSize(main,num){
// 				// debugger

// 				$(main).find("*").each(function(){
// 					var fontSize =  parseInt($(this).css('font-size')) + (num) ;
// 					// debugger
// 					$(this).css('font-size',fontSize)
// 					$(this).css('line-height',1.8)
// 				})
// 			}
// 			function getCookie(name) {
// 			    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
// 			    if (arr = document.cookie.match(reg)){
// 			        return unescape(arr[2]);
// 			    }else{
// 			        return null;
// 			    }
// 			}
// 			function setCookie(name, value) {
// 			    var Days = 30;
// 			    var exp = new Date();
// 			    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
// 			    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() ;
// 			}
// }

function getParam(pname) {
	var params = location.search.substr(1);
	var ArrParam = params.split('&');
	if (ArrParam.length == 1) {
		return params.split('=')[1];
	} else {
		for (var i = 0; i < ArrParam.length; i++) {
			if (ArrParam[i].split('=')[0] == pname) {
				return ArrParam[i].split('=')[1];
			}
		}
	}
}

$(function () {
	var mao = $("#" + getParam("s"));
	if (mao.length > 0) {
		var pos = mao.offset().top;
		var poshigh = mao.height();
		var headerHeight = $('.header').height();
		$("html,body").animate({
			scrollTop: pos - 180
		}, 1000);
	}
});

function jumpPage(){
	$("#pageNumber").keydown(function (e) {
		if (e.keyCode == 13) {
			jumpTo()
		}
	});
}

function jumpTo() {
	var pageNumber = parseInt($('#pageNumber').val());
	if (pageNumber > 0 && pageNumber <= maxPageCount) {
		document.location.href = pageNumber == 1 ? "index.htm" : pageNumber > maxPageCount ? "index" + (parseInt(maxPageCount) - 1).toString() + ".htm" : "index" + (pageNumber - 1).toString() + ".htm";
	} else {
		$('.tips').text('页码需大于0小于' + maxPageCount)
	}
}

function resizefs() {
	var realfz = window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','');
	if (realfz != 12) {
		document.getElementsByTagName("html")[0].style.cssText = 'font-size: 12px !important';
	}
}

$(function(){
		if($('.divPlayerImgResponsive').length > 0){
			var videoHeight = parseInt($('.divPlayerImgResponsive .videoCover').attr('data-height'));
			var videoWidth = parseInt($('.divPlayerImgResponsive .videoCover').attr('data-width'));
			if(videoHeight >= videoWidth){
				$('.divPlayerImgResponsive').addClass('VerticalScreen')
			}
			
		}
	})