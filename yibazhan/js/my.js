$(function() {
    const baseUrl="http://47.116.185.113:8085";
    //标题
    $.get(baseUrl+'/api/sysCategory/getNavigationTree',(res)=>{
        let {data}=res;
        let str="";
        let str2="";
        data.forEach(item=>{
            str+=`
                <li><a href="https://www.nudt.edu.cn/xxgk/index.htm">学校概况</a><i class="toggle"></i>
                    <ul>
                        <li><a href="https://www.nudt.edu.cn/xxgk/kdjj/index.htm">科大简介</a></li>
                        <li><a href="https://www.nudt.edu.cn/xxgk/kdxx/index.htm">科大校训</a></li>
                        <li><a href="https://www.nudt.edu.cn/xxgk/kdxg/index.htm">科大校歌</a></li>
                        <li><a href="https://www.nudt.edu.cn/xxgk/sjxxsbxt/index.htm">标识系统</a></li>
                    </ul>
                </li>`;
            str2+=`<li>
                        <a href="https://www.nudt.edu.cn/xxgk/index.htm" class="">${item.name}</a>
                        <div class="subnav flex w3">
                            <div class="img"><div class="gp-img-responsive"><img src="yibazhan/images/nav_img_xxgk.png" alt=""></div></div>
                            <dl class="flex">
                                <dd><a href="https://www.nudt.edu.cn/xxgk/kdjj/index.htm">科大简介</a></dd>
                                <dd><a href="https://www.nudt.edu.cn/xxgk/kdxx/index.htm">科大校训</a></dd>
                                <dd><a href="https://www.nudt.edu.cn/xxgk/kdxg/index.htm">科大校歌</a></dd>
                                <dd><a href="https://www.nudt.edu.cn/xxgk/sjxxsbxt/index.htm">标识系统</a></dd>
                            </dl>
                        </div>
                </li>`
        })
        $('#nav').append(str2);
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
                    <a href="https://www.nudt.edu.cn/jyjx/jxdt/c5d86fb9783f40c5bc52b4e1ea24c734.htm">
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
});


