Controller = require 'controllers/base/controller'
Model = require 'models/header'
View = require 'views/header_view'

module.exports = class HeaderController extends Controller

  initialize: ->
    super
    @model = new Model()
    @view = new View({@model})
