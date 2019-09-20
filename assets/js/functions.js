$(document).ready(function () {
    Menu.init();
    Banner.init();
    Vitrine.init();
    Form.init();
    Contato.init();
});

let Menu = {

    init: function () {
        this.getMenuItens();
        //Chama a função getMenuItens
        //this.listMenuItem();
    },


    getMenuItens: function () {
        let _self = this;

        //Pega o caminho do "template" e faz um looping para listar cada categoria ou departamento do menu
        $.get('http://localhost:5000/json/menu.json').then((response) => {
            let test = response.map((category) => {
                let retorno = _self.listMenuItem(category);
                return retorno;

            });
            //Coloca o html gerado na função abaixo na classe ou id do html
            $(".nav ul").append(test);
        })
    },

    //na função abaixo será verificado se há herança nos arrays e caso sim, os lista e executa a propria função
    //aqui é aplicado de fato a recursividade.

    listMenuItem: function (tasty) {
        let _self = this;
        let _html = "<li><a href='" + tasty.url + "'>" + tasty.name + "</a>";

        if (tasty.children.length > 0) {
            let _childHtml = tasty.children.map((cat) => {
                return _self.listMenuItem(cat);

            });

            _html += "<div class='nav__dropdown'><ul>" + _childHtml + "</ul></div>";
        }

        _html += "</li>";
        return _html;
    }
}

let Banner = {
    init: function () {
        let _self = this;

        _self.getBanners();
    },
    getBanners: function () {
        let _self = this;
        //Aqui é uma simulação de como seria pegar uma informação de uma API
        $.get("http://localhost:5000/json/banner.json").then((response) => {
            _self.listBanners(response);
        });

    },
    listBanners: function (banners) {
        banners.map((response) => {
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


            $('.slides-banner').append(html);
        });
        sliderInit();
    }
}

let Vitrine = {
    init: function () {
        this.getVitrine();
    },
    getVitrine: function () {
        let _self = this;
        $.get('http://localhost:5000/json/vitrine.json').then((response) => {
            _self.listVitrine(response);

        });
    },

    //na função abaixo será verificado se há disponibilidade do produto, e quais são suas respectivas skus
    //skus são variáveis de um produto core
    listVitrine: function (items) {
        let _self = this;

        let _htmlVitrines = items.map((item) => {
            let skusAvailable = item.items.filter((sku) => {
                if (sku.sellers[0].commertialOffer.AvailableQuantity > 0) {
                    return sku;
                }
            });

            let price = _self.formatMoney(skusAvailable[0].sellers[0].commertialOffer.Price);
            let listPrice = _self.formatMoney(skusAvailable[0].sellers[0].commertialOffer.ListPrice);


            let _html = `<div class="col col--1of3">
            <div class="product">
                <div class="product__image">
                    <a href="#">
                        <img src="`+ item.items[0].images[0].imageUrl + `" alt="">
                    </a>
                </div><!-- /.product__image -->
        
                <div class="product__content">
                    <p>`+ skusAvailable.length + ` possibilidades</p>
        
                    <h3>
                        <a href="#">`+ price + `</a>
                    </h3>
        
                    <ul class="list-price">
                        <li>
                            <del>`+ listPrice + `</del>
                        </li>
        
                        <li>
                            <strong>`+ price + `</strong>
                        </li>
                    </ul><!-- /.list-price -->

                    <a href="`+ skusAvailable[0].sellers[0].addToCartLink + `" target="_blank"> Comprar </a>
                                        
                </div><!-- /.product__content -->
            </div><!-- /.product -->
        </div><!-- /.col col-/-1of3 -->`;
            return _html;
        });
        $('.slide-vitrines').append(_htmlVitrines);
    },

    //Na função abaixo será convertida o padrão monetario para o especificado, no caso, BRL
    formatMoney: function (valor) {
        let _transfer = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return _transfer;
    }
}

let Form = {
    init: function () {
        let _self = this;
        //Evento ao enviar
        //Prevent default nao deixa o usuario ser redirecionado.
        $('#form-newsletter').submit((evt) => {
            evt.preventDefault();
            _self.validateForm();
        });

    },
    //Nao deixa o email ser vazio, e caso seja interrompe a função
    validateForm: function () {
        let _self = this;
        let email = $('#mail').val();

        if (email.length == 0) {
            $('.error').text("O campo email é obrigatorio");
            return false;
        }
        _self.sendForm(email);
    },

    //Aqui de fato é usado o metodo post para enviar o OBJETO para o servidor da Vtex
    sendForm: function (email) {
        let body = {
            "email": email
        }

        $.ajaxSetup({
            //Define o tipo de conteudo enviado e o tipo que aceita resposta
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.vtex.ds.v10+json'
            }
        });
        //Servidor no qual será enviado o arquivo Json
        $.post('https://corebiz.vtexcommercestable.com.br/api/dataentities/GB/documents', JSON.stringify(body))
            .then((retorno) => {
                alert("Conteudo enviado"); 
            });
    }

}

let Contato = {
    init: function () {
        let _self = this;
        $('#form-contato').submit((evt) => {
            evt.preventDefault();
            _self.validateContato();
        });
    },

    validateContato: function () {
        let _self = this;
        let email = $('#mail').val(); 
        let name = $('#name').val();
        let subject = $('#subject').val();
        let message = $('#message').val();

       
       if (email.length == 0){
        $('.error').text("O campo email é obrigatório");
        $(".error").show();
        $(".error1").hide();
        $(".error2").hide();
        return false;      
    }else{
        if (name.length == 0){
            $('.error1').text("O campo nome é obrigatório");
            $(".error").hide();
            $(".error1").show();
            $(".error2").hide();
            return false;
        }if (subject.length == 0){
            $('.error2').text("O campo assunto é obrigatório");
            $(".error").hide();
            $(".error1").hide();
            $(".error2").show();
            return false;
        }
    }
        
        _self.sendContato(email, name, subject, message); 

    },

    sendContato: function (email, name, subject, message) {
        let body = {
            "email": email,
            "name": name,
            "subject": subject,
            "message": message
        }

        $.ajaxSetup({
            
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.vtex.ds.v10+json'
            }
        });


        
        $.post('https://corebiz.vtexcommercestable.com.br/api/dataentities/tc/documents', JSON.stringify(body)).then((retorno) => {
            console.log(retorno); 
        });
    }
}

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

