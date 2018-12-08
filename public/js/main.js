function toggleMenu() {
    var x = document.getElementById("navigation");
    if (x.className === "shown") {
        x.className = "hidden"
    } else {
        x.className = "shown";
    }
}

function cookiesAgreement(b) {
    if (b === true) {
        document.cookie = "cookiesAgreement=true";
        $(".cookies").animate({
            bottom: "-500px"
        }, 500, function () {
            console.log('Cookies přijaty.');
        });
    } else {
        document.cookie = "cookiesAgreement=false";
    }
}

function getCookiesAgreement() {
    var name = "cookiesAgreement=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var scroll = new SmoothScroll('a[href*="#"]', {
    easing: 'easeInOutCubic',
    speed: 500
});

$('.projects article').tilt({
    maxTilt: 2,
    scale: 1.01
});

$('#contact .card').tilt({
    maxTilt: 2,
    scale: 1.01
});

$('footer .right .logo').tilt({
    maxTilt: 40,
    scale: 1.01
});

$(document).ready(function () {

    if (getCookiesAgreement() == "true") {
        var cookiesAgreed = true;
    } else {
        var cookiesAgreed = false;
    }

    var cookiesAgreed = true;

    if (cookiesAgreed !== true) {
        $('.cookies').css('bottom', '0px');
    }

    $('#about .slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '350px',
        autoplay: true,
        autoplaySpeed: 5000,

        responsive: [{
                breakpoint: 1200,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '100px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '0px',
                    arrows: false
                }
            }
        ]

    });

    $("#contact .submit").click(function () {
        var email = $(".email").val();
        var subject = $(".subject").val();
        var message = $(".message").val();

        console.log(email, subject, message);
        if (message == '' || email == '' || subject == '') {
            $('.output p').text('Nevyplnil jsi všechny položky. Zkus to znovu.');
            $('.output p').css('background', 'rgb(254, 61, 62)');
            $('.output p').css('box-shadow', '0px 0px 10px 0px rgba(254, 61, 62, 0.25)');
            $('.output').css('height', 'auto');
        } else {
            // Returns successful data submission message when the entered information is stored in database.
            $.post("https://liturkey.eu/dev/app/php/contact.php", {
                email: email,
                subject: subject,
                message: message
            }, function (data) {
                console.log(data.status);
                if (data.status == "ok") {
                    $('.output p').text('Úspěch! Tvoje zpráva byla odeslána. Brzy se ti ozvu nazpátek.')
                    $('.output p').css('background', 'rgb(45, 218, 102)');
                    $('.output p').css('box-shadow', '0px 0px 10px 0px rgba(50, 245, 115, 0.25)');
                    $('.output').css('height', 'auto');
                    $('.form input').prop('disabled', true);
                    $('.form textarea').prop('disabled', true);
                } else {
                    $('.output p').text('Whoops. Někde se stala chyba. Chybový kód: ' + data.status)
                    $('.output p').css('background', 'rgb(254, 61, 62)');
                    $('.output p').css('box-shadow', '0px 0px 10px 0px rgba(254, 61, 62, 0.25)');
                    $('.output').css('height', 'auto');
                }
            });
        }
    });
});