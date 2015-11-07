PageView = require 'views/base/page_view'

module.exports = class AboutPageView extends PageView
  template: require 'views/templates/about'
  container: '.container'
  containerMethod: 'html'
