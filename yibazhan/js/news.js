$(function() {
    const baseUrl="http://47.116.185.113:8085";
    const baseUrlApi="http://47.116.185.113:8085/api";
    const str = window.location.search.substring(1);
    const type=str.split("&")[0].split("=")[1];
    const id=str.split("&")[1].split("=")[1];
    if(type==="article"){
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
    }else if(type==="person"){
        $.get(baseUrl+'/api/person/info?id='+id,(res)=>{
            const {data}=res;
            let str=`
                <div class="curTitle gp-f30">
                    <a href="javascript:;">${data.introduction}</a>
                </div>
                <div class="gp-content gp-f16">
                    <p style="text-indent: 2em;"></p>
                    <p style="text-align: center"><img src="${baseUrlApi+data.profilePicture}" alt="" width="300" height="420" border="0" vspace="0" title="" style="width: 300px; height: 420px;"></p> 
                    <p style="text-align: center; text-indent: 0em;"><span style="text-indent: 0em;">${data.name}</span></p> 
                    <p style="text-indent: 2em;">${data.details}</p> 
                    <div class="Annex gp-f20"></div>
                </div>`;
            $(".pageTitle").append(`<span>${data.introduction}</span>`)
            $(".gp-right").append(str);
        })
    }
    
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
                s+=`<a target='_blank' href="${val.linkAddress}" style="margin-right:20px">${val.name}</a>`
            })
            str+=`<div class="gp-f16" style="margin-bottom:10px;display:flex;"><span style="width:86px">${item.name}：</span><span style="width:calc(100% - 86px)">${s}</span></div>`
        });
        $(".addr").append(str);
    })
    
    //网站设置
});