var bg = document.querySelector('.item-bg');
var items = document.querySelectorAll('.news_item');
var item = document.querySelector('.news_item');
var mode05Left = document.getElementsByClassName('mode05_slides')[0].getBoundingClientRect().left;

function cLog(content) {
    console.log(content)
}
$(function () {
    var aHeight = [];
    $('.news_item .infoBox').each(function (index, element) {
        aHeight.push($(this).innerHeight())
    });
    // $('.news_item .infoBox').css('height',Math.max(...aHeight));
    $('.news_item .infoBox').css('height',Math.max.apply(null, aHeight));
})

if($(window).width() > 800) {
    $('.wrap_mode05').on("mouseover", ".news_item", function (_event, _element) {
        var x = $(this).offset().left - mode05Left;
        var y = $(this).offset().top;
        var width = $(this).outerWidth();
        var height = $(this).outerHeight();

        $('.item-bg').addClass('active');
        $('.news_item').removeClass('active');
        $(this).addClass('active');
        // $('.news_item').removeClass('active');

        bg.style.width = width + 'px';
        bg.style.height = height + 'px';
        bg.style.transform = 'translateX(' + x + 'px )';
    });
    $('.wrap_mode05').on("mouseleave", ".news_item", function (_event, _element) {
        $('.item-bg').removeClass('active');
        $('.news_item').removeClass('active');
    })

    $(window).resize(function () {
        if( $('.news_item.active').length > 0 ) {
            mode05Left = document.getElementsByClassName('mode05_slides')[0].getBoundingClientRect().left;
            var _this = $('.news_item.active');
            var x = $(_this).offset().left - mode05Left;
            var y = $(_this).offset().top;
            var width = $(_this).outerWidth();
            var height = $(_this).outerHeight();

            bg.style.transform = 'translateX(' + x + 'px )';
            bg.style.width = width + 'px';
            bg.style.height = height + 'px';
        }
    });
    $('.body_b').scroll(function () {
        if( $('.news_item.active').length > 0 ){
            mode05Left = document.getElementsByClassName('mode05_slides')[0].getBoundingClientRect().left;
            var _this = $('.news_item.active');
            var x = $(_this).offset().left - mode05Left;
            var y = $(_this).offset().top;
            var width = $(_this).outerWidth();
            var height = $(_this).outerHeight();
    
            bg.style.transform = 'translateX(' + x + 'px )';
            bg.style.width = width + 'px';
            bg.style.height = height + 'px';
        }
    });
}

var mode05_slides = new Swiper('.mode05_slides', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    slidesPerView: 3,
    spaceBetween: 45,
    speed: 300,
    // autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false
    // },
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 3,
        slideShadows: false
    },
    breakpoints: {
        998: {
            spaceBetween: 45,
            slidesPerView: 3,
            centeredSlides: true
        },
        320: {
            spaceBetween: 45,
            slidesPerView: 1,
            centeredSlides: true
        }
    },
    simulateTouch: true,
    navigation: {
        nextEl: '.news-slider-next',
        prevEl: '.news-slider-prev'
    },
    pagination: {
        el: '.news-slider__pagination',
        clickable: true,
        type : 'progressbar',
    },
    on: {
        init: function () {
            var activeItem = document.getElementsByClassName('mode05_slides')[0].querySelector('.swiper-slide-active');
            var sliderItem = activeItem.querySelector('.news_item');
            $('.swiper-slide-active .news_item').addClass('active');
            var x = sliderItem.getBoundingClientRect().left - mode05Left;
            var y = sliderItem.getBoundingClientRect().top;
            var width = sliderItem.getBoundingClientRect().width;
            var height = sliderItem.getBoundingClientRect().height;
            $('.item-bg').addClass('active');
            bg.style.width = width + 'px';
            bg.style.height = height + 'px';
            bg.style.transform = 'translateX(' + x + 'px )';
            // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
        }
    }
});

mode05_slides.on('touchEnd', function () {
    $('.news_item').removeClass('active');
    $('.swiper-slide-active .news_item').addClass('active');
});

mode05_slides.on('slideChange', function () {
    $('.news_item').removeClass('active');
});

mode05_slides.on('slideChangeTransitionEnd', function () {
    $('.news_item').removeClass('active');
    var activeItem = document.querySelector('.swiper-slide-active');
    var sliderItem = activeItem.querySelector('.news_item');
    $('.swiper-slide-active .news_item').addClass('active');
    var x = document.querySelector('.swiper-slide-active .news_item').getBoundingClientRect().left - mode05Left;
    var y = document.querySelector('.swiper-slide-active .news_item').getBoundingClientRect().top;
    /* var width = sliderItem.getBoundingClientRect().width;
    var height = sliderItem.getBoundingClientRect().height; */
    $('.item-bg').addClass('active');
    /* bg.style.width = width + 'px';
    bg.style.height = height + 'px'; */
    bg.style.transform = 'translateX(' + x + 'px )';
    // bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
});
