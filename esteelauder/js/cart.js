$(function(){

    var windowH;
    var topH;
    var bottomH;
    var ulH;

    //리사이즈 될때마다 ul의 높이 구하기
    $(window).resize(function(){
        ulHeight();
    }).resize();

    function ulHeight(){
        windowH=$(window).height();
        bottomH=$('.cart-list').not(':hidden').find('.bottom').outerHeight();        
        ulH=windowH-topH-bottomH;
        $('.cart-list').not(':hidden').find('ul').height(ulH);
    }    
    
    //장바구니 추가
    $('.icon-cart2').click(function(){
        var key =$(this).parents('li').data('key'); 
        var imgSrc =$(this).parents('li').find('img').attr('src');
        var name = $(this).parents('li').find('dt').text();
        var detail = $(this).parents('li').find('.info .swiper-slide-active a').text();
        var price;      
        
        if($(this).parents('li').find('.info .swiper-container').length!=0){
            price = $(this).parents('li').find('.info .swiper-slide-active strong').text();
        }else{
            price = $(this).parents('li').find('.info strong').text();
        }

        if(!$(this).hasClass('on')){
            //항목추가
            $(this).addClass('on');
            $.toast('장바구니에 담았습니다.',{duration : 2000});
            $('#shopping ul').append(`<li data-key="${key}">
                <label><input type="checkbox" class="icon icon-check"></label>
                <img src="${imgSrc}">
                <div class="text-box">
                    <dl>
                        <dt>${name}</dt>
                        <dd>${detail}</dd>
                    </dl>
                    <strong>${price}</strong>
                    <div class="count-change">
                        <button class="down">-</button>
                        <span>1</span>              
                        <button class="up">+</button>
                    </div>
                    <button class="btn-del">삭제</button>
                </div>
            </li>`);
        }else{
            $.toast('장바구니에 이미 담겨져있습니다.',{duration : 2000});
        }
    })
    //선택된 리스트 수량체크
    var shoppingCount = 0;

    //개별 삭제버튼
    $('.popup-cart').on('click', '.btn-del', function(){
        
        var key = $(this).parents('li').data('key');
        $(this).parents('li').remove();
        
            $('.product [data-key='+key+']').find('.icon-cart2').removeClass('on');
            if($(this).parents('li').find('input').prop('checked')){
                shoppingCount--;
            }
            $('#shopping .count').text(shoppingCount+'개');
            if(shoppingCount==0){
                $('#shopping .top input').prop('checked',false);
            }
        //금액계산
      totalPrice();   
    })

    //선택삭제
    $('.bottom .btn-del').on('click',function(){
        var checkCount=0;
        var contentsName= $(this).parents('.cart-list').attr('id');
        $(this).parents('.cart-list').find('li input').each(function(){
           
            if($(this).prop('checked')){
                checkCount++;
                var key= $(this).parents('li').data('key');
                $('.product li').each(function(){
                    //팝업창 안에 있는 체크된 리스트의 키값과 상품목록에 있는 리스트의 키값이 일치할 경우
                    if($(this).data('key')==key){
                        $(this).find('.icon-cart2').removeClass('on');
                        shoppingCount--;
                        $('#shopping .count').text(shoppingCount+'개');
                    }
                })
                $(this).parents('li').remove();
            }
        })
        $(this).parents('.popup-cart').find('.top input').prop('checked',false);
    })

    //전체선택(체크박스)
    $('.popup-cart .top input').change(function(){
        if($(this).prop('checked')){//체크를 한 상태
                $('#shopping li input').prop('checked',true);
                shoppingCount=$('#shopping li').length;
                $('#shopping .count').text(shoppingCount+'개');
        }else{ //체크를 안한 상태
                $('#shopping li input').prop('checked', false);
                shoppingCount=0;
                $('#shopping .count').text(shoppingCount+'개');
        }
        //금액계산
        totalPrice();
    })

    //개별체크박스 선택
    $('.cart-list').on('change','li input', function(){
        if($(this).prop('checked')){
            if($(this).parents('.cart-list').attr('id')=='shopping'){
                shoppingCount++;
                $('#shopping .count').text(shoppingCount+'개');
            }
        }else{
            $(this).parents('.popup-cart').find('.top input').prop('checked', false);
            if($(this).parents('.cart-list').attr('id')=='shopping'){
                shoppingCount--;
                $('#shopping .count').text(shoppingCount+'개');
            }
        }
        //금액계산
        totalPrice();
    })

    //수량체크
    $('.cart-list').on('click', '.count-change button', function(){
        var count = $(this).siblings('span').text();
        if($(this).hasClass('down')){
            count--;
            if(count<1){
                $.toast('최소 수량입니다.',{duration : 2000});
                count=1;
            }
        }else{
            count++;
            if(count>10){
                $.toast('최대 수량입니다.',{duration : 2000});
                count=10;
            }
        }
        $(this).siblings('span').text(count);

        //체크상태일때만 합계 계산 
        if($(this).parents('li').find('input').prop('checked')){
            totalPrice();
        }
    })

    //금액합산
    function totalPrice(){
        var total=0;
        $('#shopping li').each(function(){
            if($(this).find('input').prop('checked')){
                var price=parseInt($(this).find('strong').text().substring(4).replace(',',''));
                //각 리스트의 상품 수량(문자열을 숫자로 변환)
                var count=parseInt($(this).find('.count-change span').text());                                
                // console.log(price, count);     
                total=total+(price*count);           
            }
        })
        //합계를 출력할 때 다시 콤마를 붙여서 출력
        $('#shopping .total .price').text('KRW'+numberWithCommas(total));
    }
})