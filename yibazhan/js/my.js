$(function() {
    const baseUrl="http://47.116.185.113:8085";
    const baseUrlApi="http://47.116.185.113:8085/api";
    //标题
    $.get(baseUrl+'/api/sysCategory/getNavigationTree',(res)=>{
        let {data}=res;
        let str1="";
        let str2="";
        data.forEach(item=>{
            str1+=`
                <li>
                    <a href="#${item.name}">${item.name}</a><i class="toggle"></i>
                </li>`
            str2+=`
                <li>
                    <a href="#${item.name}" class="">${item.name}</a>
                </li>`
            //新闻动态
            
            if(item.id===141){
                let s=`
                    <div class="mode1 gp-flex gp-container  gp-clearFix" id="${item.name}">
                        <div class="col lf effect effect4">
                            <div class="listTitle1">
                                <h2 class="gp-f30"><a href="#">${item.name}<span class="enTitle gp-f16"><b class="gp-f30">N</b>ews</span></a></h2>
                            </div>
                            <div class="news_info1 gp-flex"></div>
                            <ul class="NUDT-list1 gp-avg-2"></ul>
                        </div>
                        <div class="col rt effect effect2">
                            <div class="listTitle1">
                                <h2 class="gp-f30">
                                    <a href="#"><span class="enTitle gp-f16"><b class="gp-f30">N</b>ews</span></a>
                                </h2>
                            </div>
                            <ul class="NUDT_list2"></ul>
                        </div>
                    </div>`;
                $(".wrap_mode1").append(s);

                $.get(baseUrl+'/api/article/page?page=1&size=50&cid='+item.id,(res)=>{
                    let data=res.data.records;
                    let str1=`
                        <div class="news_img1" >
                            <a class="gp-img-responsive" href="./news.html?type=article&id=${data[0].id}" target='_blank'>
                                <img src="${baseUrlApi+data[0].pic}">
                            </a>
                        </div>
                        <div class="news_txt1 fontHei">
                            <a href="./news.html?type=article&id=${data[0].id}" target='_blank'>
                                <div class="date gp-f14 item-date1"><span class="gp-f20">${data[0].createTime.slice(8)}</span>${data[0].createTime.slice(0,7)}</div>
                                <h3 class="news_title gp-f20 gp-ellipsis">${data[0].title}</h3>
                                <div class="news_summary gp-f18 gp-ellipsis-2">${data[0].content}</div>
                                <div class="moreBox">
                                    <div class="news_more gp-f18">
                                        查看更多
                                        <i class="iconfont icon-a-gong1"></i>
                                    </div>
                                </div>
                            </a>
                        </div>`;
                    let str2=``;
                    data.slice(1,3).forEach(val=>{
                        str2+=`
                            <li>
                                <div class="item-info1">
                                    <div class="item-img1">
                                        <a class="gp-img-responsive" href="./news.html?type=article&id=${val.id}" target='_blank'>
                                            <img src="${baseUrlApi+val.pic}">
                                        </a>
                                    </div>
                                    <div class="item-txt1">
                                        <span class="item-date1 gp-f14"><span class="gp-f20">${val.createTime.slice(8)}</span>${val.createTime.slice(0,7)}</span>
                                        <h3 class="item_title gp-f18">
                                            <a href="#">${val.title}</a>
                                        </h3>
                                    </div>
                                </div>
                            </li>`;
                    })
                    let str3=``;
                    data.slice(3,8).forEach(val=>{
                        str3+=`
                        <li>
                            <a href="./news.html?type=article&id=${val.id}" target='_blank'>
                                <div class="notice_date">
                                    <span class="day gp-f20">${val.createTime.slice(8)}</span>
                                    <span class="year gp-f14">${val.createTime.replace("-","/").slice(0,7)}</span>
                                </div>
                                <h3 class="item_title fontHei gp-f20">
                                    ${val.title}
                                </h3>
                            </a>
                        </li>`;
                    })
                    $('.news_info1').append(str1);
                    $('.NUDT-list1').append(str2);
                    $('.NUDT_list2').append(str3);
                })
            }
            //强军资讯
            if(item.id===2){
                let s=`
                    <div class="mode02_title fs40 effect effect3" id="${item.name}">
                        <h2 class="gp-f30"><a href="#">${item.name}<span class="enTitle gp-f16"><b class="gp-f30">I</b>nformation</span></a></h2>
                    </div>
                    <div class="mode02 tab">
                        <img src="yibazhan/images/mode02_gradient.png" alt="" class="cover">
                        <video class="q_lazyload" data-src="./yibazhan/images/video2.mp4" muted loop autoplay></video>
                        <div class="gp-container effect effect1">
                            <div class="modeCon flex">	
                                <div class="box_list"></div>
                                <div class="til_list" style="top: 40px;"></div>
                            </div>
                        </div>
                    </div>`
                $(".wrap_mode02").append(s);
                $.get(baseUrl+'/api/article/page?page=1&size=50&cid='+item.id,(res)=>{
                    const data=res.data.records.slice(0,5);
                    let str=``;
                    let pic=``;
                    data.forEach(item=>{
                        str+=`
                            <div class="til_tab">
                                <a href="./news.html?type=article&id=${item.id}" target='_blank'>
                                    <div class="title gp-f20 gp-ellipsis">${item.title}</div>
                                    <div class="summary gp-f18 gp-ellipsis-2">${item.content}</div>
                                </a>
                            </div>`;
                        pic+=`<div class="tabListBox"><a href="#" class="gp-img-responsive"><img src="${baseUrlApi+item.pic}" alt=""></a></div>`;
                    })
                    $('.mode02 .til_list').append(str);
                    $('.mode02 .box_list').append(pic);
                    $(".mode02.tab").tab({
                        ev: 'mouseover',
                        more: false,
                        auto: false
                    });
                })
            }
            //祁连讲习所
            if(item.id===15){
                let s=`
                    <div class="mode03_title fs40 effect effect1" id="${item.name}">
                        <h2 class="gp-f30"><a href="#">${item.name}<span class="enTitle gp-f16"><b class="gp-f30">L</b>ecture</span></a></h2>
                    </div>
                    <div class="mode03 tab">
                        <img src="yibazhan/images/mode03_gradient.png" alt="" class="cover">
                        <video class="q_lazyload" data-src="./yibazhan/images/video2.mp4" muted loop autoplay></video>
                        <div class="gp-container effect effect1">
                            <div class="modeCon flex">
                                <div class="box_list"></div>
                                <div class="til_list" style="top: 40px;"></div>
                            </div>
                        </div>
                    </div>`
                $(".wrap_mode03").append(s);
                $.get(baseUrl+'/api/article/page?page=1&size=50&cid='+item.id,(res)=>{
                    const data=res.data.records.slice(0,5);
                    let str=``;
                    let pic=``;
                    data.forEach(item=>{
                        str+=`
                            <div class="til_tab">
                                <a href="./news.html?type=article&id=${item.id}" target='_blank'>
                                    <div class="title gp-f20 gp-ellipsis">${item.title}</div>
                                    <div class="summary gp-f18 gp-ellipsis-2">${item.content}</div>
                                </a>
                            </div>`;
                        pic+=`<div class="tabListBox"><a href="#" class="gp-img-responsive"><img src="${baseUrlApi+item.pic}" alt=""></a></div>`;
                    })
                    $('.mode03 .til_list').append(str);
                    $('.mode03 .box_list').append(pic);
                    $(".mode03.tab").tab({
                        ev: 'mouseover',
                        more: false,
                        auto: false
                    });
                })
            }
            //人物风采
            if(item.id===130){
                let s=`
                    <div class="mode05 effect effect1" id="${item.name}">
                        <div class="index_title5 mode04_title">
                            <h2 class="gp-f30"><a href="#">${item.name}<span class="enTitle gp-f16"><b class="gp-f30">N</b>UDT PEOPLE</span></a></h2>
                        </div>
                        <div class="mode05_slides ul-inline">
                            <div class="item-bg"></div>
                            <ul class="swiper-wrapper" id="renwufengcai"></ul>
                            <div class="news-slider-next iconfont icon-a-gong2"></div>
                            <div class="news-slider-prev iconfont icon-a-gong2"></div>
                            <div class="news-slider__pagination"></div>
                        </div>
                    </div>`;
                $(".wrap_mode05").append(s);
                //人物风采
                $.get(baseUrl+'/api/article/page?page=1&size=50&cid='+item.id,(res)=>{
                    const { data } = res;
                    let str=``;
                    data.records.slice(5).forEach(item=>{
                        str+=`<li class="swiper-slide">
                            <a href="#" class="news_item">
                                <div class="infoBox">
                                    <div class="name gp-f24">${item.title}</div>
                                    <div class="summary gp-f16 gp-ellipsis-2">
                                        ${item.content}
                                    </div>
                                </div>
                                <div class="img"><img src="${baseUrlApi+item.pic}" alt=""></div>
                            </a>
                        </li>`
                    })
                    $('#renwufengcai').append(str);
                    mode05_swiper();
                })
            }
            //祁连驿站
            if(item.name==="祁连驿站"){

            }
            if(item.id===19){
                let s=`
                    <div class="mode06" style="height:100vh" id="${item.name}">
                        <div class="mode06Con gp-container flex" style="height:100%">
                            <div class="flex left" style="width: 100%;">
                                <div class="lf col" style="position:relative;"> 
                                    <div class="index_title6 mode05_title effect isView" style="position: absolute;top: 24px;width: 400px;height:100px;z-index:99999;">
                                        <h2 class="gp-f40"><a href="#">${item.name}<span class="enTitle gp-f20"><b class="gp-f40">A</b>RTS</span></a></h2>
                                    </div>
                                    <ul style="height: 100%;">
                                        <li style="height: 100%;">
                                            <div class="item c2" style="cursour:pointer;height: 100%;" id="yishu"></div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="md col">
                                    
                                    <ul style="height: 100%;">
                                        <li style="height: 100%;">
                                            <div class="item c2" style="cursour:pointer;height: 100%;" id="huatan"></div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="md col">
                                    <ul style="height: 100%;display: flex;flex-direction: column;justify-content: space-between;">
                                        <li style="height:calc(50% - 10px);">
                                            <div class="item c2" style="height: 100%;" id="yinyue"></div>
                                        </li>
                                        <li style="height:calc(50% - 10px);">
                                            <div class="item c3" style="height: 100%;" id="yuedu"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`
                $(".qilianyiyuan").append(s);
                //祁连艺苑
                $.get(baseUrl+'/api/friendshipLink/webArtList',(res)=>{
                    const { data } = res;
                    //祁连艺术
                    let str1=`<a target='_blank' href="${data.theaterList[0].linkAddress || '#'}" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.theaterList[0].icon});background-size: 100% 100%;background-position: center;padding-bottom: 0px;height: 100%;"></a>`;
                    $('#yishu').append(str1);
                    //祁连画坛
                    let str2=`<a target='_blank' href="${data.otherList[0].linkAddress || '#'}" class="gp-img-responsive" style=";background-image: url(${baseUrlApi+data.otherList[0].icon});background-size: 100% 100%;background-position: center;padding-bottom: 0px;height: 100%;"></a>`;
                    $('#huatan').append(str2);
                    //祁连音乐
                    let str3=`<a target='_blank' href="${data.otherList[1].linkAddress || '#'}" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.otherList[1].icon});background-position: center;background-size: cover;padding-bottom: 0px;height: 100%;"></a>`;
                    $('#yinyue').append(str3);
                    //祁连阅读
                    let str4=`<a target='_blank' href="${data.otherList[2].linkAddress || '#'}" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.otherList[2].icon});background-position: center;background-size: cover;padding-bottom: 0px;height: 100%;"></a>`;
                    $('#yuedu').append(str4);
                })
            }
        })
        $('#nav').append(str1);
        $('#nav2').append(str2);
        resizefs()
        Nav('#nav') //导航
        Nav2('#nav2')
        mobileMenu('#gp-menu'); //移动端导航
        SerMax('#searchBtn5', '#gp-search5');
        wechat()
        HeaderFix()
    })

    new Swiper('#lunbo', {
        loop: true, // 循环模式
        pagination: {
          el: '.swiper-pagination', // 分页器
          clickable: true, // 允许点击分页器切换
        },
        autoplay:{
            delay:1000,
            disableInteraction:false
        }
    });

    //大图
    $.get(baseUrl+'/api/banner/webPage',(res)=>{
        let s=`<img src="${baseUrlApi+res.data.records[0].imageUrl}" alt="">`;
        $(".slick-img").append(s);
    })

    //邮箱
    $.get(baseUrl+'/api/sysCategory/getWebMailboxTree',(res)=>{
        const data=res.data.slice(0,2);
        let s=``;
        data.forEach(item=>{
            s+=`<div class="content_box" style="background: url(${baseUrlApi+item.backgroundImage}) no-repeat center;">${item.name}</div>`
        })
        $(".xinxiang").append(s);
    })
    //办事大厅
    $.get(baseUrl+'/api/friendshipLink/webList?type=2',(res)=>{
        const data=res.data;
        let str=``;
        data.forEach((item,index)=>{
            str+=`<a class="hall" href="${item.linkAddress}">
                <image style="disaply:inline-block;width:24px;height:24px" src="${baseUrlApi+item.icon}" alt="">
                <span>${item.name}</span></a>`
        })
        $(".dating").append(str);
    })
    //天天读报
    $.get(baseUrl+'/api/sysCategory/getArticleTree?pid=131',(res)=>{
        const data=res.data;
        let s=``;
        data.forEach(item=>{
            s+=`<div class="bao">
                <a>${item.name}</a>
            </div>`
        })
        $(".dubao").append(s);
    })
    //律师在线
    $.get(baseUrl+'/api/person/webPage?page=1&size=2&type=37',(res)=>{
        const { data } = res;
        let str=``;
        data.records.forEach(item=>{
            str+=`
                <a href="./news.html?type=person&id=${item.id}" class="user-info">
                    <img src='${baseUrlApi+item.profilePicture}' alt="值班咨询师" class="avatar">
                    <div class="details">
                        <p class="name">${item.name}</p>
                    </div>
                </a>`
        })
        $('#lvshi').append(str);
    })
    //心理咨询
    $.get(baseUrl+'/api/person/webPage?page=1&size=2&type=38',(res)=>{
        const { data } = res;
        let str=``;
        data.records.forEach(item=>{
            str+=`
                <a href="./news.html?type=person&id=${item.id}" class="user-info" target='_blank'>
                    <img src='${baseUrlApi+item.profilePicture}' alt="值班咨询师" class="avatar">
                    <div class="details">
                        <p class="name">${item.name}</p>
                    </div>
                </a>`
        })
        $('#xinli').append(str);
    })
    //健康问诊
    $.get(baseUrl+'/api/person/webPage?page=1&size=2&type=36',(res)=>{
        const { data } = res;
        let str=``;
        data.records.forEach(item=>{
            str+=`
                <a href="./news.html?type=person&id=${item.id}" class="user-info">
                    <img src='${baseUrlApi+item.profilePicture}' alt="值班咨询师" class="avatar">
                    <div class="details">
                        <p class="name">${item.name}</p>
                    </div>
                </a>`
        })
        $('#jiankang').append(str);
    })
    //分类
    $.get(baseUrl+'/api/article/StrongMilitaryInformation?limit=7',(res)=>{
        const { data } = res;
        let str1=``;
        //健康问诊
        data.jianKangWenZhenPages.records.forEach(item=>{
            str1+=`
                <div class="news-list">
                    <span class="news-item">
                        <span class="news-title">${item.title}</span>
                        <span class="separator">|</span>
                    </span>
                </div>`;
        })
        $('#jiankangwenzhen').append(str1);
        //律师在线
        let str2=``;
        data.lvShiZaiXianPages.records.forEach(item=>{
            str2+=`
                <div class="news-list">
                    <span class="news-item">
                        <span class="news-title">${item.title}</span>
                        <span class="separator">|</span>
                    </span>
                </div>`;
        })
        $('#lvshizaixian').append(str2);
        //心里咨询
        let str3=``;
        data.xinLingYiZhanPages.records.forEach(item=>{
            str3+=`
                <div class="news-list">
                    <span class="news-item">
                        <span class="news-title">${item.title}</span>
                        <span class="separator">|</span>
                    </span>
                </div>`;
        })
        $('#xinlizixun').append(str3);
    })
    //网站设置
    $.get(baseUrl+'/api/websiteConfig/detail',(res)=>{
        let data=res.data;
        let s=`
            <span class="gp-f30" style='margin-bottom:20px'>${data.unitNumber}</span>
            <span class="gp-f16">主办单位：${data.theOrganizer}</span>
            <span class="gp-f16">联系电话：${data.contactPhoneNumber}</span>
            <span class="gp-f16">联系人：&emsp;${data.contactPerson}</span>
            <span class="gp-f16">备案号：&emsp;${data.recordNumber}</span>
        `
        $('.copyRight').append(s);
    })
    $.get(baseUrl+'/api/friendshipLink/webList?type=3',(res)=>{
        const data=res.data;
        let str=``;
        data.forEach(item => {
            let s=``;
            item.child.forEach(val=>{
                s+=`<a href="${val.linkAddress}" target='_blank' style="margin-right:20px">${val.name}</a>`
            })
            str+=`<div class="gp-f16" style="margin-bottom:10px;display:flex;"><span style="width:86px">${item.name}：</span><span style="width:calc(100% - 86px)">${s}</span></div>`
        });
        $(".addr").append(str);
    })
});

function mode05_swiper(){
    var bg = document.querySelector('.item-bg');
        var mode05Left = document.getElementsByClassName('mode05_slides')[0].getBoundingClientRect().left;
        $(function () {
            var aHeight = [];
            $('.news_item .infoBox').each(function (index, element) {
                aHeight.push($(this).innerHeight())
            });
            // $('.news_item .infoBox').css('height',Math.max(...aHeight));
            $('.news_item .infoBox').css('height',Math.max.apply(null, aHeight));
        })

        if($(window).width() > 800) {
            $('.wrap_mode05').on("mouseover", ".news_item", function (_event, _element) {
                var x = $(this).offset().left - mode05Left;
                var y = $(this).offset().top;
                var width = $(this).outerWidth();
                var height = $(this).outerHeight();

                $('.item-bg').addClass('active');
                $('.news_item').removeClass('active');
                $(this).addClass('active');
                // $('.news_item').removeClass('active');

                bg.style.width = width + 'px';
                bg.style.height = height + 'px';
                bg.style.transform = 'translateX(' + x + 'px )';
            });
            $('.wrap_mode05').on("mouseleave", ".news_item", function (_event, _element) {
                $('.item-bg').removeClass('active');
                $('.news_item').removeClass('active');
            })

            $(window).resize(function () {
                if( $('.news_item.active').length > 0 ) {
                    mode05Left = document.getElementsByClassName('mode05_slides')[0].getBoundingClientRect().left;
                    var _this = $('.news_item.active');
                    var x = $(_this).offset().left - mode05Left;
                    var y = $(_this).offset().top;
                    var width = $(_this).outerWidth();
                    var height = $(_this).outerHeight();

                    bg.style.transform = 'translateX(' + x + 'px )';
                    bg.style.width = width + 'px';
                    bg.style.height = height + 'px';
                }
            });
            $('.body_b').scroll(function () {
                if( $('.news_item.active').length > 0 ){
                    mode05Left = document.getElementsByClassName('mode05_slides')[0].getBoundingClientRect().left;
                    var _this = $('.news_item.active');
                    var x = $(_this).offset().left - mode05Left;
                    var y = $(_this).offset().top;
                    var width = $(_this).outerWidth();
                    var height = $(_this).outerHeight();
            
                    bg.style.transform = 'translateX(' + x + 'px )';
                    bg.style.width = width + 'px';
                    bg.style.height = height + 'px';
                }
            });
        }

        var mode05_slides = new Swiper('.mode05_slides', {
            effect: 'coverflow',
            grabCursor: true,
            loop: true,
            centeredSlides: true,
            keyboard: true,
            slidesPerView: 3,
            spaceBetween: 45,
            speed: 300,
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: false
            // },
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 3,
                slideShadows: false
            },
            breakpoints: {
                998: {
                    spaceBetween: 45,
                    slidesPerView: 3,
                    centeredSlides: true
                },
                320: {
                    spaceBetween: 45,
                    slidesPerView: 1,
                    centeredSlides: true
                }
            },
            simulateTouch: true,
            navigation: {
                nextEl: '.news-slider-next',
                prevEl: '.news-slider-prev'
            },
            pagination: {
                el: '.news-slider__pagination',
                clickable: true,
                type : 'progressbar',
            },
            on: {
                init: function () {
                    var activeItem = document.getElementsByClassName('mode05_slides')[0].querySelector('.swiper-slide-active');
                    var sliderItem = activeItem.querySelector('.news_item');
                    $('.swiper-slide-active .news_item').addClass('active');
                    var x = sliderItem.getBoundingClientRect().left - mode05Left;
                    var y = sliderItem.getBoundingClientRect().top;
                    var width = sliderItem.getBoundingClientRect().width;
                    var height = sliderItem.getBoundingClientRect().height;
                    $('.item-bg').addClass('active');
                    bg.style.width = width + 'px';
                    bg.style.height = height + 'px';
                    bg.style.transform = 'translateX(' + x + 'px )';
                    // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
                }
            }
        });

        mode05_slides.on('touchEnd', function () {
            $('.news_item').removeClass('active');
            $('.swiper-slide-active .news_item').addClass('active');
        });

        mode05_slides.on('slideChange', function () {
            $('.news_item').removeClass('active');
        });

        mode05_slides.on('slideChangeTransitionEnd', function () {
            $('.news_item').removeClass('active');
            var activeItem = document.querySelector('.swiper-slide-active');
            var sliderItem = activeItem.querySelector('.news_item');
            $('.swiper-slide-active .news_item').addClass('active');
            var x = document.querySelector('.swiper-slide-active .news_item').getBoundingClientRect().left - mode05Left;
            var y = document.querySelector('.swiper-slide-active .news_item').getBoundingClientRect().top;
            /* var width = sliderItem.getBoundingClientRect().width;
            var height = sliderItem.getBoundingClientRect().height; */
            $('.item-bg').addClass('active');
            /* bg.style.width = width + 'px';
            bg.style.height = height + 'px'; */
            bg.style.transform = 'translateX(' + x + 'px )';
            // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
        });
}