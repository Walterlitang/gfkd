$(function() {
    const baseUrl="http://47.116.185.113:8085";
    const baseUrlApi="http://47.116.185.113:8085/api";
    //标题
    // $.get(baseUrl+'/api/sysCategory/getNavigationTree',(res)=>{
    //     let {data}=res;
    //     let str1="";
    //     let str2="";
    //     data.forEach(item=>{
    //         let s1=``;
    //         let s2=``;
    //         item.child?.forEach(val=>{
    //             s1+=`<li><a href="#">${val.name}</a></li>`;
    //             s2+=`<dd><li><a href="#">${val.name}</a></li></dd>`;
    //         })
    //         if(s1===""){
    //             str1+=`
    //                 <li>
    //                     <a href="#">${item.name}</a><i class="toggle"></i>
    //                 </li>`
    //         }else{
    //             str1+=`
    //                 <li>
    //                     <a href="#">${item.name}</a><i class="toggle"></i>
    //                     <ul>
    //                         ${s1}
    //                     </ul>
    //                 </li>`
    //         }
            
    //         if(s2===""){
    //             str2+=`
    //                 <li>
    //                     <a href="#" class="">${item.name}</a>
    //                 </li>`
    //         }else{
    //             str2+=`
    //                 <li>
    //                     <a href="#" class="">${item.name}</a>
    //                     <div class="subnav flex w3">
    //                         <dl class="flex">
    //                             ${s2}
    //                         </dl>
    //                     </div>
    //                 </li>`
    //         }
    //     })
    //     $('#nav').append(str1);
    //     $('#nav2').append(str2);
    //     resizefs()
    //     Nav('#nav') //导航
    //     Nav2('#nav2')
    //     mobileMenu('#gp-menu'); //移动端导航
    //     SerMax('#searchBtn5', '#gp-search5');
    //     wechat()
    //     HeaderFix()
    // });

    const id = window.location.search.substring(4);
    $.get(baseUrl+'/api/article/info?id='+id,(res)=>{
        const {data}=res;
        let str=`
            <div class="curTitle gp-f30">
                <a href="javascript:;">${data.categoryName}</a>
            </div>
            <div class="pageCon">
                <div class="gp-title gp-f30">${data.title}</div>
                <div class="gp-info">
                    <span class="gp-f16">发布时间：${data.releaseTime}</span>
                    <span class="gp-f16">文章出处：${data.articleSource}</span>						
                    <span class="gp-f16">文章作者：${data.author|| '--'}</span>
                    <span class="gp-f16">审核人：${data.reviewer || '--'}</span>
                    <span class="gp-f16">新闻分类：${data.categoryName}</span>
                    <span class="gp-f16">阅读量：${data.viewCount}</span>
                </div>
                <div class="gp-content gp-f16" style="text-indent: 2em;">
                    ${data.content}
                </div>
            </div>`;
        $(".pageTitle").append(`<span>${data.categoryName}</span>`)
        $(".gp-right").append(str);
    })
});