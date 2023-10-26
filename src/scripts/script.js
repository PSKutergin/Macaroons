'use strict';

const main = () => {
    const orderForm = $('.order-form');
    const orderCard = $('.order-card');
    const productInp = orderForm.find('#product');
    const nameInp = orderForm.find('#name');
    const phoneInp = orderForm.find('#phone');
    const buttonForm = orderForm.find('.order-form-btn');
    const loader = $('.loader');
    const url = 'https://testologia.site/checkout';

    const validForm = (form) => {
        let count = 0

        form.find('input').each(function () {
            $(this).removeClass('error')
            $(this).next().hide()

            if (!$(this).val()) {
                $(this).addClass('error')
                $(this).next().show()
                count++
            }
        })

        return count
    };

    const animate = ({ timing, draw, duration }) => {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    };

    $('#burger').on('click', function () {
        $('#menu').addClass('open')
    });

    $('#menu *').each(function () {
        $(this).on('click', function () {
            $('#menu').removeClass('open')
        })
    });

    buttonForm.on('click', function () {
        if (!validForm(orderForm)) {
            loader.css('display', 'flex');

            $.post(url, { product: productInp.val(), name: nameInp.val(), phone: phoneInp.val() })
                .done(function (message) {
                    loader.hide();

                    if (message && message.hasOwnProperty('success') && message.success === 1) {
                        animate({
                            duration: 1000,
                            timing(timeFraction) {
                                return timeFraction;
                            },
                            draw(progress) {
                                orderForm.css('opacity', `${1 - progress}`).hide();
                                orderCard.css('display', 'flex').css('opacity', `${progress}`);
                            }
                        });

                        setTimeout(() => {
                            animate({
                                duration: 1000,
                                timing(timeFraction) {
                                    return timeFraction;
                                },
                                draw(progress) {
                                    orderCard.css('opacity', `${1 - progress}`).hide();
                                    orderForm.show().css('opacity', `${progress}`);
                                }
                            })
                        }, 3000)
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!')
                    }
                });

            orderForm[0].reset()
        }
    })
};

main()