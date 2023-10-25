'use strict';

$('#burger').on('click', function () {
    $('#menu').addClass('open')
});

$('#menu *').each(function () {
    $(this).on('click', function () {
        $('#menu').removeClass('open')
    })
});