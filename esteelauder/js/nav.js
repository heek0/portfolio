$(function(){
    $(window).scroll(function(){
        var scrollTop=$(window).scrollTop();
        var windowH=$(window).height()/4;
        var windowW=$(window).width();
        if(windowW>767){//pc
            if(scrollTop>windowH){
                $('nav').removeClass('open')
                $('nav').css('background','#fff')
                $('.icon-arrow').css('opacity','1')
                $('#btn-menu').css('opacity','1')
            }else{
                $('nav').addClass('open')
                $('nav').css('background','none')
                $('.icon-arrow').css('opacity','0')
                $('#btn-menu').css('opacity','0')
            }
            $('nav').removeClass('depth2 depth3')
            $('nav *').removeClass('active');
        }
    }).scroll();


    $('#btn-menu').click(function(e){
        e.preventDefault();
        $('nav').toggleClass('open');
        if(!$('nav').hasClass('open')){
            $('nav').removeClass('depth2 depth3')
            $('nav *').removeClass('active');
        }
    })

    $('.gnb1 > li > a').click(function(e){
        e.preventDefault();
        //gnb1초기화 및 활성화
        $('.gnb1 > li > a').removeClass('active');
        $(this).addClass('active');
        //gnb2초기화 및 활성화
        $('.gnb2, .gnb2 a').removeClass('active');
        $(this).next().addClass('active');
        //gnb3초기화
        $('.gnb3').removeClass('active');
        $('nav').removeClass('depth3');

        if($(this).next().length!=0){
            $('nav').addClass('depth2');
        }else{
            $('nav').removeClass('depth2');
        }    
    })

    $('.gnb2 > ul > li > a').click(function(e){
        e.preventDefault();
        //gnb2초기화 및 활성화
        $('.gnb2 > ul > li > a').removeClass('active');
        $(this).addClass('active');
        //gnb3초기화
        $('.gnb3').removeClass('active');
        $(this).next().addClass('active');
        if($(this).next().length!=0){
            $('nav').addClass('depth3');
        }else{
            $('nav').removeClass('depth3');
        }    
    })

    $('.icon-arrow-back').click(function(){
        $(this).parent().removeClass('active');
    })
})