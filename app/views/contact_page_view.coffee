PageView = require 'views/base/page_view'
Model = require 'models/base/model'

module.exports = class ContactPageView extends PageView
  template: require 'views/templates/contact'
  container: '.container'
  containerMethod: 'html'
  bindings:
    '#emailinput': 'email'
    '#fnameinput': 'firstname'
    '#lnameinput': 'lastname'
    '#questinput': 'question'

  initialize: ->
    super
    @model = new Model()
    @delegate 'click', '#send', @send

  afterRender: ->
    # bind the model to the view (2-way) by using the bindings
    @stickit()
    super

  send: ->
    if @model.get('question') # TODO: do validation with model.validate()
      console.log 'send! ', @model