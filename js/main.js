jQuery(document).ready(function () {
    
// gallety
    
    $('#small li img').click(function (event) {
        var link = $(this).attr('src');
        
        $('#large img').attr('src', link);
        $('html, body').animate({scrollTop: $('#large img').offset().top}, 400);
        
        event.stopPropagation;
        event.preventDefault();
    });
    
// mobile menu  media 
    
    $('.head-mob-menu i').click(function () {
        $('.menu').toggleClass('activ-mob-menu');
    });
    
// mobile menu   open
    
    $('body').on('click', '.activ-mob-menu .under-menu', function () {
        $(this).find('.menu-sub').toggle();
        var icon = 'plus';
        
        if ($(this).find('.menu-sub').is(':visible')) {
            icon = 'minus';
        }
        $(this).find('.icon-close').attr('class', 'fa fa-' + icon + ' icon-close');
    });
    
// validation contact form 
    
    $('.contact-form').submit(function (event) {
        $('.contact-form .error').remove();
    
        var data = validator('.contact-form');
        
        if (data === false) {
            return false;
        }
        
        $('.contact-form').remove();
        $('.contact-info').html('<h2 class="text-center">Ваше сообщение отправлено</h2>');
        event.preventDefault;
        return false;
    });
    
// modal window open
     $('body').on('click', '.room-pre-order', function (event) {
        event.preventDefault();
        
        $('.modal-info').removeAttr('style');
        $(this).parent().addClass('activ-room');
        
        var name =  $(this).siblings('.number-room-name').text();
        var room =  $(this).siblings('.number-room-name').data('room');
        
        $('.modal-name').html(name);
        $('input[name="room"]').val(room);
		$('.overlay').fadeIn(400, function () {
				$('.modal').css('display', 'block').animate({opacity: 1}, 200);
		});
	});
    
 // modal window close 
    
	$('.modal-close, .overlay').click(function () {
        $('.room-pre-order').parent().removeClass('activ-room');
		$('.modal').animate({opacity: 0}, 200, function () {
            $(this).css('display', 'none');
            $('.overlay').fadeOut(400);
        });
	});
    
// buy a room 
    
    disabledRoomButton();
    $('.modal-form').submit(function (event) {
        event.preventDefault();
        $('.modal-info').removeAttr('style');
        $('.modal-form .error').remove();
        
        var data = validator('.modal-form');
        
        if (data === false) {
            return false;
        }
        
        data.room = $('.modal-form input[name="room"]').val();
        var free = +$('.activ-room .numbers-room-free-count').text();
        var busy = +$('.activ-room .numbers-room-busy-count').text();
        var countRoom = +$('.modal input[name="count"]').val();
        
        if (free  < countRoom) {
            $('.modal-info').css({
                display: 'block',
                color: 'red'}).html('Укажите меньшее количество проживающих');
            return false;
        }
        
        $('.modal-info').css({
                display: 'block',
                color: 'grey' }).html('Ваша заявка отправлена!');
        $('.activ-room .numbers-room-free-count').text(free - countRoom);
        $('.activ-room .numbers-room-busy-count').text(busy + countRoom);
        disabledRoomButton();
        
    });
    
// only numders
    
    $('.modal-form input[name="count"]').keydown(function (event) {
        if (event.keyCode > 57) {
            event.preventDefault();
        }
    })
    
//slider 
    
    sliderWidth();
    $('.nav i').click(function () {
        $('.nav i').removeClass('active');
		console.log($('.nav i.active'));
        $(this).addClass('active');
        setMargin(400);
        
    });
    
//pagination
    
    pagination(5);
    $('body').on('click', '.pagination li', function () {
        $('.pagination li').removeClass('active');
        $(this).addClass('active');
        var elem = $('.pagination li').index(this);
    $('.gallery-small-photo li').css('display', 'none');
        for (var i = 0; 5 > i; i++){
            try {
                $('.gallery-small-photo li:eq('+(elem*5+i)+')').css('display','inline');
            } catch (err) {
                console.log (err + 'Неправильно работает цикл')
            }
            
        }
     });
    
// search
    
    $('.search input[name="search"]').keypress(function(){
        var  a = $(this).val();
        var s =  $('.numbers').html();
        $('.numder-text:contains("'+a+'")').css('border', '1px solid red');
    });
    
// sort

    $('.filters input[name="sort"]').click(function(){
        var inputVal = $(this).val();
        var data = [];
        
        $('.numbers-room').each( function () {
            data.push({ key: [parseInt($(this).find('.price').text())],
                    value: $(this).prop('outerHTML')          
            });
        });
		
        data.sort(function(a, b) {
			if (a.key == b.key){ 
				return 0;
			}		
            if (inputVal == 'cheap'){ 
				if (a.key < b.key)
					return -1;
				else
					return 1;
            } else if ( inputVal == 'expensive' ){
				if (a.key > b.key)
					return -1;
				else
					return 1;
            }
        }); 

        var total = '';
        $.each( data, function( key, value ) {
           total += value.value;
        });

        $('.numbers').html(total);
    });
    
//filter
    
   $('.filters input[name="free-busy"]').click( function(){
        $('.numbers-room').removeClass('filter-free-busy');
        var name = $(this).val();
        if (name == 'free'){
            $('.numbers-room.all-busy').addClass('filter-free-busy');;
           
        } else if (name == 'busy') {
            console.log($('.numbers-room'));
            $('.numbers-room').not('.all-busy').addClass('filter-free-busy');;
        }
    })
       
    
    $('.filters input[name="see"]').click( function(){
        $('.numbers-room').removeClass('filter-see');
        var name = $(this).val();
        $('.numbers-room').not('.'+name).addClass('filter-see');
   });
// remove filter
    $('.remove-filter').click(function(){
        $('.numbers-room').removeClass('filter-see filter-free-busy');
        $('.filters input[name="see"]').prop('checked', false);
         $('.filters input[name="free-busy"]').prop('checked', false);
    })
    
});



$(window).resize(function() {
    sliderWidth()
    setMargin()
});

function disabledRoomButton(){
    $('.numbers-room-free-count').each(function(){
        if (+$(this).text() == 0 ){
            console.log(2);
            $(this).css('color','red');
            $(this).parent('.numbers-room-free').siblings('.room-pre-order').attr('disabled','disabled');
             $(this).parent().parent().parent('.numbers-room').addClass('all-busy');
        }
    })
}

function pagination(number){
    var all = Math.ceil($('.gallery-small-photo li').length / number);
    
    if(all <= 0) return false;
    
    for(var i = 1; all >= i; i++ ){
        $('.pagination').append('<li>'+i+'</li>')
    }
    $('.pagination').css('display','block');
    $('.pagination li').first().addClass('active');
    $('.gallery-small-photo li:gt('+ (number-1) +')').css('display','none')
}

function setMargin(time){
    var width =  $('.slider').width();
    var element = $('.nav i.active')
    var count = $('.nav i').index(element);
    if (time != undefined){
        $('.slider-list').animate({marginLeft: '-'+width*count+'px'}, time);
    }
    else {
        $('.slider-list').css('margin-left','-'+width*count+'px')
    }
}


function sliderWidth(){
    var width =  $('.slider').width();
    $('.slider-list li').width(width);
        
}

function sliderResizeWidth(){
    var width =  $('.slider').width();
    $('.slider-list li').width(width);
}

function validator (elem) {
        var data =[];
        var error = {}
        data.email = $(elem +' input[name="email"]').val();
    
        if ( !data.email.match(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i)){
              error.email = $(elem +' input[name="email"]').siblings('label').text();
        }

  
        if ( $(elem +' input[name="count"]').length > 0 && isNaN(parseInt($(elem +' input[name="count"]').val()))){ 
               error.count = $(elem +' input[name="count"]').siblings('label').text();
        }
    
        if (!$.isEmptyObject(error) ){
            var text; 
            for (key in error){
                  text =   error[key].replace('*','');
                 $(elem +' input[name="'+key+'"]').after('<span class="error red">Поле "'+ text +'" обязательное для заполнения</span>')   
            } 
             return false;
        }
    
        data.name = $(elem +' input[name="name"]').val();
        data.tel = $(elem +' input[name="tel"]').val();
        data.message = $(elem +' textarea[name="message"]').val();
        return data;
}