/* 返回顶部 */
function scrolltopBar(){
 
  
  /* 返回顶部的显示/隐藏 */
  $(document).scroll(function(){
    var scrollH = $(document).scrollTop() ||  $(window).scrollTop();
    if(scrollH < 100){
      $('.back_top').fadeOut(50);
    }else{
      $('.back_top').fadeIn(50);
    };
  });

  /* 返回顶部 */
  $('.back_top').click(function(){
    $('body,html,.all').animate({scrollTop:0},800);
  });
}

/* 现场回顾 */
function PRIcon(){
  var num = 0;
  var timer=null;  
  $('.PR_icon').mouseover(function(){
    var myindex = $(this).parent().index();
    $(this).stop().addClass('PR_icon_cur');
    $(this).parent().siblings().children('.PR_icon').stop().removeClass('PR_icon_cur');
    $('.PR_show li').eq(myindex).stop().addClass('PR_show_cur');
    $('.PR_show li').eq(myindex).siblings().stop().removeClass('PR_show_cur');
    num=myindex;
  })
	
  function autoplay(){
    num++;
    if(num>5){num=0};
    $('.PR_icon').eq(num).stop().addClass('PR_icon_cur');
    $('.PR_icon').eq(num).parent().siblings().children('.PR_icon').stop().removeClass('PR_icon_cur');
    $('.PR_show li').eq(num).stop().addClass('PR_show_cur');
    $('.PR_show li').eq(num).siblings().stop().removeClass('PR_show_cur');
  }
  timer=setInterval(autoplay,2000);

  $('.PR_icon').hover(function(){                     //鼠标移上时，自动播放暂停；
    clearInterval(timer);
    clearInterval(autoChange);
  },function(){
    clearInterval(timer);
    timer=setInterval(autoplay,2000);
  })
  $('.PR_icon').click(function(){                     //鼠标移上时，自动播放暂停；
    clearInterval(timer);
    clearInterval(autoChange);
  },function(){
    clearInterval(timer);
    timer=setInterval(autoplay,2000);
  })
	var curIndex=0;
  imgLen=$('.PR_show li').length;
  var autoChange = setInterval(function(){ 
        if(curIndex <  imgLen-1){ 
            curIndex ++; 
        }else{ 
            curIndex = 0;
        }
        //调用变换处理函数
        changeTo(curIndex);  
    },2000);
  $(".left").hover(function(){ 
        //滑入清除定时器
        clearInterval(autoChange);
        
    },function(){ 
        //滑出则重置定时器
        autoChangeAgain();
    });
    //左箭头点击处理
    $(".left").click(function(){ 
        //根据curIndex进行上一个图片处理
        curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
        changeTo(curIndex);
        
        clearInterval(timer); 
    });   
     //右箭头滑入滑出事件处理
    $(".right").hover(function(){ 
         //滑入清除定时器
         clearInterval(autoChange);
     },function(){ 
         //滑出则重置定时器
         autoChangeAgain();
     });
     //右箭头点击处理
    $(".right").click(function(){ 
         curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
         changeTo(curIndex);
         clearInterval(timer);
     });
    function autoChangeAgain(){ 
            autoChange = setInterval(function(){ 
            if(curIndex < imgLen-1){ 
                curIndex ++;
            }else{ 
                curIndex = 0;
            }
        //调用变换处理函数
            changeTo(curIndex);  
        },2000);
        }
    function changeTo(num){ 
            
        $('.PR_icon').eq(num).stop().addClass('PR_icon_cur');
    		$('.PR_icon').eq(num).parent().siblings().children('.PR_icon').stop().removeClass('PR_icon_cur');
    		$('.PR_show li').eq(num).stop().addClass('PR_show_cur');
    		$('.PR_show li').eq(num).siblings().stop().removeClass('PR_show_cur');
    }

}

/* 特色活动 */
function SE_carousel(){
    var oBox=$(".SE_conBox>.pic_list")[0];
    var oPrev=$(".SE_conBox>.prev")[0];
    var oNext=$(".SE_conBox>.next")[0];
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.children;
    var oOl=oBox.getElementsByTagName('ol')[0];
    var aBtn=oOl.children;
    var timer = null;
    var iNow=0;
    var left=0;

    //复制一份内容
    oUl.innerHTML+=oUl.innerHTML;
    oUl.style.width=aLi.length * (aLi[0].offsetWidth + 22) + 'px';
    var W=oUl.offsetWidth/2;

    //选项卡
    for(var i=0; i<aBtn.length; i++){
        (function(index){
            aBtn[i].onclick=function(){
                if(iNow%aBtn.length==aBtn.length-1 && index==0){
                    iNow++;
                }
                if(iNow%aBtn.length==0 && index==aBtn.length-1){
                    iNow--;
                }
                iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
                tab();
            }
        })(i);
    }

    function tab(){
        move(oUl,-iNow*(aLi[i].offsetWidth + 22));
    }

    //next
    oNext.onclick=function(){
        iNow++;
        tab();
        //document.title=iNow;
    };
    oPrev.onclick=function(){
        iNow--;
        tab();

        //document.title=iNow;
    };

    oNext.onmouseleave = oPrev.onmouseleave = function(){
        timer = setInterval(function(){
            tab();
            iNow++;
        },2000);
    };
    oNext.onmouseenter = oPrev.onmouseenter = function(){
        clearInterval(timer);
    };

    oNext.onclick();
    clearInterval(timer);
    timer = setInterval(oNext.onclick,2000);

    function move(obj,iTarget){
        var count=Math.round(500/30);
        var start=left;
        var dis=iTarget-start;
        var n=0;
        clearInterval(obj.timer);

        obj.timer=setInterval(function(){
            n++;

            var a=1-n/count;
            left=start+dis*(1-Math.pow(a,3));

            if(left<0){
                obj.style.left=left%W+'px';
            }else{
                obj.style.left=(left%W-W)%W+'px';
            }

            if(n==count){
                clearInterval(obj.timer);
            }
        },30);
    }
}
