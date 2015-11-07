module.exports = (match) ->
  # match route, controller#action
  match '', 'home#index'
  match 'contact', 'contact#index'
  match 'logout', 'session#logout'
  match 'profile', 'profile#index'
  match 'about', 'about#index'
  match 'issue/:id', 'issue#show'
