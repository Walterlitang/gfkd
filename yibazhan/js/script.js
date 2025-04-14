// 2023.05.04
// fixNav();
// $(window).scroll(function () {
//     fixNav();
// });
// function fixNav() {
//     var sWSon = document.documentElement.clientWidth;
//     var sHeight = document.documentElement.clientHeight;
//     var bodyHeight = document.body.scrollHeight;
//     var x = $('header').next().offset().top;
//     if (bodyHeight > sHeight + 100 && sWSon > 1024) {
//         $(window).scroll(function () {
//             var scrollTop = $(window).scrollTop();
//             if (scrollTop > 100) {
//                 $('header').addClass('currents')
//                 $('body').css('padding-top', x)
//             } else {
//                 $('header').removeClass('currents')
//                 $('body').css('padding-top', 0)
//             }
//         });
//     }
// }

$(window).scroll(function () {
	if( $(window).width() <= 996 ){
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 100) {
			$('#gp-serBtn4').hide()
			$('.topMenu').addClass('fix')
		} else {
			$('#gp-serBtn4').show()
			$('.topMenu').removeClass('fix')
		}
	}
})

$('.visible_btn').each(function(){ $(this).addClass('off') });
$('.visible_box').each(function(){ $(this).addClass('off') });

$('.visible_btn').click(function(){
    var box = $(this).attr('visible');
    $(this).toggleClass('on');
    $('.visible_box[visible*="' + box + '"]').toggleClass('on off')
});

// 点击滚动到指定板块
function q_scrollTo(tar,dis){
    var pos = $(''+ tar).offset().top;
    var d = dis || 0;
    $("html,body").animate({scrollTop: pos-d}, 1000);
}

// 切换每个传入的参数
function toggleOn(){
    var args = arguments.length;
    for(var i = 0; i < args; i++){
        $(arguments[i]).toggleClass('on');
    }
}
function toggleParentOn(a){ $(a).parent().toggleClass('on'); }

/*回到顶部*/
$(function(){
	$(window).resize(function(){
	   var h = $(window).height();
	   $('.goTop').css('top',h-150);
	   $(window).scroll(function(){
		   var scrollTop = $(document).scrollTop();
		   $('.goTop').stop().animate({
			   top: h + scrollTop-150
		   },300);
	   });
   }).resize();
});
//gotop
$('.goTop').click(function(){
   $('body,html').stop().animate({scrollTop:0});
   return false;
});


// 二级页侧栏菜单
// 如果有次级栏目，上一级栏目可选要不要链接，没有链接的话，点击上一级栏目，展开次级栏目
$('.sub_menu a.current').each(function(){
	$(this).parent('li').addClass('current');
	$(this).parents('.sub_menu ul').parent('li').addClass('on');
	$(this).parents('.sub_menu ul').slideDown(300);
	$(this).parents('.sub_menu ul').siblings('.arrow').addClass('on');
})
$('.sub_menu .arrow').click(function(){
	$(this).toggleClass('on');
	$(this).parent('li').toggleClass('on');
	$(this).siblings('ul').toggle(300);
})
$('.sub_left_title').click(function(){
	var sWSon = document.documentElement.clientWidth;
	if(sWSon < 992 && $('.sub_menu').length > 0 ){
		$(this).toggleClass('on');
		$('.sub_left').toggleClass('on');
		$('.sub_menu .lv0').toggle(300);
	}
})

// 2022.12.14版本
// tab切换
$.fn.extend({
	tab: function (options){
		var defaults = {             //默认参数
			ev : 'mouseover',        //默认事件'mouseover','click'
			til : 'h2',              //默认标签
			box : '.tab_list',       //默认列表
			defaultNum : 0,          //默认展示第几个
			eachPage : 1,            //每次切换的个数
			delay : 100,             //延迟时间
			auto : false,             //是否自动切换 true,false
			speed : 4000,            //自动切换间隔时间(毫秒)
			init : function(){},     //首次加载时触发时间
			before : function (){},  //切换前触发事件
			after : function (){},   //切换后触发事件
			exceed_hide: '0',        //超出隐藏
			more : true              //是否有more,false,true
		};
		var options = $.extend(defaults, options);  //用户设置参数覆盖默认参数
		
		return this.each(function (){
			var o = options;
			var obj = $(this);
			var oTil = obj.find(o.til);
			var oBox = obj.find(o.box);
			var oMore = null;
			var iNum = o.defaultNum;
			var iLen = oTil.length;
			var iBefore = o.before;
			var iAfter = o.after;
			var iEach = o.eachPage;

			// 判断是否为移动端
			if(document.documentElement.clientWidth < 992){
				o.ev = 'click';
			}

			$(oTil).each(function(){
				if( $(this).attr('href') ){
					$(this).attr('tab-link', $(this).attr('href'));
					$(this).removeAttr('href');
				}
			});

			// 默认选中第一个
			o.init();
			if( iNum >= 0 ){
				change( oTil.eq(iNum) );
			}
			
			//鼠标事件绑定
			oTil.bind(o.ev , function (){
				var _this = this;
				if(o.ev == 'mouseover' && o.delay){
					_this.timer = setTimeout(function (){
						change(_this);
					},o.delay);
				}else{
					change(_this);
				}; 
			})

			oTil.bind('mouseout',function (){
				var _this = this;
				clearTimeout(_this.timer);
			});
			
			//自动切换效果
			(function autoPlay(){
				var timer2 = null;
				if(o.auto){
					function play(){
						iNum++;
						if(iNum >= iLen){
							iNum =0;
						};
						change(oTil.eq(iNum));
					};
					timer2 = setInterval(play,o.speed);
					obj.on('mouseover',function (){
						clearInterval(timer2);
					})
					obj.on('mouseout',function (){
						timer2 = setInterval(play,o.speed);
					})
				};
			})();
			
			function change(box){
				iBefore(iNum,obj);
				iNum = $(box).index() - obj.find(o.til).eq(0).index();
				
				oTil.removeClass('on').addClass('off');
				oTil.eq(iNum).addClass('on').removeClass('off');
				setTimeout(function(){
					oTil.removeAttr('href');
					oTil.eq(iNum).attr('href', oTil.eq(iNum).attr('tab-link'));
				}, 100);

				if(o.more){
					oMore = obj.find('.more');
					oMore.removeClass('on').addClass('off');
					oMore.eq(iNum).addClass('on').removeClass('off');
				};
				
				// 如果没有更多，就不用切换列表
				oBox.removeClass('on').addClass('off');
				if(  iEach * iNum < oBox.length && o.exceed_hide ){
					oBox.slice( iEach * iNum , iEach * (iNum + 1) ).addClass('on').removeClass('off');
				}

				iAfter(iNum,obj);
			}
			
		});
	}
})

$('.select_link').click(function(){
	$(this).find('.arrow').toggleClass('on');
	$(this).find('.alert_box').toggleClass('on');
	$(this).toggleClass('on');
	// $('.alert_box').jScrollPane();
})
$('.select_link').mouseleave(function(){
	$(this).find('.arrow').removeClass('on');
	$(this).find('.alert_box').removeClass('on');
	$(this).removeClass('on');
})

// 图片延迟加载
function loadimg(imglist){
	var i=0;
	var run;
	$(imglist).each(function(index, element) {
		$(this).attr("data",$(this).attr("src"));
		$(this).attr("src","");
		$(this).addClass("unload");
	});
	run = function(img){
		i++;
		if($(window).scrollTop()+$(window).height()>img.offset().top){
			img.load(function(){
				if($("img.unload").eq(0).length > 0 && i<1000){
					run($("img.unload").eq(0));
				}
			});
			img.attr("src",img.attr("data")).removeClass("unload");
		}
	}
	run($("img.unload").eq(0));
	$(window).scroll(function(){
		if($("img.unload").eq(0).length>0 && i<1000){
			run($("img.unload").eq(0));
		}
	});
}


var gp = {
	// 选项卡
	tab: function ( tar, options){
		var defaults = {             //默认参数
			ev : 'mouseover',        //默认事件'mouseover','click'
			til : 'h2',              //默认标签
			box : '.tab_list',       //默认列表
			tabOn: 'on',			 //选中的class
			tabOff: 'off2',			 //未选中的class
			defaultNum : 0,          //默认展示第几个
			eachPage : 1,            //每次切换的个数
			delay : 100,             //延迟时间
			auto : false,             //是否自动切换 true,false
			speed : 4000,            //自动切换间隔时间(毫秒)
			funs: {					 //回调函数
				init : function(){},     //首次加载时触发时间
				before : function (){},  //切换前触发事件
				after : function (){},   //切换后触发事件
			},
			exceed_hide: '0',        //超出隐藏
			more : true              //是否有more,false,true
		};
		var options = $.extend(defaults, options);  //用户设置参数覆盖默认参数
		$(tar).each(function (){
			var o = options;
			var obj = $(tar);
			var oTil = obj.find(o.til);
			var oBox = obj.find(o.box);
			var oMore = null;
			var iNum = o.defaultNum;
			var iLen = oTil.length;
			var iBefore = o.funs.before;
			var iAfter = o.funs.after;
			var iEach = o.eachPage;

			// 判断是否为移动端
			if(document.documentElement.clientWidth < 992){
				o.ev = 'click';
			}

			$(oTil).each(function(){
				if( $(this).attr('href') ){
					$(this).attr('tab-link', $(this).attr('href'));
					$(this).removeAttr('href');
				}
			});

			// 默认选中第一个
			o.funs.init();
			if( iNum >= 0 ){
				change( oTil.eq(iNum) );
			}
			
			//鼠标事件绑定
			oTil.bind(o.ev , function (){
				var _this = this;
				if(o.ev == 'mouseover' && o.delay){
					_this.timer = setTimeout(function (){
						change(_this);
					},o.delay);
				}else{
					change(_this);
				}; 
			})

			oTil.bind('mouseout',function (){
				var _this = this;
				clearTimeout(_this.timer);
			});
			
			//自动切换效果
			(function autoPlay(){
				var timer2 = null;
				if(o.auto){
					function play(){
						iNum++;
						if(iNum >= iLen){
							iNum =0;
						};
						change(oTil.eq(iNum));
					};
					timer2 = setInterval(play,o.speed);
					obj.on('mouseover',function (){
						clearInterval(timer2);
					})
					obj.on('mouseout',function (){
						timer2 = setInterval(play,o.speed);
					})
				};
			})();
			
			function change(box){
				iBefore(iNum,obj);
				iNum = $(box).index() - obj.find(o.til).eq(0).index();
				
				oTil.removeClass(options.tabOn).addClass(options.tabOff);
				oTil.eq(iNum).addClass(options.tabOn).removeClass(options.tabOff);
				setTimeout(function(){
					oTil.removeAttr('href');
					oTil.eq(iNum).attr('href', oTil.eq(iNum).attr('tab-link'));
				}, 100);

				if(o.more){
					oMore = obj.find('.more');
					oMore.removeClass(options.tabOn).addClass(options.tabOff);
					oMore.eq(iNum).addClass(options.tabOn).removeClass(options.tabOff);
				};
				
				// 如果没有更多，就不用切换列表
				oBox.removeClass(options.tabOn).addClass(options.tabOff);
				if(  iEach * iNum < oBox.length && o.exceed_hide ){
					oBox.slice( iEach * iNum , iEach * (iNum + 1) ).addClass(options.tabOn).removeClass(options.tabOff);
				}

				iAfter(iNum,obj);
			}
			
		});

		return {
			tar: tar,
			options: options,
			// nexttab: function(tar, options){
			// 	console.log( $(this.tar).html() )
			// }
		};
	}
}

// tab切换最好有个直接写在html里的，更加方便
const GpUtils = {
    get: function (url, data, callback) {
        if ($.isFunction(data)) {
            callback = data;
            data = {};
        }
        data.s = Math.random();
        $.get(url, data, function (response) {
            if (response.status === 500) {
                alert(response.msg);
                $('#codebox').click();
            } else {
                callback(response);
            }
        })
    },
    post: function (url, data, callback) {
        if ($.isFunction(data)) {
            callback = data;
        }
        if (data) {
            $.ajax({
                url: url,
                type: 'post',
                data: GpUtils.initFormData(data),
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.status === 500) {
                        alert(response.msg);
                        $('#codebox').click();
                    } else {
                        callback(response);
                    }
                }
            })
        }
    },
    initFormData: function (data) {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    },
    strIsNotBlank: function (str) {
        return !(str === undefined || str == null || str === '');
    },
    strIsBlank: function (str) {
        return str === undefined || str == null || str === '';
    },
    verifyInput: function (data) {
        for (let key in data) {
            if ($('#' + key).attr('gp-require') !== undefined && GpUtils.strIsBlank(data[key])) {
                $('#' + key).focus();
                alert($('#' + key).attr('gp-require') + '不能为空！');
                return false;
            } else if ($('input[name=' + key + ']').length > 0) {
                if ($('input[name=' + key + ']:checked').length === 0) {
                    alert($($('input[name=' + key + ']')[0]).attr('gp-require') + '不能为空！');
                    return false;
                }
            }
        }
        return data;
    },
    xssFilter: function (str) {
        if (GpUtils.strIsNotBlank(str)) {
            return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return '';
    },
    //data: {content:'内容',keyword:[1,2,3],channel:{title:'栏目名称'}}
    //str: '<div>$[content]</div><div gp-repeat='$[keyword]'></div><div>$[channel.title]</div>'
    replaceTemplate: function (data, str) {
        let obj = str;
        if (typeof str === 'string') {
            obj = $(str).wrap('<div></div>').parent();
            obj.wrap('<parent></parent>');
        }
        for (let key in data) {
            if (data[key] instanceof Array) {
                let item = obj.find('[gp-repeat="$[' + key + ']"]');
                if (data[key].length === 0) item.remove();
                for (let i = 0; i < data[key].length; i++) {
                    if (i === 0) {
                        item.text(data[key][i]);
                    } else {
                        let child = item.clone();
                        child.text(data[key][i]);
                        item.parent().append(child);
                    }
                }
            } else if (data[key] instanceof Object) {
                GpUtils.replaceTemplate(GpUtils.formatStr(key, data[key]), obj);
            } else {
          var a = '\\$\\['+ key + '\\]';
		obj.html(obj.html().replace(new RegExp(a,'g'),data[key]));
                //obj.html(obj.html().replaceAll('$[' + key + ']', data[key]));
            }
        }
        return obj.html();
    },
    formatStr: function (key, obj) {
        let o = {};
        for (let k in obj) {
            o[key + '.' + k] = obj[k];
        }
        return o;
    },
    submit: function (form, callback) {
        form = form[0];
        let check = true, msg = '', data = {};
        $(form).children('input').each(function () {
            if ($(this).attr('gp-require') !== undefined && !GpUtils.strIsNotBlank(this.value)) {
                this.focus();
                msg = $(this).attr('gp-require') + '不能为空！';
                check = false;
                return false;
            } else {
                data[this.name] = this.value;
            }
        })
        if (check) {
            if (form.method.toLowerCase() === 'get') {
                $.get(form.action, data, function (response) {
                    callback(response, undefined);
                })
            } else if (form.method.toLowerCase() === 'post') {
                $.post(form.action, data, function (response) {
                    callback(response, undefined);
                })
            }
        } else {
            callback(undefined, msg);
        }
    },
    //将“2021-10-06T13:53:16.9188978 08:00” ，转换为2021-10-06 13:53:00
    randerTime: function (time) {
        let a = new Date(time).getTime();
        const date = new Date(a);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        const s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
        const dateString = Y + M + D + h + m + s;
        return dateString;
    }
};
