// document.onreadystatechange = function() {
//     if (document.readyState === "interactive") {

//     }
// }
$(window).on('load', () => {
    // variables
    let swiperWork, swiperReviews, scrollPosition, swiperSliderInner;
    // /variables
    // Page load
    if (document.querySelector('.work__slider'))
        swiperWork = new Swiper('.work__slider .swiper-container', {

            grabCursor: true,
            simulateTouch: false,
            autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.work__slider .swiper-button-next',
                prevEl: '.work__slider .swiper-button-prev',
            },
            pagination: {
                el: '.work__slider .swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                700: {
                    slidesPerView: 'auto',
                    spaceBetween: 100,
                },
            },
            on: {
                slideChange: (swiper) => {
                    $('.work__slider-navigation-slide--active').removeClass('work__slider-navigation-slide--active');
                    $($('.work__slider-navigation-slide')[swiper.activeIndex]).addClass('work__slider-navigation-slide--active');
                    // console.log($('.work__slider-navigation-slide--active'))
                }
            }
        })
    if (document.querySelector('.company__slider'))
        new Swiper('.company__slider', {
            spaceBetween: 20,
            grabCursor: true,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.company__slider .swiper-button-next',
                prevEl: '.company__slider .swiper-button-prev',
            },
            pagination: {
                el: '.company .swiper-pagination',
                type: 'bullets',
            },
        })
    if (document.querySelector('.slider__swiper'))
        new Swiper('.slider__swiper', {
            slidesPerView: 1,
            spaceBetween: 35,

            grabCursor: true,

            autoHeight: true,
            navigation: {
                nextEl: '.slider__swiper .swiper-button-next',
                prevEl: '.slider__swiper .swiper-button-prev',
            },
            pagination: {
                el: '.slider__swiper .swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                1100: {
                    spaceBetween: 25,
                    slidesPerView: 'auto',
                },
            },
        })
    if (document.querySelector('.slider__swiper-inner'))
        swiperSliderInner = new Swiper('.slider__swiper-inner', {
            slidesPerView: 1,
            spaceBetween: 35,

            grabCursor: true,

            autoHeight: true,
            effect: 'fade',
            simulateTouch: false,
            fadeEffect: {
                crossFade: true
            },
            on: {
                slideChange: (swiper) => {
                    $('.swiper-slide__tag--active').removeClass('swiper-slide__tag--active');
                    $(`.swiper-slide__tag[data-slide-number="${swiper.activeIndex + 1}"]`).addClass('swiper-slide__tag--active')
                },
            },
        })
    if (document.querySelector('.keys__slider') && $(window).width() <= 1100)
        new Swiper('.keys__slider', {
            spaceBetween: 32,
            grabCursor: true,
            autoHeight: true,
            pagination: {
                el: '.keys .swiper-pagination',
                type: 'bullets',
            },
        })
    if (document.querySelector('.reviews__slider'))
        swiperReviews = new Swiper('.reviews__slider', {
            spaceBetween: 32,
            // slidesPerView: 'auto',
            grabCursor: true,
            autoHeight: true,
            effect: 'fade',
            simulateTouch: false,
            fadeEffect: {
                crossFade: true
            },
            on: {
                slideChange: (swiper) => {
                    if (swiper.el.querySelectorAll('.swiper-slide').length - swiper.activeIndex === 2) {
                        $(swiper.el).addClass('reviews__slider--prev-last')
                        $(swiper.el).removeClass('reviews__slider--last')
                    }
                    if (swiper.el.querySelectorAll('.swiper-slide').length - swiper.activeIndex === 1) {
                        $(swiper.el).addClass('reviews__slider--last')
                    }
                    if (swiper.el.querySelectorAll('.swiper-slide').length - swiper.activeIndex > 2) {
                        $(swiper.el).removeClass('reviews__slider--last')
                        $(swiper.el).removeClass('reviews__slider--prev-last')
                    }
                    $(swiper.el).toggleClass('reviews__slider--active')
                },
                slideChangeTransitionEnd: (swiper) => {
                    $(swiper.el).toggleClass('reviews__slider--active')
                    console.log(swiper.el.querySelectorAll('.swiper-slide').length - swiper.activeIndex)
                }

            },
            navigation: {
                nextEl: '.reviews__slider .swiper-button-next',
                prevEl: '.reviews__slider .swiper-button-prev',
            },
        })
    $('.question__element--open .question__element-answer').slideToggle(400)
    checkLineInScreen.bind(window)()
    checkColumnInScreen.bind(window)();
    checkNumberInScreen.bind(window)()

    $(window).width() <= 700 && $('.statistics__card-diagram-column').each((index, item) => {
        $(item).css('width', item.style.height)
        $(item).css('height', '100%')
    })
    $('.tools__element-modal').each((index, modal) => {
        $(modal).offset().left <= 0
            ? $(modal).addClass('tools__element-modal--right')
            : $(modal).addClass('tools__element-modal--left')

    })
    $('.tools__block').toggleClass('tools__block--active')
    // /Page load
    // ----------------------------------------------
    // universal function
    $('a[href^="#"]').on('click', function (event) {
        if (String(this).slice(-1) !== '#') {
            event.preventDefault();
            let sc = $(this).attr("href"),
                dn = $(sc).offset().top;
            $('html, body').animate({ scrollTop: dn - 100 }, 1000);
        }
    });
    // function isTouchDevice() {
    //     return 'ontouchstart' in window
    //         || navigator.maxTouchPoints;
    // }
    function scrollEmulation() {
        if (!document.querySelector('body').classList.contains('block')) scrollPosition = window.scrollY;
        let documentWidth = parseInt(document.documentElement.clientWidth)
        let windowsWidth = parseInt(window.innerWidth)
        let scrollbarWidth = windowsWidth - documentWidth
        $('body').css('padding-right', scrollbarWidth + 'px');
        $('body').toggleClass('block')
        setTimeout(() => {
            window.scrollTo({
                top: scrollPosition
            })
        }, 40)

    }
    function ajaxRequest(ajaxForm, url) {
        try {
            history.replaceState(null, null, "#")
        } catch (z) {
            console.log(z)
        }
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: $("#" + ajaxForm).serialize(), // Сеарилизуем объект
            success: function (response) {
                //Данные отправлены успешно
                let result = $.parseJSON(response)
                console.log(result)
            },
            error: function (response) {
                // Данные не отправлены
                alert("Ошибка. Данные не отправлены.")
            },
        })
    }
    //  /universal function
    // ----------------------------------------------
    // event
    // const arrLinesStatistic = [];
    // for(const line of document.querySelectorAll('.statistics__card-line')){
    //     arrLinesStatistic.push(line.offset().top);
    // }
    $('.tools__element').on('click', function () {
        // scrollEmulation()

        $(this).toggleClass('tools__element--active')
        $('.modal-overlay').toggleClass('modal-overlay--active')
        // $(this).find('.tools__element-modal').toggleClass('tools__element-modal--visible')
    })
    $('.swiper-slide__tag').on('click', function () {
        $('.swiper-slide__tag--active').removeClass('swiper-slide__tag--active');
        $(this).addClass('swiper-slide__tag--active');
        swiperSliderInner.slideTo($(this).data('slide-number') - 1)
    })
    $('.swiper-slide__link--button').on('click', function () {
        scrollEmulation()
        $('.modal-overlay').toggleClass('modal-overlay--active')
        $('.modal--work').toggleClass('modal--active')
        $(`.modal--work .modal__content[data-work-id="${$(this).data('work-id')}"]`).toggleClass('modal__content--active')
    })
    $('.callback-button').on('click', function () {
        scrollEmulation()
        $('.modal-overlay').toggleClass('modal-overlay--active')
        $('.modal--callback').toggleClass('modal--active')
    })
    $('.modal__close').on('click', closeModal)
    $('.modal-overlay').on('click', (e) => {
        if (e.target.className == 'modal-overlay modal-overlay--active') {
            closeModal()
        }
    })
    $(window).scroll(function () {
        checkLineInScreen.bind(window)()
        checkColumnInScreen.bind(window)();
        checkNumberInScreen.bind(window)()
    });
    $('.tag--switch').on('click', function () {
        $('.tag--active').removeClass('tag--active')
        $(this).addClass('tag--active')
        if ($(this).data('keys-type') !== 0) {
            for (const key of document.querySelectorAll('.swiper-slide')) {
                typeof $(key).data('keys-type') === 'string'
                    ? $(key).data('keys-type').split('|').find((type) => type == $(this).data('keys-type'))
                        ? $(key).removeClass('swiper-slide--hidden')
                        : $(key).addClass('swiper-slide--hidden')
                    : $(key).data('keys-type') === $(this).data('keys-type')
                        ? $(key).removeClass('swiper-slide--hidden')
                        : $(key).addClass('swiper-slide--hidden')
            }
        } else {
            $('.swiper-slide--hidden').removeClass('swiper-slide--hidden')
        }

    })
    $('.menu__burger').on('click', function () {
        $('.menu').toggleClass('menu--open')
        $('body').toggleClass('block')
    })
    $('.work__slider-navigation-slide').on('click', function () {
        $('.work__slider-navigation-slide--active').removeClass('work__slider-navigation-slide--active');
        $(this).addClass('work__slider-navigation-slide--active');

        swiperWork.slideTo($(this).data('number-slide') - 1)
    })
    $('.formats__list-element').on('mouseenter', function () {
        $(`.formats__img[data-number-formats="${$(this).data('number-formats')}"]`).addClass('formats__img--active')
    })
    $('.formats__list-element').on('mouseleave', function () {
        $(`.formats__img[data-number-formats="${$(this).data('number-formats')}"]`).removeClass('formats__img--active')
    })
    $('.swiper-slide__text-more').on('click', function () {
        // $(e.target).parent('.swiper-slide').find('.swiper-slide__text')

        // $(this).parent('.swiper-slide').find('.swiper-slide__text').animate({ height: '100%' }, 0);

        $(this).parent('.swiper-slide').find('.swiper-slide__text').toggleClass('swiper-slide__text--open')
        $(this).parent('.swiper-wrapper').toggleClass('swiper-wrapper--short')

        swiperReviews.updateAutoHeight(100)
    })
    $('.question__element').on('click', function () {
        $(this).toggleClass('question__element--open');
        $(this).closest('.question__element').find('.question__element-answer').slideToggle(400)
    })


    $('.help__form-input--phone').on('focus', (e) => {
        if (!e.target.value.length) e.target.value = '+7 '
    })
    $('.help__form-input--phone').on('input', (e) => {
        if (e.target.value.replace(/\D/g, '').length <= 1) e.target.value = '+7 '
        else {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + (x[3] ? ') - ' + x[3] : '') + (x[4] ? ' - ' + x[4] : '') + (x[5] ? ' - ' + x[5] : '');
        }
    });

    // forms
    $("#form-help").on("submit", (e) => {
        e.preventDefault()
        ajaxRequest("form-help", "test.php")
    })
    $("#form-callback").on("submit", (e) => {
        e.preventDefault()
        ajaxRequest("form-callback", "test.php")
    })
    // /forms
    // /event
    // ----------------------------------------------
    // unique function
    function closeModal() {
        $('.modal--active').removeClass('modal--active')
        $('.modal-overlay--active').removeClass('modal-overlay--active')
        $('.modal__content--active').removeClass('modal__content--active')
        $('.tools__element--active').removeClass('tools__element--active')
        document.querySelector('body.block') && scrollEmulation()
    }
    function checkNumberInScreen() {
        for (const number of document.querySelectorAll('.statistics__card-number')) {
            if ($(this).scrollTop() > $(number).offset().top - $(window).height()) {
                var $this = $(number);
                if ($this.text() === '0') {
                    jQuery({ Counter: 0 }).animate({ Counter: +$this.data('number-end').toString().replace(/\s+/g, '') }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function () {
                            $this.text((Math.ceil(this.Counter) + '').split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, ""));
                        }
                    });
                }
            } else {
                $(number).text('0')
            }
        }
    }
    function checkLineInScreen() {
        for (const line of document.querySelectorAll('.statistics__card-line')) {
            if ($(this).scrollTop() > $(line).offset().top - $(window).height()) {
                $(line).addClass('statistics__card-line--visible')
            } else {
                $(line).removeClass('statistics__card-line--visible')
            }
        }
    }
    function checkColumnInScreen() {
        for (const line of document.querySelectorAll('.statistics__card-diagram-column')) {
            if ($(this).scrollTop() > $(line).offset().top - $(window).height()) {
                $(line).addClass('statistics__card-diagram-column--visible')
            } else {
                $(line).removeClass('statistics__card-diagram-column--visible')
            }
        }
    }
    // /unique function
    // ----------------------------------------------

});
