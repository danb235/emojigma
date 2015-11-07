Controller = require 'controllers/base/controller'
PageView = require 'views/issue_page_view'

module.exports = class IssueController extends Controller
  historyURL: 'issue'

  show: (options) ->
    @collection = new Collection()
    @view = new PageView({@collection})
    @collection.fetch # triggers a reset when ready, view will render
      data:
        id: options.id
      error: (collection, xhr, options) ->
        console.error xhr
