// home

let hash = location.hash;
if(hash){
  hash = hash.slice(1);
  // console.log('hash', hash);
  
  $('.'+hash).addClass('active').siblings().removeClass('active');
  $('.link-'+hash).addClass('active').siblings().removeClass('active');
  $('.title').text($('.link-'+hash).find('.tab-label').text());
}

$('.tab-link').on('click', function (e) {
  var $this = $(this);
  $('.title').text($this.find('.tab-label').text())
  $this.addClass('active')
            .siblings('.tab-item').removeClass('active');

  var href = $this.attr('data-tab');
  // console.log('href', $this.attr('data-tab'));
  $('.tabs').find('.' + href).show().siblings('.content').hide()

  history.replaceState(null,null,this.getAttribute('href'));
})

$('#search').change(function(e) {
  var $this = $(this);
  var text = $this.val();
  if (text) {
    location.href = '/search'
  }
});

