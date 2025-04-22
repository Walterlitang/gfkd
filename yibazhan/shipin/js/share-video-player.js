var GlobalClickNum=0;
var playerIDList=[];

	
	// debugger
	//var pPlayer = divPlayer.getElementsByTagName('p')[0];
	
	// var divPlayerImgResponsive2 = document.querySelector('.divPlayerImgResponsive');
	// debugger
	//pPlayer.style="object-fit:cover;text-align:center;margin: 0;line-height: 1;width:100%;overflow:hidden;height:"+ imgContainerHeight;
	
	
$(function(){
    

	var initMeida = function(videoUrl,coverUrl,node,curData) {
		$(node).hide();
        var videoid = "my-video"+(GlobalClickNum++);
		var divPlayerWidth = curData.divPlayerWidth;
		var imgContainerHeight = curData.imgContainerHeight;
        addPlayerIDList(videoid);
				 var videoHtml='<div class="videoContainer" style="width: '+ divPlayerWidth +'px;overflow: hidden;display: block;position: relative;margin: 15px auto;height:'+ imgContainerHeight +'px"><video style="width:'+ divPlayerWidth +'px;height:'+ imgContainerHeight +'px;padding:0" id="' + videoid + '" class="video-js  vjs-big-play-centered" controls preload="none"  ></video></div>';
    //     var iWSon = document.documentElement.clientWidth;
				// var iWSon = document.documentElement.clientWidth;
        // if(iWSon > 640){
        	
        	
        	 
        // }else{
        // 	var videoHtml='<div class="videoContainer" style="width: 100%;overflow: hidden;display: block;position: relative;margin: 15px auto;"><video id="' + videoid + '" class="video-js  vjs-big-play-centered" controls preload="none"   ></video></div>';
        // }
        //var videoHtml='<div class="videoContainer" style="width: 480px;overflow: hidden;display: block;position: relative;margin: 15px auto;"><video id="' + videoid + '" class="video-js  vjs-big-play-centered" controls preload="none"  ></video></div>';
        $(node).after(videoHtml);
        mediaPlayerInit(videoid,videoUrl,coverUrl,curData.id)
        pauseOtherPlayer(videoid);


    };
    var addPlayerIDList = function(videoid) {
        if(!isContainPlayerID(videoid)){
            playerIDList.push(videoid);
        }
    };
    var isContainPlayerID=function(videoid){
        if(playerIDList){
            for(var i=0;i<playerIDList.length;i++){
                if(playerIDList[i] == videoid){
                    return true;
                }
            }
        }else{
            return false;
        }
        return false;
    };
    var pauseOtherPlayer=function(videoid){
        for(var i=0;i<playerIDList.length;i++){
            if(playerIDList[i] != videoid){
                let videoid2 = playerIDList[i];
                if(document.getElementById(videoid2)!=null){
                	videojs(videoid2).pause();
                }
                
            }
        }
    };

    var mediaPlayerInit = function(videoid,videoSrc,jpgUrl,mid) {
        var videoHtmlId='#'+videoid;
        var videoType = "application/x-mpegURL";
        videojs(videoid, {
            controls: true,
            preload: "auto",
            poster: jpgUrl,
            sources: [
                {
                    src: videoSrc,
                    type: videoType
                }
            ],
            autoplay: true,
            loop: false,
            muted:false,
            volume:0,
            language: 'zh-CN',
            fluid: true,

            nativeControlsForTouch: false,
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
            bigPlayButtion: true, 
            textTrackButtion: false,
            errorDisplay: false,
            playbackRates:[0.5,1,1.5,2,3],
            controlBar: { 
                currentTimeDisplay: true,
                durationDisplay: true,
                // playbackRateMenuButton: false,  //播放速率
                remainingTimeDisplay: false,
                timeDivider: true,
                progressControl: true,
                volumePanel: {
                    inline: false
                },
                muteToggle: false,
                fullscreenToggle: true 
            },
            techOrder: ["html5"] 

        }, function onPlayerReady() {
            var vdthis = this;
            videojs.log('ok');
            $("#"+videoid+" .vjs-time-control").show();
            vdthis.volume(0.5);
            vdthis.play();

            //vdthis.currentTime(currMedia.playTime);
            vdthis.on('play', function () {
                $("#"+videoid+ "  .vjs-big-play-button").hide();
                // pauseOtherPlayer(videoid);
            })


            vdthis.on("click", function () {
                pauseOtherPlayer(videoid);
            });
            vdthis.on('ended', function () {
                videojs.log('ended');
            })

            vdthis.on('timeupdate', function (e) {
            });

            vdthis.on('pause', function () {
                $("#"+videoid + "  .vjs-big-play-button").show();
            });

            
            this.on('error', function () {
                var mediaError = this.error();
				console.log(mid,$("#"+mid).parentsUntil(".divPlayerImgResponsive").parent());
				var tDiv = $("#"+mid).parentsUntil(".divPlayerImgResponsive").parent();
				tDiv.next().remove();
				tDiv.show();
                alert("视频正在转码中，请稍后重试");
                if (mediaError.code == 1) {
                } else if (mediaError.code == 2) {
                } else if (mediaError.code == 3) {
                } else if (mediaError.code == 4) {
                } else if (mediaError.code == 5) {
                }
            });

        });

    }

    /*$("img.videoCover").off('click').on('click', function() {
        GlobalClickNum++;
		console.log("点击视频封面",$(this).attr("src"),$(this).attr("data-video"));
		var coverUrl = $(this).attr("src");
		coverUrl = coverUrl.replace("\\","/");
		var videoUrl = $(this).attr("data-video");
        initMeida(videoUrl,coverUrl,"videoPlayDiv");
        return false;
    });*/
	//imgContainerHeight:,divPlayerWidth:
	var sizeData = {};
	var divPlayer = $('.divPlayerImgResponsive');
		divPlayer.each(function(){
			var that = $(this)
			var divPlayerWidth = that.width();
			//debugger
			var imgContainer = that.find('img').eq(0);
			var imgWidth = imgContainer.attr('data-width');
			var imgHeight = imgContainer.attr('data-height');
			var imgContainerHeight =  divPlayerWidth * imgHeight / imgWidth;
			if(imgContainerHeight>0){
				imgContainer.height = imgContainerHeight;
			}
			sizeData[imgContainer.attr("id")] = {imgContainerHeight:imgContainerHeight,divPlayerWidth:divPlayerWidth,id:imgContainer.attr("id")};
		
		});
		console.log("sizeData",sizeData);
	$(".divPlayerImgResponsive").off('click').on('click', function() {
        GlobalClickNum++;
		var videoImgObj = $(this).find("img");
		var coverUrl = videoImgObj.attr("src");
		coverUrl = coverUrl.replace("\\","/");
		var videoUrl = videoImgObj.attr("data-video");
		var curData = sizeData[videoImgObj.attr("id")];
        initMeida(videoUrl,coverUrl,this,curData);
        return false;
    });
		
});
