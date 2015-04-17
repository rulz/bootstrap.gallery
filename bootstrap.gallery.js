!function ($) {
  // constructor
  var Gallery = function (element, options) {
    this.$element = $(element)
    $carousel = $('.carousel', element)
    this.options = options

    $carousel.carousel(options)

    var $items = $('.carousel .item', this.$element)
    $carousel.on('slid.bs.carousel', function(e) {
      var index = $('.item.active', this.$element).index('.item', this.$element)
      $(options.itemSelector, element).removeClass('active')
      $(options.itemSelector+'[data-item=' + index + ']', element).addClass('active')
    })
    this.$element.on('click', options.itemSelector, function(e) {
      var target = $(this).data('item')
      $carousel.carousel(parseInt(target))
      e.preventDefault()
    })

    this.$element.on('click', '.carousel-control', function(e) {
      var to = $(this).data('slide')
      $carousel.carousel(to)
      e.preventDefault()
    })
  }

  Gallery.prototype = {
  }

  // plugin definition
  $.fn.gallery = function(option) {
    return this.each(function() {
      var $this = $(this)
        , data = $this.data('gallery')
        , options = $.extend({}, $.fn.gallery.defaults, typeof option == 'object' && option)
      
      if (!data) {
        $this.data('gallery', (data = new Gallery(this, options)))
        $(options.itemSelector, $this).each(function(i, element) {
          $(element).attr('data-item', i)
        })
      }
    })
  }

  $.fn.gallery.defaults = {
    itemSelector: '.thumbnail',
  }

}(window.jQuery)
