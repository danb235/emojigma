Controller = require 'controllers/base/controller'
View = require 'views/footer_view'

module.exports = class FooterController extends Controller

  initialize: ->
    super
    @view = new View()
