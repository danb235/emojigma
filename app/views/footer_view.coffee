View = require 'views/base/view'

module.exports = class FooterView extends View
  template: require 'views/templates/footer'
  container: 'footer'
  autoRender: true

  initialize: ->
    super
    @subscribeEvent 'loginStatus', @render
    @subscribeEvent 'startupController', @render
