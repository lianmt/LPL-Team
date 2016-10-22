// 用户详情页

var user = location.href;

if(user.indexOf('lianmingtang') > 0) {
  $('.main-img').attr('src', '/images/me.jpg')
} else if(user.indexOf('pengbincheng') > 0) {
  $('.main-img').attr('src', '/images/bincheng.jpg')
} else if(user.indexOf('linweijian') > 0) {
  $('.main-img').attr('src', '/images/weijian.jpg')
}
