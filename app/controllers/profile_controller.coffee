Controller = require 'controllers/base/controller'
PageView = require 'views/profile_page_view'
mediator = require 'mediator'

module.exports = class ProfileController extends Controller
  historyURL: 'profile'

  _index: =>
    console.log('profile#index')
    model = mediator.user
    @view = new PageView( {model})

   index: ->
     if mediator.user?
       @_index()
     else
       @subscribeEvent 'login', @_index