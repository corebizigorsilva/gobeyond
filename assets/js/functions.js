$(document).ready(function () {

    Menu.init();
    Banners.init();
});

let Menu = {
   init: function () {
       let _self = this;

       _self.getMenuItems();
   },
    getMenuItems: function () {
       let _self = this;

       $.get('http://localhost:5000/json/menu.json').then((response) => {
               let test = response.map((category) => {
                   let retorno = _self.listMenuItems(category);
                   return retorno;
               });

               $(".nav ul").append(test);
        });
    },
    listMenuItems: function(category) {
        let _self = this
        let _html = "<li><a href=''>"+category.name+"</a>";

       if(category.children.length > 0){
           let _childHtml = category.children.map((cat) => {
               return _self.listMenuItems(cat);
           });

           _html += "<div class='nav__dropdown'><ul>" + _childHtml + "</ul></div>";
       }

        _html += "</li>";
       return _html;
    }
};

let Banners = {
    init: function () {
        let _self = this;

        _self.getBanners();
    },
    getBanners: function () {
        $.get('http://localhost:5000/json/banner.json').then((response) => {
            console.log(response);

            response.map((response) => {

                let html = `<div class="slide">
                <div class="shell">
                    <div class="cols">
                        <div class="col col--1of2">
                            <h1>Verdadeira Tradição corebiz</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>

                            <a href="#" class="btn btn--red">
                                <span>VER A COLEÇÃO</span>

                                <i class="ico-dot"></i>
                            </a>
                        </div><!-- /.col col-/-1of2 -->

                        <div class="col col--1of2">
                            <img src="assets/images/temp/slider-image1.jpg" alt="" class="hidden-xs hidden-sm">

                            <img src="assets/images/temp/slider-image1-mobile.jpg" alt="" class="hidden-md hidden-lg">
                        </div><!-- /.col col-/-1of2 -->
                    </div><!-- /.cols -->
                </div><!-- /.shell -->
            </div><!-- /.slide -->`

            $('.slides').append(html);

            });

            sliderInit();


        });
    },
    listBanners: function () {
        
    }
};

`
            <div class="slide">
                <div class="shell">
                    <div class="cols">
                        <div class="col col--1of2">
                            <h1>Verdadeira Tradição corebiz</h1>

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>

                            <a href="#" class="btn btn--red">
                                <span>VER A COLEÇÃO</span>

                                <i class="ico-dot"></i>
                            </a>
                        </div><!-- /.col col-/-1of2 -->

                        <div class="col col--1of2">
                            <img src="assets/images/temp/slider-image1.jpg" alt="" class="hidden-xs hidden-sm">

                            <img src="assets/images/temp/slider-image1-mobile.jpg" alt="" class="hidden-md hidden-lg">
                        </div><!-- /.col col-/-1of2 -->
                    </div><!-- /.cols -->
                </div><!-- /.shell -->
            </div><!-- /.slide -->`

function sliderInit() {
    $('.slider .slides').slick({
        dots: true,
        arrows: false
    });
    $('.slider-product .slides').slick({
        dots: true,
        arrows: false
    });
    $('.slider-featured .slides').slick({
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                infinite: true
            }
        }]
    });
    $('.list-gallery').each(function () {
        var $this = $(this);
        var slidesNumber = $this.data('slides-mobile');
        $this.slick({
            dots: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesNumber,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: true
                }
            }]
        });
    });
    imageZoom();
}

function sliderMobileInit() {
    if (is.Desktop) {
        if ($('.slider-mobile').hasClass('slick-initialized')) {
            $('.slider-mobile').slick('unslick');
        }

        if ($('.slider-mobile-secondary').hasClass('slick-initialized')) {
            $('.slider-mobile-secondary').slick('unslick');
        }
    } else {
        if (!$('.slider-mobile').hasClass('slick-initialized')) {
            $('.slider-mobile').slick({
                dots: false,
                arrows: false,
                infinite: true,
                autoplay: true,
                speed: 1000
            });
        }

        if (!$('.slider-mobile-secondary').hasClass('slick-initialized')) {
            $('.slider-mobile-secondary').slick({
                dots: true,
                arrows: false,
                infinite: false
            });
        }
    }
}

function imageZoom() {
    $('.product__zoom').each(function () {
        var $this = $(this);
        var $image = $this.closest('.product__image');
        var $imageContainer = $image.find('.product__image-zoom');
        var imgURL = $this.data('image');
        $this.zoom({
            on: 'click',
            url: imgURL,
            target: $imageContainer,
            onZoomIn: function onZoomIn() {
                $image.addClass('active');
            },
            onZoomOut: function onZoomOut() {
                $image.removeClass('active');
            }
        });
    });
}
