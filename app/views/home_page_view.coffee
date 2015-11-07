PageView = require 'views/base/page_view'

module.exports = class HomePageView extends PageView
  template: require 'views/templates/home'
  container: '.container'
  containerMethod: 'html'
