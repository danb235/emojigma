PageView = require 'views/base/page_view'

module.exports = class IssuePageView extends PageView
  template: require 'views/templates/issue'
  container: '.container'
  containerMethod: 'html'

  initialize: ->
    super
    @modelBind 'reset', ->
      @model = @collection?.first()
      @render()