$(function(){
    //상단팝업
    $('.icon-close-wh').click(function(){
        $('#top-banner').hide();
        $('.sub-left').css('margin-top','10px');
        $('.sub-right').css('top','10px');
        $('.popup-login').css('top','70px');
        $('.popup-cart').css('top','70px');
        $('.popup-search').css('top','70px');
    })
        
    //언어선택 드롭다운
    $('.lang-select button').click(function(){
        $('.lang-select .dropdown').slideToggle();
    })

    $('.lang-select a').click(function(e){
        e.preventDefault();
        var lang=$(this).text();
        $(this).parents('.lang-select').find('button span').text(lang);
        $(this).parents('.lang-select').find('a').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.lang-select').find('ul').slideUp();  
    })

    // page1
    var page1Img=['img/slide1_m.jpg', 'img/slide2_m.jpg', 'img/slide3_m.jpg', 'img/slide4_m.jpg']
    for (let index = 0; index < page1Img.length; index++) {        
        $('.page1 .swiper-slide').eq(index).css('background-image','url('+ page1Img[index]+')')
    }

    var page1Swiper = new Swiper('.page1 .swiper-container', {
        spaceBetween: 30,
        loop:true,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.page1 .swiper-pagination',
            clickable: true,
            }
        }
    );
    
    //page4
    $('.news-letter .icon-close').click(function(){
        $('.news-letter').hide();
        $('.insta .text').css('left','50%');
    })

    // page4 팝업
    $('.insta-image img').click(function(){
        var src=$(this).attr('src');
        var alt=$(this).attr('alt');
        console.log(src,alt);

        $('.page4-popup strong').text(alt);
        $('.page4-popup img').attr({
            src:src,
            alt:alt
        })
        $('.page4-popup').show();
        //동적으로 요소 생성
        $('.page4-popup').after('<div class="page4-popup-bg"></div>');

        //동적으로 생성된 .popup-bg는 아래의 패턴으로 이벤트 부여
        $('body').on('click','.page4-popup-bg',function(){               
            $('.page4-popup').hide();
            $('.page4-popup-bg').remove();
        }); 
    })

    
    //팝업 
    //로그인
    $('.icon-login').click(function(){
        $('.popup-login').slideToggle();
        $('.popup-cart').hide();
        $('.popup-search').hide();
    })
   
    //장바구니
    $('.icon-cart, .popup-cart .icon-close').click(function(){
        $('.popup-cart').slideToggle();
        $('.popup-login').hide();
        $('.popup-search').hide();
    })
    
    //검색
    $('.icon-search, .popup-search .icon-close').click(function(){
        $('.popup-search').slideToggle();
        $('.popup-login').hide();
        $('.popup-cart').hide();
    })
    
    //최근검색어의 키워드를 누르면 텍스트입력창에 키워드값 넣기
    $('.popup-search ul a').click(function(e){
        e.preventDefault();
        var keyword=$(this).text();
        $('.popup-search input').val(keyword);
    })

    //위로가기
    $(window).scroll(function(){
        var windowW=$(this).width();
        var scrollTop=$(this).scrollTop();
        if(windowW>767){
            if(scrollTop>150){
                $('header').addClass('scroll');
                $('.go-top').show();
            }else{
                $('header').removeClass('scroll');
                $('.go-top').hide();
            }
        }
    })
    $('.icon-go-top').click(function(){
        $('html').animate({ scrollTop:0 }, 700);
        return false;
    })
})