utils = require 'lib/utils'
View = require 'views/base/view'

module.exports = class LoginView extends View
  template: require 'views/templates/login'
  container: '.container'
  # containerMethod: 'html'
  autoRender: true

  # Expects the serviceProviders in the options
  initialize: (options) ->
    super
    @initButtons options.serviceProviders

  # In this project we currently only have one service provider and therefore
  # one button. But this should allow for different service providers.
  initButtons: (serviceProviders) ->
    for serviceProviderName, serviceProvider of serviceProviders
      buttonSelector = ".#{serviceProviderName}"
      # @$(buttonSelector).addClass('btn-inverse')

      loginHandler = _(@loginWith).bind(
        # this, serviceProviderName, serviceProvider
        @loginWith serviceProviderName, serviceProvider
      )
      # @delegate 'click', buttonSelector, loginHandler

      loaded = _(@serviceProviderLoaded).bind(
        this, serviceProviderName, serviceProvider
      )
      serviceProvider.done loaded

      failed = _(@serviceProviderFailed).bind(
        this, serviceProviderName, serviceProvider
      )
      serviceProvider.fail failed

  loginWith: (serviceProviderName, serviceProvider, event) ->
    console.log '!login', serviceProviderName
    event?.preventDefault()
    return unless serviceProvider.isLoaded()
    @publishEvent 'login:pickService', serviceProviderName
    @publishEvent '!login', serviceProviderName

  serviceProviderLoaded: (serviceProviderName) ->
    console.log "loaded: #{serviceProviderName}"
    @$(".#{serviceProviderName}").removeClass('service-loading')

  serviceProviderFailed: (serviceProviderName) ->
    console.error "Error connecting. Please check whether you are blocking #{utils.upcase(serviceProviderName)}."
    @$(".#{serviceProviderName}")
      .removeClass('service-loading')
      .addClass('service-unavailable')
      .attr('disabled', true)
      .attr('title', "Error connecting. Please check whether you are blocking #{utils.upcase(serviceProviderName)}.")
