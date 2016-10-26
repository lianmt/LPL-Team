function getParams(name, link = location.href) {
  var reg = new RegExp(`(?:^|&)${name}=([^&]*)(?:&|$)`)
  var r = link.substring(link.indexOf('?') + 1).match(reg)
  if (r) {
      return decodeURIComponent(r[1])
  }
  return ''
}
var title =  getParams('title', location.href);

$('.title').text(title+'-标签');
