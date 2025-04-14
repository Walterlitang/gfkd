$(function() {
    const baseUrl='http://localhost:8085';
    const id = window.location.search.substring(4);
    $.get(baseUrl+'/api/articleComment/webByArticleId?articleId='+id,(res)=>{
        console.log(222222222222,res)
    })

    $.get(baseUrl+'/api/article/info?id='+id,(res)=>{
        const {data}=res;
        let str=`
            <div class="curTitle gp-f30">
                <a href="javascript:;">科大要闻</a>
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
        $("#gp-right").append(str);
    })
});