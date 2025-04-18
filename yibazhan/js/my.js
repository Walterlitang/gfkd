$(function() {
    const baseUrl="http://47.116.185.113:8085";
    const baseUrlApi="http://47.116.185.113:8085/api";
    //标题
    $.get(baseUrl+'/api/sysCategory/getNavigationTree',(res)=>{
        let {data}=res;
        let str1="";
        let str2="";
        data.forEach(item=>{
            let s1=``;
            let s2=``;
            item.child?.forEach(val=>{
                s1+=`<li><a href="#">${val.name}</a></li>`;
                s2+=`<dd><li><a href="#">${val.name}</a></li></dd>`;
            })
            str1+=`
                <li>
                    <a href="#">${item.name}</a><i class="toggle"></i>
                    <ul>
                        ${s1}
                    </ul>
                </li>`
            str2+=`
                <li>
                    <a href="#" class="">${item.name}</a>
                    <div class="subnav flex w3">
                        <dl class="flex">
                            ${s2}
                        </dl>
                    </div>
                </li>`
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

    

    //新闻动态
    $.get(baseUrl+'/api/article/page?page=1&size=50&cid=141',(res)=>{
        console.log(222222222222,res)
    })

    //新闻动态
    $.get(baseUrl+'/api/article/FocusAndCurrentPolitics?currentPoliticsLimit=8',(res)=>{
        let {data}=res;
        const focus = data.focusPages.records;
        const current=data.currentPoliticsPages.records;
        let str1=`
            <div class="news_img1">
                <a class="gp-img-responsive" href="./news.html?id=${focus[0].id}">
                    <img src="yibazhan/images/25d5c60db4fd4cdf96a6e932d6f06487.png" >
                </a>
            </div>
            <div class="news_txt1 fontHei">
                <a href="./news.html?id=${focus[0].id}">
                    <div class="date gp-f14 item-date1"><span class="gp-f20">18</span>2025-03</div>
                    <h3 class="news_title gp-f20 gp-ellipsis">${focus[0].title}</h3>
                    <div class="news_summary gp-f18 gp-ellipsis-2">${focus[0].content}</div>
                    <div class="moreBox">
                        <div class="news_more gp-f18">
                            查看更多
                            <i class="iconfont icon-a-gong1"></i>
                        </div>
                    </div>
                </a>
            </div>`;
        let str2=``;
        focus.slice(1,3).forEach(item=>{
            str2+=`
            <li>
                <div class="item-info1">
                    <div class="item-img1">
                        <a class="gp-img-responsive" href="./news.html?id=${item.id}">
                            <img src="yibazhan/images/4e833780e9684dc69504ebad8dccb217.jpeg" >
                        </a>
                    </div>
                    <div class="item-txt1">
                        <span class="item-date1 gp-f14"><span class="gp-f20">02</span>2025-03</span>
                        <h3 class="item_title gp-f18">
                            <a href="https://www.nudt.edu.cn/xwgg/kdyw/994000ddbf704760bfbd6ba724e63915.htm">${item.title}</a>
                        </h3>
                    </div>
                </div>
            </li>`;
        })
        let str3=``;
        current.slice(0,5).forEach(item=>{
            str3+=`
            <li>
                <a href="./news.html?id=${item.id}">
                    <div class="notice_date">
                        <span class="day gp-f20">19</span>
                        <span class="year gp-f14">25/03</span>
                    </div>
                    <h3 class="item_title fontHei gp-f20">
                        ${item.title}
                    </h3>
                </a>
            </li>`;
        })
        $('.news_info1').append(str1);
        $('.NUDT-list1').append(str2);
        $('.NUDT_list2').append(str3);
    })

    //强军资讯
    $.get(baseUrl+'/api/article/StrongMilitaryInformation?limit=7',(res)=>{
        const {data} =res;
        const newsPages = data.newsPages.records.slice(0,5);
        const studyPages = data.studyPages.records.slice(0,5);
        let str=``;
        newsPages.forEach(item=>{
            str+=`
                <div class="til_tab">
                    <a href="#">
                        <div class="title gp-f20 gp-ellipsis">${item.title}</div>
                        <div class="summary gp-f18 gp-ellipsis-2">${item.content}</div>
                    </a>
                </div>`;
        })
        let str1=``;
        studyPages.forEach(item=>{
            str1+= `
                <div class="til_tab">
                    <a href="https://www.nudt.edu.cn/kxyj/kydt/7d6d7ae8351246d89d0c4698f636cb83.htm">
                        <div class="title gp-f20 gp-ellipsis">国防科大在高精度卫星导航领域取得重要进展</div>
                        <div class="summary gp-f18 gp-ellipsis-2">近日，国防科技大学电子科学学院北斗团队利用天线抖动增加了卫星高精度测量中的信息量，实现一种消除多径误差的新机制。通过理论分析和器件结构设计，首次实现了的微小抖动消除多径误差，为复杂遮挡环境下的低成本高精度卫星导航提供了可能。研究成果以“一种基于天线抖动的多径误差消除方法”（A multipath error cancellation method based on antenna jitter）为题于2025年2月7日在线发表于国际著名学术期刊Nature的首个工程领域子刊《通讯•工程》(Communications Engineering)上（DOI: 10.1038/s44172-025-00355-z）。</div>
                    </a>
                </div>`;
        })
        $('.mode02 .til_list').append(str);
        $('.mode03 .til_list').append(str1);
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
    })

    //律师在线
    $.get(baseUrl+'/api/person/webPage?page=1&size=2&type=37',(res)=>{
        const { data } = res;
        let str=``;
        data.records.forEach(item=>{
            str+=`
                <div class="user-info">
                    <img src='${baseUrlApi+item.profilePicture}' alt="值班咨询师" class="avatar">
                    <div class="details">
                        <p class="name">${item.name}</p>
                    </div>
                </div>`
        })
        $('#lvshi').append(str);
    })

    //心理咨询
    $.get(baseUrl+'/api/person/webPage?page=1&size=2&type=38',(res)=>{
        const { data } = res;
        let str=``;
        data.records.forEach(item=>{
            str+=`
                <div class="user-info">
                    <img src='${baseUrlApi+item.profilePicture}' alt="值班咨询师" class="avatar">
                    <div class="details">
                        <p class="name">${item.name}</p>
                    </div>
                </div>`
        })
        $('#xinli').append(str);
    })

    //健康问诊
    $.get(baseUrl+'/api/person/webPage?page=1&size=2&type=36',(res)=>{
        const { data } = res;
        let str=``;
        data.records.forEach(item=>{
            str+=`
                <div class="user-info">
                    <img src='${baseUrlApi+item.profilePicture}' alt="值班咨询师" class="avatar">
                    <div class="details">
                        <p class="name">${item.name}</p>
                    </div>
                </div>`
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

    //人物风采
    $.get(baseUrl+'/api/article/page?page=1&size=50&cid=130',(res)=>{
        const { data } = res;
        console.log(1111111,data)
        let str=``;
        data.records.forEach(item=>{
            str+=`<li class="swiper-slide">
                <a href="#" class="news_item">
                    <div class="infoBox">
                        <div class="name gp-f24">杨士莪</div>
                        <div class="subtitle gp-f20">${item.title}</div>
                        <div class="summary gp-f16 gp-ellipsis-2">
                            ${item.content}
                        </div>
                    </div>
                    <div class="img"><img src="${baseUrlApi+item.pic}" alt=""></div>
                </a>
            </li>`
        })
        $('#renwufengcai').append(str);
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
    })

    //祁连艺苑
    $.get(baseUrl+'/api/friendshipLink/webArtList',(res)=>{
        const { data } = res;
        //祁连艺术
        let str1=`<a href="#" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.theaterList[0].icon});background-size: 100% 100%;background-position: center;padding-bottom: 0px;height: 100%;"></a>`;
        $('#yishu').append(str1);
        //祁连画坛
        let str2=`<a href="#" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.otherList[0].icon});background-size: 100% 100%;background-position: center;padding-bottom: 0px;height: 100%;"></a>`;
        $('#huatan').append(str2);
        //祁连音乐
        let str3=`<a href="#" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.otherList[1].icon});background-position: center;background-size: cover;padding-bottom: 0px;height: 100%;"></a>`;
        $('#yinyue').append(str3);
        //祁连阅读
        let str4=`<a href="#" class="gp-img-responsive" style="background-image: url(${baseUrlApi+data.otherList[2].icon});background-position: center;background-size: cover;padding-bottom: 0px;height: 100%;"></a>`;
        $('#yuedu').append(str4);
    })
});

