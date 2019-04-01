$(function(){
    // 工具提示的初始化
    $('[data-toggle="tooltip"]').tooltip()
    // 标记是否是移动端
    var isMobile = true
    // 发送请求
    function init(){
        $.ajax({
            type:'get',
            url:'./data/imgData.json',
            dataType:'json',
            success:function(result){
                // console.log(result)
                // 获取当前屏幕的类型
                if($(window).width() >= 768){
                    isMobile = false
                }else{
                    isMobile = true
                }
                // 调用模板引擎生成图片动态结构
                var html = template('bannerTemp',{'list':result,isMobile:isMobile})
                // console.log(html)
                $('.carousel-inner').html(html)
                // 生成点标记动态结构
                var indiHTML = template('IndicatorTemp',{'list':result})
                $('.carousel-indicators').html(indiHTML)
            }
        })
    }
    init()

    $(window).on('resize',function(){
        // 如果宽度从768以下变化到768以上，就需要重新生成一次
        // 如果宽度从768以上变化到768以下，也需要重新生成一次
        // 我们如何进行判断？
        var width = $(window).width()
        if((isMobile && width > 768) || (!isMobile && width < 768)){
            isMobile = width > 768 ? false:true
            init()
        }
    })


    $('.carousel').carousel({
        interval: 2000
      })

    // 实现移动端的touch--手动轮播
    var startX,distanceX
    var carousel_inner = $('.carousel-inner')[0]
    carousel_inner.addEventListener('hover',function(e){
        $('.carousel').carousel('pause')
    })
    carousel_inner.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].clientX
    })
    carousel_inner.addEventListener('touchend',function(e){
        distanceX = e.changedTouches[0].clientX - startX
        if(Math.abs(distanceX) > 50){
            if(distanceX > 0){
                $('.carousel').carousel('prev')
            }else{
                $('.carousel').carousel('next')
            }
        }
    })


    // 动态计算产品块导航项的宽度
    var allLi = $('.wjs_product .nav-tabs').find('li')
    var totalWidth = 0
    // 遍历，获取每一个li的宽度，累加
    allLi.each(function(index,value){
        // width():只是获取内容的宽度
        // innerWidth():获取内容+padding
        // outerWidth():获取内容+padding+border
        // outerWidth(true):获取内容+padding+border+margin
        totalWidth += $(value).outerWidth()
        console.log($(value).outerWidth())
    })
    console.log(totalWidth)
    $('.wjs_product .nav-tabs').width(totalWidth+2)
    // 使用iScroll实现导航项的滑动
    var myScroll =  new  IScroll('.wjs_parent',{
        scrollX: true, //支持水平滑动
        scrollY: false //设置不支持垂直滑动
    })
})