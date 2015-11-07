View = require 'views/base/view'
Model = require 'models/base/model'
mediator = require 'mediator'

module.exports = class HeaderView extends View
  template: require 'views/templates/header'
  className: 'navbar-inner'
  container: '.navbar'
  autoRender: true

  initialize: ->
    super
    @delegate 'click', '.login_google', -> @publishEvent '!showLogin', @
    @delegate 'click', '.logout', -> @publishEvent '!logout', @

    @subscribeEvent 'login', -> @render()
    @subscribeEvent 'loginStatus', (active) -> @render()

  getTemplateData: ->
    templateData = super
    templateData.user = mediator?.user?.toJSON()
    templateData

  afterRender: ->
    super
    $('.welcome').popover()
