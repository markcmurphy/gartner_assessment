window.cxl_closed_popup = false;

const lookOptipophtml = '<div class="custom-looking-wrapper">' + '<div class="custom-inner-content">' + '<div class="custom-details">' + '<h1>Haven\'t Found What You\'re Looking For?</h1>' + '<p>Finding software can be overwhelming. We have expert advisors who can give you a short list of software to look at, so you don\'t have to waste your  time sifting through hundreds of vendors</p>' + '<div class="button-wrapper">' + '<div class="custom-btn white-bg">' + '<a class="custom-revert">I Want Do This Myself</a>' + '</div>' + '<div class="custom-btn orange-bg">' + '<a class="open-popup">Talk to A Software Expert</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';

let iFramehtml = '<div class="custom-iframe-pop-wrap">' + '<div class="custom-iframe-wrap">' + '<a class="modal-close">x</a>' + '<iframe src="https://www.softwareadvice.com/sa_lightbox_responsive.php?industry_id=11&type=faststart"></iframe>' + '</div>' + '</div>';


// Trigger popUpHtml() after scrolling past 5 cards
let n = 0;
var cards = document.querySelectorAll('#products .card.card-clickable');
let observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            n++;
        }

        if (entry.isIntersecting && n >= 5) {
            popUpHtml();
        };

    });
}, {
    threshold: 1
});

document.querySelectorAll('#products .card.card-clickable').forEach(div => observer.observe(div));

function popUpHtml() {

    if (window.cxl_closed_popup === false) {
        var cards = document.querySelectorAll('#products .card.card-clickable');

        if (cards.length > 8) {
            for (var i = 8; i < cards.length; i++) {
                cards[i].style.display = "none";
            }

            var cards = document.querySelectorAll('#products .card.card-clickable');
            cards[5].classList.add('custom-blur');
            cards[6].classList.add('custom-blur');
            cards[7].classList.add('custom-blur');

            var newNode = document.createElement('div');
            newNode.innerHTML = lookOptipophtml;
            newNode.classList.add('custom-popup-wrapper');

            cards[7].appendChild(newNode);

            document.querySelector(".custom-revert").addEventListener("click", function (e) {
                cards[5].classList.remove('custom-blur');
                cards[6].classList.remove('custom-blur');
                cards[7].classList.remove('custom-blur');

                for (var i = 8; i < cards.length; i++) {
                    cards[i].style.display = "block";
                }

                document.querySelector('.custom-popup-wrapper').style.display = "none";
                window.cxl_closed_popup = true;
            });


            document.querySelector(".open-popup").addEventListener("click", function (event) {
                // append iFrame
                var newNode1 = document.createElement('div');
                newNode1.className = 'custom-iframe-wrapper';
                newNode1.innerHTML = iFramehtml;

                document.querySelector('#products').appendChild(newNode1);

                document.querySelector('.custom-popup-wrapper').style.display = "none";

                if (document.querySelectorAll('.custom-iframe-wrapper').length > 1) {
                    document.querySelectorAll('.custom-iframe-wrapper')[1].outerHTML = ''; // Remove if there are more than 1
                }

                document.querySelector("body").classList.add('active-popup');

                document.querySelector('.custom-iframe-wrap a.modal-close').addEventListener("click", function (event) {
                    document.querySelector("body").classList.remove('active-popup');
                    cards[5].classList.remove('custom-blur');
                    cards[6].classList.remove('custom-blur');
                    cards[7].classList.remove('custom-blur');

                    for (var i = 8; i < cards.length; i++) {
                        cards[i].style.display = "block";
                    }

                    document.querySelector('.custom-iframe-wrapper').style.display = "none";
                    window.cxl_closed_popup = true;
                });
                document.querySelector(".custom-iframe-wrap").addEventListener("click", function (event) {
                    event.stopPropagation();
                });

            });

        }
    }
    if (document.querySelectorAll('.custom-popup-wrapper').length > 1) {
        document.querySelectorAll('.custom-popup-wrapper')[1].outerHTML = ''; // Remove if there are more than 1
    }
    if (document.querySelectorAll('.custom-iframe-wrapper').length > 1) {
        document.querySelectorAll('.custom-iframe-wrapper')[1].outerHTML = ''; // Remove if there are more than 1
    }
};
