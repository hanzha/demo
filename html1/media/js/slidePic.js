$(function(){
	
	//fancybox settings
	$("#screenshot a").fancybox({
			padding:0,
			margin:80,
			openEffect : 'elastic',
			openSpeed  : 150,
			closeEffect : 'elastic',
			closeSpeed  : 150,
			helpers:{
				overlay:{
					locked: false
				}
			}
		});
			
	$('.news_list a[rel="popNews"]').fancybox({
		type: 'ajax',
		dataType : 'html',
		headers  : { 'X-fancyBox': true },
		
		padding:0,
		margin:80,
		
		openEffect : 'none',
		closeEffect : 'none',
		
		maxWidth: 1000,
		minWidth: 500,
		
	});
	
	
    function slidePic(e) {
        var time;
        var obj = $(e);
        var num = obj.find("li").length;

        function autoSlide() {
            obj.find(".btn_next").click();
        }
        time = setTimeout(function(){autoSlide()},5000);

        // 定义，参数 interval 决定触发的最小间隔
        function samplingRate(interval) {
            var mark = 0;
            return function() {
                var now;
                now = Date.now();
                if (now - mark < interval) {
                    return false;
                }
                return mark = now;
            };
        };
        //使用，时间间隔限制
        var sampling = samplingRate(500);

        obj.find(".btn_next").click(function(){
            if(sampling()){
                clearTimeout(time);
                var i = obj.find("li.cur").index();
                var n = i+1>=num?0:i+1;
                obj.find("li").eq(n).css("left","100%");
                obj.find("li.cur").animate({"left":"-100%"},500).removeClass("cur");
                obj.find("li").eq(n).animate({"left":"0"},500).addClass("cur");
                time = setTimeout(function(){autoSlide()},5000);
            }
        });

        obj.find(".btn_prev").click(function(){
            if(sampling()){
                clearTimeout(time);
                var i = obj.find("li.cur").index();
                var p = i-1<0?num-1:i-1;
                obj.find("li").eq(p).css("left","-100%");
                obj.find("li.cur").animate({"left":"100%"},500).removeClass("cur");
                obj.find("li").eq(p).animate({"left":"0"},500).addClass("cur");
                time = setTimeout(function(){autoSlide()},5000);
            }
        });
    }
    slidePic(".banner_wrap");
});