Controller = require 'controllers/base/controller'
PageView = require 'views/home_page_view'

module.exports = class HomeController extends Controller
  historyURL: 'home'

  index: ->
    console.log('home#show')
    @view = new PageView()
