$(function(){
    var newSwiper;//parent-tab1
    var bestSwiper;//parent-tab2
    var newInners=[];
    var newInnersInfos=[];
    var bestInners=[];
    var bestInnersInfos=[];
 
    //탭메뉴
    $('.tab-menu a').click(function(e){
        e.preventDefault();
        
        $('.tab-menu a').removeClass('active');
        $(this).addClass('active');

        var id = $(this).attr('href');
        $('.product > div').hide();
        $(id).show();

        if(newSwiper!=undefined){newSwiper.update();}
        if(bestSwiper!=undefined){bestSwiper.update();}
        
        if(newInners!=undefined){
            for (const i in newInners){
                newInners[i].update();
            }                
        }
        if(bestInners!=undefined){
            for (const i in bestInners){
                bestInners[i].update();
            } 
        }
        
        if(bestSwiper==undefined){
            bestSwiper=new Swiper('#best > .swiper-container',{
                slidesPerView: 3, 
                navigation: {
                    nextEl: '#best > .btn-group-cart > .swiper-button-next',
                    prevEl: '#best > .btn-group-cart > .swiper-button-prev',
                },  
                breakpoints: { 
                    1200: {
                        slidesPerView: 2,                        
                    },                    
                    767: {
                        slidesPerView: 1,                        
                    }
                }
            });
        }

        if(bestInners.length==0){
            $('#best .option .swiper-container').each(function(index, el){
                $(this).addClass('best'+index);
                var viewCount=$(this).find('.swiper-slide').length;
                if(viewCount>4){viewCount=5;}  
                var bestInner=new Swiper('.best'+index,{
                    slidesPerView: viewCount,
                    navigation: {
                        nextEl:'.best'+index+' + .btn-group2 > .swiper-button-next',
                        prevEl:'.best'+index+' + .btn-group2 > .swiper-button-prev',
                    },
                    nested:true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                });

                $(this).parent().next().children().addClass('bestInfo'+index);
                var bestInnersInfo= new Swiper('.bestInfo'+index,{
                    slidesPerView: 1,
                    effect:'fade',
                    nested:true,
                    thumbs: {
                        swiper: bestInner
                    },
                });
                bestInners.push(bestInner);
                bestInnersInfos.push(bestInnersInfo);
            })
        }
    })
    
    newSwiper=new Swiper('#new > .swiper-container',{
        navigation: {
            nextEl: '#new > .btn-group-cart > .swiper-button-next',
            prevEl: '#new > .btn-group-cart > .swiper-button-prev',
        },
        slidesPerView: 3,
        breakpoints: {
            1200: {
                slidesPerView: 2,                        
            },                    
            767: {
                slidesPerView: 1,                        
            }
        }
    });

    $('#new .option .swiper-container').each(function(index, el){
        $(this).addClass('new'+index);
        var viewCount=$(this).find('.swiper-slide').length;
        if(viewCount>4){viewCount=5;}      
        var newInner =new Swiper('.new'+index,{
            slidesPerView: viewCount,
            navigation: {
                nextEl: '.new'+index+' + .btn-group2 .swiper-button-next',
                prevEl: '.new'+index+' + .btn-group2 .swiper-button-prev',
            },
            nested:true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true, 
        }
    );

    $(this).parent().next().children().addClass('newInfo'+index);
    var newInnersInfo= new Swiper('.newInfo'+index,{
        effect:'fade',
        nested:true,
        thumbs: {
            swiper: newInner
        },
    });
    newInners.push(newInner);
    newInnersInfos.push(newInnersInfo);
    })

    $('.swiper-slide a').click(function(e){
        e.preventDefault();
    })

    // 상품리스트 가격 콤마로 변경하기
    $('.product strong').each(function(){
        var price=$(this).text();
        $(this).text('KRW '+(numberWithCommas(price)));
    })
})

//3자리마다 콤마찍기
function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
