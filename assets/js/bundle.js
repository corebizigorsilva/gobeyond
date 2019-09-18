/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/assets/js/main.js":
/*!********************************!*\
  !*** ../src/assets/js/main.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (window, document, $) {
  var $win = $(window);
  var $doc = $(document);
  var $body = $('body');
  var classes = {
    Hover: 'hover',
    Active: 'active',
    ShowNavMain: 'show-nav-main',
    FixedHeader: 'show-fixed-header',
    PageLoad: 'page-load'
  };
  var is = {
    Mobile: false,
    Desktop: false,
    Tablet: false
  };
  var get = {
    Scroll: 0,
    WinWidth: 0
  };
  addDeviceResolution();
  addBaseClickEvents();
  fieldNumberCounter();
  searchAutocomplete();
  accordion();
  customSelect();
  niceScrollInit();
  repositionMobile();
  detectBrowsers();
  $win.on('load', function () {
    $body.addClass(classes.PageLoad);
    $('.jsRatingBar').each(function () {
      var $this = $(this);
      var $bar = $this.find('.rating__bar span');
      $bar.css('width', $this.data('value') + '%');
    });
    detectBrowsers();
  });
  $win.on('scroll', function () {
    get.Scroll = $win.scrollTop();
    $body.toggleClass(classes.FixedHeader, get.Scroll > 10);
  });
  $win.on('resize orientationchange', function () {
    addDeviceResolution();
  });

  function detectBrowsers() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var msedge = ua.indexOf("Edge");

    if (msedge > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      $('html').addClass("browser-edge");
    }

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      $('html').addClass("browser-ie");
    }
  }

  function repositionMobile() {
    $('[data-prepend]').each(function () {
      var $this = $(this);
      var $clone = $this.clone().addClass('mobile-clone');
      var newPosition = $this.data('prepend');
      $(newPosition).prepend($clone);
    });
    $('[data-append]').each(function () {
      var $this = $(this);
      var $clone = $this.clone().addClass('mobile-clone');
      var newPosition = $this.data('append');
      $(newPosition).append($clone);
    });
  }

  function niceScrollInit() {
    if (is.Tablet || is.Mobile) {
      var $link = $('.nav .nav__dropdown > ul > li');
      var $scrollContainer = $link.find('ul');
      $scrollContainer.niceScroll({
        cursorcolor: '#ae1232',
        cursorwidth: '4px',
        background: 'transparent',
        cursorborder: 0,
        cursorborderradius: '5px'
      });
      $link.click(function () {
        setTimeout(function () {
          $scrollContainer.getNiceScroll().resize();
        }, 400);
      });
      $('.box-cart .box__body').niceScroll({
        cursorcolor: '#999',
        cursorwidth: '4px',
        background: 'transparent',
        cursorborder: 0,
        cursorborderradius: '5px',
        autohidemode: false
      });
      var $filterLink = $('.section-products .sidebar .accordion__head a');
      var $filterScrollContainer = $filterLink.closest('.accordion__section').find('.accordion__body');
      $filterScrollContainer.niceScroll({
        cursorcolor: '#ae1232',
        cursorwidth: '4px',
        background: 'transparent',
        cursorborder: 0,
        cursorborderradius: '5px'
      });
      $filterLink.click(function (e) {
        setTimeout(function () {
          $filterScrollContainer.getNiceScroll().resize();
        }, 400);
      });
    }
  }


  function customSelect() {
    $('.select select').selectric({
      disableOnMobile: false,
      nativeOnMobile: false
    });
  }

  function accordion() {
    $('.jsAccordionDesktop .accordion__head a').click(function (e) {
      if (is.Desktop) {
        e.preventDefault();
        var $this = $(this);
        $this.closest('.accordion__section').toggleClass('expanded').find('.accordion__body').stop(true, false).slideToggle();
      }
    });
    $('.jsAccordion .accordion__head a').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.closest('.accordion__section').toggleClass('expanded').find('.accordion__body').stop(true, false).slideToggle();
    });
    $('.jsFooterAccordion .footer__title').click(function () {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        $this.siblings('.list-links').slideToggle().parent().toggleClass('expanded');
      }
    });
  }

  function searchAutocomplete() {
    var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
    $(".search__field").autocomplete({
      source: availableTags
    });
  }

  function fieldNumberCounter() {
    $('.list-count').on('click', 'a', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $qtyField = $this.closest('.list-count').find('.qty-field');
      var fieldVal = parseInt($qtyField.val(), 10) || 0;
      var min = $qtyField.attr('min');
      var max = $qtyField.attr('max');

      if ($this.hasClass('qty-less')) {
        if (fieldVal != min) {
          fieldVal--;
        }

        ;
      } else {
        if (fieldVal < max) {
          fieldVal++;
        }

        ;
      }

      ;

      if (fieldVal < 10) {
        $qtyField.val('0' + fieldVal);
      } else {
        $qtyField.val(fieldVal);
      }
    });
  }

  function addBaseClickEvents() {
    $('.nav__dropdown > ul > li > a, .nav__dropdown > ul > li > .ico-angle-down').click(function (event) {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        var $parent = $this.parent();
        var $dropdown = $this.closest('.nav__dropdown');

        if ($parent.hasClass(classes.Hover)) {
          $dropdown.removeClass('expanded');
        } else {
          $dropdown.addClass('expanded');
        }
      }
    });
    $('.nav__dropdown > ul > li > a, .nav__dropdown > ul > li > .ico-angle-down').click(function (event) {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        var $parent = $this.parent();

        if ($parent.find('> ul, .nav__dropdown').length) {
          event.preventDefault();
          $parent.toggleClass(classes.Hover).siblings().removeClass(classes.Hover);
        }
      }
    });
    $('.nav > ul > li > a, .nav > ul > li > .ico-angle-down').click(function (event) {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        var $parent = $this.parent();

        if ($parent.find('> ul, .nav__dropdown').length) {
          event.preventDefault();
          $parent.toggleClass(classes.Hover).siblings().removeClass(classes.Hover).find('> ul, .nav__dropdown').slideUp();
          $parent.find('> ul, .nav__dropdown').slideToggle();
        }
      }
    });
    $('.section-products .sidebar .accordion__head a').click(function () {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        var $accSection = $this.closest('.accordion__section');
        var $accordion = $this.closest('.accordion-filter');

        if ($accSection.hasClass(classes.Hover)) {
          $accordion.removeClass('expanded');
        } else {
          $accordion.addClass('expanded');
        }
      }
    });
    $('.section-products .sidebar .accordion__head a').click(function (event) {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        var $accSection = $this.closest('.accordion__section');

        if ($accSection.find('> .accordion__body').length) {
          event.preventDefault();
          $accSection.toggleClass(classes.Hover).siblings().removeClass(classes.Hover);
        }
      }
    });
    $('.section-products .sidebar .widgets .widget__title').click(function (event) {
      if (is.Tablet || is.Mobile) {
        var $this = $(this);
        var $parent = $this.parent();

        if ($parent.find('> .widget__body').length) {
          event.preventDefault();
          $parent.toggleClass(classes.Hover).siblings().removeClass(classes.Hover).find('> .widget__body').slideUp();
          $parent.find('> .widget__body').slideToggle();
        }
      }
    });
    $('.btn-menu').click(function (event) {
      event.preventDefault();
      $body.toggleClass(classes.ShowNavMain).find('.nav-wrapper').slideToggle();
    });
    $('.jsToggleActive').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      var target = $this.attr('href');
      $('.jsToggleActive[href="' + target + '"]').toggleClass('active');
      $(target).toggleClass('active');
    });
    $('.product__wishlist').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('active');
    });
    $('.list-grid a').click(function (e) {
      e.preventDefault();
      $(this).parent().addClass('current').siblings().removeClass('current');
    });
    $('.btn-search').click(function () {
      if (is.Mobile || is.Tablet) {
        setTimeout(function () {
          $('.search__field').focus();
        }, 400);
      }
    });
  }

  function addDeviceResolution() {
    get.WinWidth = $win.width();
    is.Desktop = get.WinWidth > 1024;
    is.Mobile = get.WinWidth <= 767;
    is.Tablet = get.WinWidth <= 1024 && get.WinWidth >= 768;
  }
})(window, document, window.jQuery);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map