$('.card a').click(function() {
    $(this).toggleClass('rotate')
})

$('.card1 a').click(function() {
    $(this).toggleClass('rotate')
})

$(".phone-mask").mask("+7(999) 999-99-99");

$('.open-modal').click(function() {
    $('#modal').modal('toggle')
})



// faq
$('.faq').on('click', function(){
$(this).find('.plus').toggleClass('active');
$(this).find('.a').slideToggle(300);
});


//burger
$('.forBurger').on('click', function(){
$('body').toggleClass('ovh2');
$('.burger, .panel').toggleClass('active');
});
/*
$('.send').click(function() {
    $('.modal-dialog').css({
        'max-width' : '825px',
        'height' : 'auto',
        'align-items' : 'center',
    })

    $('#modal .row').addClass('open-md')

    $('#modal .col-xl-5').css({
        'display' : 'block',
    })
    $('#modal .col-xl-6').css({
        'display' : 'none',
    })
})
*/

var $win = $(window);
var $marker = $('#marker');

$win.scroll(function(){
    $a = $('.elipse-one').offset().top
    $b = $('.elipse-two').offset().top
    $c = $('.elipse-three').offset().top
    $d = $('.elipse-four').offset().top
    $pe = $(document).scrollTop() + ($(window).height() /2)
    console.log($a)
    console.log($b)
    console.log($c)
    console.log($d)
    console.log($pe)
    if ($a < $pe) {
        $(".elipse-one").addClass('elipse-active')
    } else {
        $(".elipse-one").removeClass('elipse-active')
    }
     if ($b < $pe) {
        $(".elipse-two").addClass('elipse-active')
    } else {
        $(".elipse-two").removeClass('elipse-active')
    }
     if ($c < $pe) {
        $(".elipse-three").addClass('elipse-active')
    } else {
        $(".elipse-three").removeClass('elipse-active')
    }
     if ($d < $pe) {
        $(".elipse-four").addClass('elipse-active')
    } else {
        $(".elipse-four").removeClass('elipse-active')
    }
})

//шэринг в соц сети
Share = {
    /**
     * Показать пользователю диалог шаринга в сооветствии с опциями
     * Метод для использования в inline-js в ссылках
     * При блокировке всплывающего окна подставит нужный адрес и ползволит браузеру перейти по нему
     *
     * @example <a href="" onclick="return share.go(this)">like+</a>
     *
     * @param Object _element - элемент DOM, для которого
     * @param Object _options - опции, все необязательны
     */
    go: function(_element, _options) {
        var
            self = Share,
            options = $.extend(
                {
                    type:       'vk',    // тип соцсети
                    url:        location.href,  // какую ссылку шарим
                    count_url:  location.href,  // для какой ссылки крутим счётчик
                    title:      document.title, // заголовок шаринга
                    image:        '',             // картинка шаринга
                    text:       '',             // текст шаринга
                },
                $(_element).data(), // Если параметры заданы в data, то читаем их
                _options            // Параметры из вызова метода имеют наивысший приоритет
            );
  
        if (self.popup(link = self[options.type](options)) === null) {
            // Если не удалось открыть попап
            if ( $(_element).is('a') ) {
                // Если это <a>, то подставляем адрес и просим браузер продолжить переход по ссылке
                $(_element).prop('href', link);
                return true;
            }
            else {
                // Если это не <a>, то пытаемся перейти по адресу
                location.href = link;
                return false;
            }
        }
        else {
            // Попап успешно открыт, просим браузер не продолжать обработку
            return false;
        }
    },
  
    // ВКонтакте
    vk: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);
  
        return 'http://vkontakte.ru/share.php?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image='       + encodeURIComponent(options.image)
            + '&noparse=true';
    },
  
    // Одноклассники
    wa: function(_options) {
        var options = $.extend({
                url:    location.href,
                text:   '',
            }, _options);
  
        return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
            + '&st.comments=' + encodeURIComponent(options.text)
            + '&st._surl='    + encodeURIComponent(options.url);
    },
  
    // Facebook
    fb: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);
  
        return 'http://www.facebook.com/sharer.php?s=100'
            + '&p[title]='     + encodeURIComponent(options.title)
            + '&p[summary]='   + encodeURIComponent(options.text)
            + '&p[url]='       + encodeURIComponent(options.url)
            + '&p[images][0]=' + encodeURIComponent(options.image);
    },
  
    // Живой Журнал
    lj: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                text:   '',
            }, _options);
  
        return 'http://livejournal.com/update.bml?'
            + 'subject='        + encodeURIComponent(options.title)
            + '&event='         + encodeURIComponent(options.text + '<br/><a href="' + options.url + '">' + options.title + '</a>')
            + '&transform=1';
    },
  
    // Твиттер
    insta: function(_options) {
        var options = $.extend({
                url:        location.href,
                count_url:  location.href,
                title:      document.title,
            }, _options);
  
        return 'http://twitter.com/share?'
            + 'text='      + encodeURIComponent(options.title)
            + '&url='      + encodeURIComponent(options.url)
            + '&counturl=' + encodeURIComponent(options.count_url);
    },
  
// Telegram
    tg: function (_options) {
        var options = $.extend({
            url: location.href          
        }, _options);
  
        return 'https://telegram.me/share?url='
            + encodeURIComponent(options.url);
    },
  
    // Mail.Ru
    mr: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);
  
        return 'http://connect.mail.ru/share?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&imageurl='    + encodeURIComponent(options.image);
    },
  
    // Открыть окно шаринга
    popup: function(url) {
        return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=626,height=436');
    }
}
$(document).on('click', '.social_share', function(){
Share.go(this);});