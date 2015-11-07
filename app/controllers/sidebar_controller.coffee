Controller = require 'controllers/base/controller'
Collection = require 'models/issues_collection'
View = require 'views/sidebar_view'

module.exports = class SidebarController extends Controller

  initialize: (options) ->
    super
    @collection = new Collection()
    @view = new View({@collection})
    @collection.fetch # triggers a reset when ready, view will render
      error: (collection, xhr, options) ->
        console.error xhr