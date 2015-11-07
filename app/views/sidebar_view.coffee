View = require 'views/base/view'

module.exports = class SidebarView extends View
  template: require 'views/templates/sidebar'
  container: '.sidebar-nav'
  autoRender: true

  initialize: ->
    super
    @listenTo @collection, 'reset', ->
      @render()