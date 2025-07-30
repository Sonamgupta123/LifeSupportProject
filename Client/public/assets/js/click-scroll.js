// jquery-click-scroll
// by syamsul 'isul' Arifin

var sectionArray = [1, 2, 3, 4, 5, 6];

$(document).ready(function () {
    // Initial nav state
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');

    $.each(sectionArray, function (index, value) {
        // Scroll event
        $(document).scroll(function () {
            var target = $('#section_' + value);
            if (target.length) {
                var offsetSection = target.offset().top - 90;
                var docScroll = $(document).scrollTop();
                var docScroll1 = docScroll + 1;

                if (docScroll1 >= offsetSection) {
                    $('.navbar-nav .nav-item .nav-link').removeClass('active');
                    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
                    $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
                    $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
                }
            }
        });

        // Click event
        $('.click-scroll').eq(index).click(function (e) {
            e.preventDefault();
            var target = $('#section_' + value);
            if (target.length) {
                var offsetClick = target.offset().top - 90;
                $('html, body').animate({
                    scrollTop: offsetClick
                }, 300);
            }
        });
    });
});
