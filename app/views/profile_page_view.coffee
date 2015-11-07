PageView = require 'views/base/page_view'
Model = require 'models/base/model'
mediator = require 'mediator'

module.exports = class ProfilePageView extends PageView
  template: require 'views/templates/profile'
  container: '.container'
  containerMethod: 'html'

  initialize: ->
    super
    @subscribeEvent 'login', ->
      @model = mediator.user
      @render()

  getTemplateData: ->
    user: @model?.toJSON()