(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("application", function(exports, require, module) {
var Application, Chaplin, FooterController, HeaderController, IssueController, Layout, SessionController, SidebarController, mediator, routes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

mediator = require('mediator');

routes = require('routes');

SessionController = require('controllers/session_controller');

SidebarController = require('controllers/sidebar_controller');

IssueController = require('controllers/issue_controller');

HeaderController = require('controllers/header_controller');

FooterController = require('controllers/footer_controller');

Layout = require('views/layout');

module.exports = Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.title = 'Brunch example application';

  Application.prototype.initialize = function() {
    Application.__super__.initialize.apply(this, arguments);
    this.initDispatcher();
    this.initLayout();
    this.initMediator();
    this.initControllers();
    this.initRouter(routes);
    return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
  };

  Application.prototype.initLayout = function() {
    return this.layout = new Layout({
      title: this.title
    });
  };

  Application.prototype.initControllers = function() {
    new SessionController();
    new SidebarController();
    new IssueController();
    new HeaderController();
    return new FooterController();
  };

  Application.prototype.initMediator = function() {
    mediator.user = null;
    return mediator.seal();
  };

  return Application;

})(Chaplin.Application);

});

require.register("controllers/about_controller", function(exports, require, module) {
var AboutController, Controller, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

PageView = require('views/about_page_view');

module.exports = AboutController = (function(superClass) {
  extend(AboutController, superClass);

  function AboutController() {
    return AboutController.__super__.constructor.apply(this, arguments);
  }

  AboutController.prototype.historyURL = 'about';

  AboutController.prototype.index = function() {
    console.log('about#show');
    return this.view = new PageView();
  };

  return AboutController;

})(Controller);

});

require.register("controllers/base/controller", function(exports, require, module) {
var Chaplin, Controller,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  return Controller;

})(Chaplin.Controller);

});

require.register("controllers/contact_controller", function(exports, require, module) {
var ContactController, Controller, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

PageView = require('views/contact_page_view');

module.exports = ContactController = (function(superClass) {
  extend(ContactController, superClass);

  function ContactController() {
    return ContactController.__super__.constructor.apply(this, arguments);
  }

  ContactController.prototype.historyURL = 'contact';

  ContactController.prototype.index = function() {
    console.log('contact#show');
    return this.view = new PageView();
  };

  return ContactController;

})(Controller);

});

require.register("controllers/footer_controller", function(exports, require, module) {
var Controller, FooterController, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

View = require('views/footer_view');

module.exports = FooterController = (function(superClass) {
  extend(FooterController, superClass);

  function FooterController() {
    return FooterController.__super__.constructor.apply(this, arguments);
  }

  FooterController.prototype.initialize = function() {
    FooterController.__super__.initialize.apply(this, arguments);
    return this.view = new View();
  };

  return FooterController;

})(Controller);

});

require.register("controllers/header_controller", function(exports, require, module) {
var Controller, HeaderController, Model, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

Model = require('models/header');

View = require('views/header_view');

module.exports = HeaderController = (function(superClass) {
  extend(HeaderController, superClass);

  function HeaderController() {
    return HeaderController.__super__.constructor.apply(this, arguments);
  }

  HeaderController.prototype.initialize = function() {
    HeaderController.__super__.initialize.apply(this, arguments);
    this.model = new Model();
    return this.view = new View({
      model: this.model
    });
  };

  return HeaderController;

})(Controller);

});

require.register("controllers/home_controller", function(exports, require, module) {
var Controller, HomeController, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

PageView = require('views/home_page_view');

module.exports = HomeController = (function(superClass) {
  extend(HomeController, superClass);

  function HomeController() {
    return HomeController.__super__.constructor.apply(this, arguments);
  }

  HomeController.prototype.historyURL = 'home';

  HomeController.prototype.index = function() {
    console.log('home#show');
    return this.view = new PageView();
  };

  return HomeController;

})(Controller);

});

require.register("controllers/issue_controller", function(exports, require, module) {
var Collection, Controller, IssueController, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

Collection = require('models/issues_collection');

PageView = require('views/issue_page_view');

module.exports = IssueController = (function(superClass) {
  extend(IssueController, superClass);

  function IssueController() {
    return IssueController.__super__.constructor.apply(this, arguments);
  }

  IssueController.prototype.historyURL = 'issue';

  IssueController.prototype.show = function(options) {
    this.collection = new Collection();
    this.view = new PageView({
      collection: this.collection
    });
    return this.collection.fetch({
      data: {
        id: options.id
      },
      error: function(collection, xhr, options) {
        return console.error(xhr);
      }
    });
  };

  return IssueController;

})(Controller);

});

require.register("controllers/profile_controller", function(exports, require, module) {
var Controller, PageView, ProfileController, mediator,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

PageView = require('views/profile_page_view');

mediator = require('mediator');

module.exports = ProfileController = (function(superClass) {
  extend(ProfileController, superClass);

  function ProfileController() {
    this._index = bind(this._index, this);
    return ProfileController.__super__.constructor.apply(this, arguments);
  }

  ProfileController.prototype.historyURL = 'profile';

  ProfileController.prototype._index = function() {
    var model;
    console.log('profile#index');
    model = mediator.user;
    return this.view = new PageView({
      model: model
    });
  };

  ProfileController.prototype.index = function() {
    if (mediator.user != null) {
      return this._index();
    } else {
      return this.subscribeEvent('login', this._index);
    }
  };

  return ProfileController;

})(Controller);

});

require.register("controllers/session_controller", function(exports, require, module) {
var Controller, Google, LoginView, SessionController, User, mediator,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mediator = require('mediator');

Controller = require('controllers/base/controller');

User = require('models/user');

Google = require('lib/services/google');

LoginView = require('views/login_view');

module.exports = SessionController = (function(superClass) {
  extend(SessionController, superClass);

  function SessionController() {
    this.logout = bind(this.logout, this);
    this.serviceProviderSession = bind(this.serviceProviderSession, this);
    this.triggerLogin = bind(this.triggerLogin, this);
    return SessionController.__super__.constructor.apply(this, arguments);
  }

  SessionController.serviceProviders = {
    google: new Google()
  };

  SessionController.prototype.loginStatusDetermined = false;

  SessionController.prototype.loginView = null;

  SessionController.prototype.serviceProviderName = null;

  SessionController.prototype.initialize = function() {
    this.subscribeEvent('serviceProviderSession', this.serviceProviderSession);
    this.subscribeEvent('logout', this.logout);
    this.subscribeEvent('userData', this.userData);
    this.subscribeEvent('!showLogin', this.showLoginView);
    this.subscribeEvent('!login', this.triggerLogin);
    this.subscribeEvent('!logout', this.triggerLogout);
    return this.getSession();
  };

  SessionController.prototype.loadServiceProviders = function() {
    var name, ref, results, serviceProvider;
    ref = SessionController.serviceProviders;
    results = [];
    for (name in ref) {
      serviceProvider = ref[name];
      results.push(serviceProvider.load());
    }
    return results;
  };

  SessionController.prototype.createUser = function(userData) {
    return mediator.user = new User(userData);
  };

  SessionController.prototype.getSession = function() {
    var name, ref, results, serviceProvider;
    this.loadServiceProviders();
    ref = SessionController.serviceProviders;
    results = [];
    for (name in ref) {
      serviceProvider = ref[name];
      results.push(serviceProvider.done(serviceProvider.getLoginStatus));
    }
    return results;
  };

  SessionController.prototype.showLoginView = function() {
    if (this.loginView) {
      return;
    }
    console.log(SessionController.serviceProviders);
    this.loadServiceProviders();
    return this.loginView = new LoginView({
      serviceProviders: SessionController.serviceProviders
    });
  };

  SessionController.prototype.triggerLogin = function(serviceProviderName) {
    var serviceProvider;
    serviceProvider = SessionController.serviceProviders[serviceProviderName];
    if (!serviceProvider.isLoaded()) {
      this.publishEvent('serviceProviderMissing', serviceProviderName);
      return;
    }
    this.publishEvent('loginAttempt', serviceProviderName);
    return serviceProvider.triggerLogin();
  };

  SessionController.prototype.serviceProviderSession = function(session) {
    this.serviceProviderName = session.provider.name;
    this.disposeLoginView();
    session.id = session.userId;
    delete session.userId;
    this.createUser(session);
    return this.publishLogin();
  };

  SessionController.prototype.publishLogin = function() {
    this.loginStatusDetermined = true;
    this.publishEvent('login', mediator.user);
    return this.publishEvent('loginStatus', true);
  };

  SessionController.prototype.triggerLogout = function() {
    return this.publishEvent('logout');
  };

  SessionController.prototype.logout = function() {
    this.loginStatusDetermined = true;
    this.disposeUser();
    this.serviceProviderName = null;
    return this.publishEvent('loginStatus', false);
  };

  SessionController.prototype.userData = function(data) {
    return mediator.user.set(data);
  };

  SessionController.prototype.disposeLoginView = function() {
    if (!this.loginView) {
      return;
    }
    this.loginView.dispose();
    return this.loginView = null;
  };

  SessionController.prototype.disposeUser = function() {
    if (!mediator.user) {
      return;
    }
    mediator.user.dispose();
    return mediator.user = null;
  };

  return SessionController;

})(Controller);

});

require.register("controllers/sidebar_controller", function(exports, require, module) {
var Collection, Controller, SidebarController, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

Collection = require('models/issues_collection');

View = require('views/sidebar_view');

module.exports = SidebarController = (function(superClass) {
  extend(SidebarController, superClass);

  function SidebarController() {
    return SidebarController.__super__.constructor.apply(this, arguments);
  }

  SidebarController.prototype.initialize = function(options) {
    SidebarController.__super__.initialize.apply(this, arguments);
    this.collection = new Collection();
    this.view = new View({
      collection: this.collection
    });
    return this.collection.fetch({
      error: function(collection, xhr, options) {
        return console.error(xhr);
      }
    });
  };

  return SidebarController;

})(Controller);

});

require.register("initialize", function(exports, require, module) {
var Application;

Application = require('application');

$(document).on('ready', function() {
  var app;
  app = new Application();
  return app.initialize();
});

});

require.register("lib/services/google", function(exports, require, module) {
var Google, ServiceProvider, mediator, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mediator = require('mediator');

utils = require('lib/utils');

ServiceProvider = require('lib/services/service_provider');

module.exports = Google = (function(superClass) {
  var clientId, scopes;

  extend(Google, superClass);

  function Google() {
    this.loadHandler = bind(this.loadHandler, this);
    return Google.__super__.constructor.apply(this, arguments);
  }

  clientId = '382467810781.apps.googleusercontent.com';

  scopes = 'https://www.googleapis.com/auth/userinfo.profile';

  Google.prototype.name = 'google';

  Google.prototype.load = function() {
    if (this.state() === 'resolved' || this.loading) {
      return;
    }
    this.loading = true;
    window.googleClientLoaded = this.loadHandler;
    return utils.loadLib('https://apis.google.com/js/client.js?onload=googleClientLoaded', null, this.reject);
  };

  Google.prototype.loadHandler = function() {
    var error, error1;
    try {
      delete window.googleClientLoaded;
    } catch (error1) {
      error = error1;
      window.googleClientLoaded = void 0;
    }
    return gapi.auth.init(this.resolve);
  };

  Google.prototype.isLoaded = function() {
    return Boolean(window.gapi && gapi.auth && gapi.auth.authorize);
  };

  Google.prototype.triggerLogin = function(loginContext) {
    console.log("triggerLogin: " + clientId + ", " + scopes);
    return gapi.auth.authorize({
      client_id: clientId,
      scope: scopes,
      immediate: false
    }, _(this.loginHandler).bind(this, loginContext));
  };

  Google.prototype.loginHandler = function(loginContext, authResponse) {
    console.log(authResponse);
    if (authResponse) {
      mediator.publish('loginSuccessful', {
        provider: this,
        loginContext: loginContext
      });
      return this.getUserInfo(function(userInfo) {
        var data;
        data = {
          provider: this,
          accessToken: authResponse.access_token
        };
        _.extend(data, userInfo);
        console.log('serviceProviderSession:', data);
        return mediator.publish('serviceProviderSession', data);
      });
    } else {
      return mediator.publish('loginFail', {
        provider: this,
        loginContext: loginContext
      });
    }
  };

  Google.prototype.getLoginStatus = function(callback) {
    return gapi.auth.authorize({
      client_id: clientId,
      scope: scopes,
      immediate: true
    }, callback);
  };

  Google.prototype.getUserInfo = function(callback) {
    var request;
    request = gapi.client.request({
      path: '/oauth2/v2/userinfo'
    });
    return request.execute(callback);
  };

  Google.prototype.parsePlusOneButton = function(el) {
    if (window.gapi && gapi.plusone && gapi.plusone.go) {
      return gapi.plusone.go(el);
    } else {
      window.___gcfg = {
        parsetags: 'explicit'
      };
      return utils.loadLib('https://apis.google.com/js/plusone.js', function() {
        var error, error1;
        try {
          delete window.___gcfg;
        } catch (error1) {
          error = error1;
          window.___gcfg = void 0;
        }
        return gapi.plusone.go(el);
      });
    }
  };

  return Google;

})(ServiceProvider);

});

require.register("lib/services/service_provider", function(exports, require, module) {
var Chaplin, ServiceProvider, utils;

utils = require('lib/utils');

Chaplin = require('chaplin');

module.exports = ServiceProvider = (function() {
  _(ServiceProvider.prototype).extend(Chaplin.EventBroker);

  ServiceProvider.prototype.loading = false;

  function ServiceProvider() {
    _(this).extend($.Deferred());
    utils.deferMethods({
      deferred: this,
      methods: ['triggerLogin', 'getLoginStatus'],
      onDeferral: this.load
    });
  }

  ServiceProvider.prototype.disposed = false;

  ServiceProvider.prototype.dispose = function() {
    if (this.disposed) {
      return;
    }
    this.unsubscribeAllEvents();
    this.disposed = true;
    return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
  };

  return ServiceProvider;

})();


/*

  Standard methods and their signatures:

  load: ->
     * Load a script like this:
    utils.loadLib 'http://example.org/foo.js', @loadHandler, @reject

  loadHandler: =>
     * Init the library, then resolve
    ServiceProviderLibrary.init(foo: 'bar')
    @resolve()

  isLoaded: ->
     * Return a Boolean
    Boolean window.ServiceProviderLibrary and ServiceProviderLibrary.login

   * Trigger login popup
  triggerLogin: (loginContext) ->
    callback = _(@loginHandler).bind(this, loginContext)
    ServiceProviderLibrary.login callback

   * Callback for the login popup
  loginHandler: (loginContext, response) =>

    eventPayload = {provider: this, loginContext}
    if response
       * Publish successful login
      @publishEvent 'loginSuccessful', eventPayload

       * Publish the session
      @publishEvent 'serviceProviderSession',
        provider: this
        userId: response.userId
        accessToken: response.accessToken
         * etc.

    else
      @publishEvent 'loginFail', eventPayload

  getLoginStatus: (callback = @loginStatusHandler, force = false) ->
    ServiceProviderLibrary.getLoginStatus callback, force

  loginStatusHandler: (response) =>
    return unless response
    @publishEvent 'serviceProviderSession',
      provider: this
      userId: response.userId
      accessToken: response.accessToken
       * etc.
 */

});

;require.register("lib/support", function(exports, require, module) {
var Chaplin, support, utils;

Chaplin = require('chaplin');

utils = require('lib/utils');

support = utils.beget(Chaplin.support);

module.exports = support;

});

require.register("lib/utils", function(exports, require, module) {
var Chaplin, utils,
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

utils = Chaplin.utils.beget(Chaplin.utils);

_(utils).extend({
  loadLib: function(url, success, error, timeout) {
    var head, onload, script, timeoutHandle;
    if (timeout == null) {
      timeout = 7500;
    }
    head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    script = document.createElement('script');
    script.async = 'async';
    script.src = url;
    onload = function(_, aborted) {
      if (aborted == null) {
        aborted = false;
      }
      if (!(aborted || !script.readyState || script.readyState === 'complete')) {
        return;
      }
      clearTimeout(timeoutHandle);
      script.onload = script.onreadystatechange = script.onerror = null;
      if (head && script.parentNode) {
        head.removeChild(script);
      }
      script = void 0;
      if (success && !aborted) {
        return success();
      }
    };
    script.onload = script.onreadystatechange = onload;
    script.onerror = function() {
      onload(null, true);
      if (error) {
        return error();
      }
    };
    timeoutHandle = setTimeout(script.onerror, timeout);
    return head.insertBefore(script, head.firstChild);
  },

  /*
  Wrap methods so they can be called before a deferred is resolved.
  The actual methods are called once the deferred is resolved.
  
  Parameters:
  
  Expects an options hash with the following properties:
  
  deferred
    The Deferred object to wait for.
  
  methods
    Either:
    - A string with a method name e.g. 'method'
    - An array of strings e.g. ['method1', 'method2']
    - An object with methods e.g. {method: -> alert('resolved!')}
  
  host (optional)
    If you pass an array of strings in the `methods` parameter the methods
    are fetched from this object. Defaults to `deferred`.
  
  target (optional)
    The target object the new wrapper methods are created at.
    Defaults to host if host is given, otherwise it defaults to deferred.
  
  onDeferral (optional)
    An additional callback function which is invoked when the method is called
    and the Deferred isn't resolved yet.
    After the method is registered as a done handler on the Deferred,
    this callback is invoked. This can be used to trigger the resolving
    of the Deferred.
  
  Examples:
  
  deferMethods(deferred: def, methods: 'foo')
    Wrap the method named foo of the given deferred def and
    postpone all calls until the deferred is resolved.
  
  deferMethods(deferred: def, methods: def.specialMethods)
    Read all methods from the hash def.specialMethods and
    create wrapped methods with the same names at def.
  
  deferMethods(
    deferred: def, methods: def.specialMethods, target: def.specialMethods
  )
    Read all methods from the object def.specialMethods and
    create wrapped methods at def.specialMethods,
    overwriting the existing ones.
  
  deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
    Wrap the methods obj.foo and obj.bar so all calls to them are postponed
    until def is resolved. obj.foo and obj.bar are overwritten
    with their wrappers.
   */
  deferMethods: function(options) {
    var deferred, func, host, i, len, methods, methodsHash, name, onDeferral, results, target;
    deferred = options.deferred;
    methods = options.methods;
    host = options.host || deferred;
    target = options.target || host;
    onDeferral = options.onDeferral;
    methodsHash = {};
    if (typeof methods === 'string') {
      methodsHash[methods] = host[methods];
    } else if (methods.length && methods[0]) {
      for (i = 0, len = methods.length; i < len; i++) {
        name = methods[i];
        func = host[name];
        if (typeof func !== 'function') {
          throw new TypeError("utils.deferMethods: method " + name + " not found on host " + host);
        }
        methodsHash[name] = func;
      }
    } else {
      methodsHash = methods;
    }
    results = [];
    for (name in methodsHash) {
      if (!hasProp.call(methodsHash, name)) continue;
      func = methodsHash[name];
      if (typeof func !== 'function') {
        continue;
      }
      results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
    }
    return results;
  },
  createDeferredFunction: function(deferred, func, context, onDeferral) {
    if (context == null) {
      context = deferred;
    }
    return function() {
      var args;
      args = arguments;
      if (deferred.state() === 'resolved') {
        return func.apply(context, args);
      } else {
        deferred.done(function() {
          return func.apply(context, args);
        });
        if (typeof onDeferral === 'function') {
          return onDeferral.apply(context);
        }
      }
    };
  }
});

module.exports = utils;

});

require.register("lib/view_helper", function(exports, require, module) {
var mediator, utils;

mediator = require('mediator');

utils = require('chaplin/lib/utils');

Handlebars.registerHelper('if_logged_in', function(options) {
  if (mediator.user) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

Handlebars.registerHelper('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

Handlebars.registerHelper('with_user', function(options) {
  var context, ref;
  context = ((ref = mediator.user) != null ? ref.serialize() : void 0) || {};
  return Handlebars.helpers["with"].call(this, context, options);
});

});

require.register("mediator", function(exports, require, module) {
module.exports = require('chaplin').mediator;

});

require.register("models/base/collection", function(exports, require, module) {
var Chaplin, Collection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Collection = (function(superClass) {
  extend(Collection, superClass);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  return Collection;

})(Chaplin.Collection);

});

require.register("models/base/model", function(exports, require, module) {
var Chaplin, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Model = (function(superClass) {
  extend(Model, superClass);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Chaplin.Model);

});

require.register("models/header", function(exports, require, module) {
var Header, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Model = require('models/base/model');

module.exports = Header = (function(superClass) {
  extend(Header, superClass);

  function Header() {
    return Header.__super__.constructor.apply(this, arguments);
  }

  Header.prototype.defaults = {
    items: [
      {
        href: './test/',
        title: 'App Tests'
      }, {
        href: '/',
        title: 'Home',
        "class": 'active'
      }, {
        href: '/about',
        title: 'About'
      }, {
        href: '/contact',
        title: 'Contact'
      }
    ]
  };

  return Header;

})(Model);

});

require.register("models/issues", function(exports, require, module) {
var Collection, Issues,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Collection = require('models/base/collection');

module.exports = Issues = (function(superClass) {
  extend(Issues, superClass);

  function Issues() {
    return Issues.__super__.constructor.apply(this, arguments);
  }

  Issues.prototype.url = '/data/sidebar_data.json';

  return Issues;

})(Collection);

});

require.register("models/issues_collection", function(exports, require, module) {
var Collection, Issues,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Collection = require('models/base/collection');

module.exports = Issues = (function(superClass) {
  extend(Issues, superClass);

  function Issues() {
    return Issues.__super__.constructor.apply(this, arguments);
  }

  Issues.prototype.url = '/data/sidebar_data.json';

  return Issues;

})(Collection);

});

require.register("models/user", function(exports, require, module) {
var Model, User,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Model = require('models/base/model');

module.exports = User = (function(superClass) {
  extend(User, superClass);

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  return User;

})(Model);

});

require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'home#index');
  match('contact', 'contact#index');
  match('logout', 'session#logout');
  match('profile', 'profile#index');
  match('about', 'about#index');
  return match('issue/:id', 'issue#show');
};

});

require.register("views/about_page_view", function(exports, require, module) {
var AboutPageView, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PageView = require('views/base/page_view');

module.exports = AboutPageView = (function(superClass) {
  extend(AboutPageView, superClass);

  function AboutPageView() {
    return AboutPageView.__super__.constructor.apply(this, arguments);
  }

  AboutPageView.prototype.template = require('views/templates/about');

  AboutPageView.prototype.container = '.container';

  AboutPageView.prototype.containerMethod = 'html';

  return AboutPageView;

})(PageView);

});

require.register("views/base/collection_view", function(exports, require, module) {
var Chaplin, CollectionView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

View = require('views/base/view');

module.exports = CollectionView = (function(superClass) {
  extend(CollectionView, superClass);

  function CollectionView() {
    return CollectionView.__super__.constructor.apply(this, arguments);
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);

});

require.register("views/base/page_view", function(exports, require, module) {
var PageView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

module.exports = PageView = (function(superClass) {
  extend(PageView, superClass);

  function PageView() {
    return PageView.__super__.constructor.apply(this, arguments);
  }

  PageView.prototype.container = '#page-container';

  PageView.prototype.autoRender = true;

  PageView.prototype.renderedSubviews = false;

  PageView.prototype.initialize = function() {
    var rendered;
    PageView.__super__.initialize.apply(this, arguments);
    if (this.model || this.collection) {
      rendered = false;
      return this.modelBind('change', (function(_this) {
        return function() {
          if (!rendered) {
            _this.render();
          }
          return rendered = true;
        };
      })(this));
    }
  };

  PageView.prototype.renderSubviews = function() {};

  PageView.prototype.render = function() {
    PageView.__super__.render.apply(this, arguments);
    if (!this.renderedSubviews) {
      this.renderSubviews();
      return this.renderedSubviews = true;
    }
  };

  return PageView;

})(View);

});

require.register("views/base/view", function(exports, require, module) {
var Chaplin, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

require('lib/view_helper');

module.exports = View = (function(superClass) {
  extend(View, superClass);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);

});

require.register("views/contact_page_view", function(exports, require, module) {
var ContactPageView, Model, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PageView = require('views/base/page_view');

Model = require('models/base/model');

module.exports = ContactPageView = (function(superClass) {
  extend(ContactPageView, superClass);

  function ContactPageView() {
    return ContactPageView.__super__.constructor.apply(this, arguments);
  }

  ContactPageView.prototype.template = require('views/templates/contact');

  ContactPageView.prototype.container = '.container';

  ContactPageView.prototype.containerMethod = 'html';

  ContactPageView.prototype.bindings = {
    '#emailinput': 'email',
    '#fnameinput': 'firstname',
    '#lnameinput': 'lastname',
    '#questinput': 'question'
  };

  ContactPageView.prototype.initialize = function() {
    ContactPageView.__super__.initialize.apply(this, arguments);
    this.model = new Model();
    return this.delegate('click', '#send', this.send);
  };

  ContactPageView.prototype.afterRender = function() {
    this.stickit();
    return ContactPageView.__super__.afterRender.apply(this, arguments);
  };

  ContactPageView.prototype.send = function() {
    if (this.model.get('question')) {
      return console.log('send! ', this.model);
    }
  };

  return ContactPageView;

})(PageView);

});

require.register("views/footer_view", function(exports, require, module) {
var FooterView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

module.exports = FooterView = (function(superClass) {
  extend(FooterView, superClass);

  function FooterView() {
    return FooterView.__super__.constructor.apply(this, arguments);
  }

  FooterView.prototype.template = require('views/templates/footer');

  FooterView.prototype.container = 'footer';

  FooterView.prototype.autoRender = true;

  FooterView.prototype.initialize = function() {
    FooterView.__super__.initialize.apply(this, arguments);
    this.subscribeEvent('loginStatus', this.render);
    return this.subscribeEvent('startupController', this.render);
  };

  return FooterView;

})(View);

});

require.register("views/header_view", function(exports, require, module) {
var HeaderView, Model, View, mediator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

Model = require('models/base/model');

mediator = require('mediator');

module.exports = HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.template = require('views/templates/header');

  HeaderView.prototype.className = 'navbar-inner';

  HeaderView.prototype.container = '.navbar';

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.initialize = function() {
    HeaderView.__super__.initialize.apply(this, arguments);
    this.delegate('click', '.login_google', function() {
      return this.publishEvent('!showLogin', this);
    });
    this.delegate('click', '.logout', function() {
      return this.publishEvent('!logout', this);
    });
    this.subscribeEvent('login', function() {
      return this.render();
    });
    return this.subscribeEvent('loginStatus', function(active) {
      return this.render();
    });
  };

  HeaderView.prototype.getTemplateData = function() {
    var ref, templateData;
    templateData = HeaderView.__super__.getTemplateData.apply(this, arguments);
    templateData.user = mediator != null ? (ref = mediator.user) != null ? ref.toJSON() : void 0 : void 0;
    return templateData;
  };

  HeaderView.prototype.afterRender = function() {
    HeaderView.__super__.afterRender.apply(this, arguments);
    return $('.welcome').popover();
  };

  return HeaderView;

})(View);

});

require.register("views/home_page_view", function(exports, require, module) {
var HomePageView, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PageView = require('views/base/page_view');

module.exports = HomePageView = (function(superClass) {
  extend(HomePageView, superClass);

  function HomePageView() {
    return HomePageView.__super__.constructor.apply(this, arguments);
  }

  HomePageView.prototype.template = require('views/templates/home');

  HomePageView.prototype.container = '.container';

  HomePageView.prototype.containerMethod = 'html';

  return HomePageView;

})(PageView);

});

require.register("views/issue_page_view", function(exports, require, module) {
var IssuePageView, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PageView = require('views/base/page_view');

module.exports = IssuePageView = (function(superClass) {
  extend(IssuePageView, superClass);

  function IssuePageView() {
    return IssuePageView.__super__.constructor.apply(this, arguments);
  }

  IssuePageView.prototype.template = require('views/templates/issue');

  IssuePageView.prototype.container = '.container';

  IssuePageView.prototype.containerMethod = 'html';

  IssuePageView.prototype.initialize = function() {
    IssuePageView.__super__.initialize.apply(this, arguments);
    return this.modelBind('reset', function() {
      var ref;
      this.model = (ref = this.collection) != null ? ref.first() : void 0;
      return this.render();
    });
  };

  return IssuePageView;

})(PageView);

});

require.register("views/layout", function(exports, require, module) {
var Chaplin, Layout,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Layout = (function(superClass) {
  extend(Layout, superClass);

  function Layout() {
    return Layout.__super__.constructor.apply(this, arguments);
  }

  return Layout;

})(Chaplin.Layout);

});

require.register("views/login_view", function(exports, require, module) {
var LoginView, View, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

utils = require('lib/utils');

View = require('views/base/view');

module.exports = LoginView = (function(superClass) {
  extend(LoginView, superClass);

  function LoginView() {
    return LoginView.__super__.constructor.apply(this, arguments);
  }

  LoginView.prototype.template = require('views/templates/login');

  LoginView.prototype.container = '.container';

  LoginView.prototype.autoRender = true;

  LoginView.prototype.initialize = function(options) {
    LoginView.__super__.initialize.apply(this, arguments);
    return this.initButtons(options.serviceProviders);
  };

  LoginView.prototype.initButtons = function(serviceProviders) {
    var buttonSelector, failed, loaded, loginHandler, results, serviceProvider, serviceProviderName;
    results = [];
    for (serviceProviderName in serviceProviders) {
      serviceProvider = serviceProviders[serviceProviderName];
      buttonSelector = "." + serviceProviderName;
      loginHandler = _(this.loginWith).bind(this.loginWith(serviceProviderName, serviceProvider));
      loaded = _(this.serviceProviderLoaded).bind(this, serviceProviderName, serviceProvider);
      serviceProvider.done(loaded);
      failed = _(this.serviceProviderFailed).bind(this, serviceProviderName, serviceProvider);
      results.push(serviceProvider.fail(failed));
    }
    return results;
  };

  LoginView.prototype.loginWith = function(serviceProviderName, serviceProvider, event) {
    console.log('!login', serviceProviderName);
    if (event != null) {
      event.preventDefault();
    }
    if (!serviceProvider.isLoaded()) {
      return;
    }
    this.publishEvent('login:pickService', serviceProviderName);
    return this.publishEvent('!login', serviceProviderName);
  };

  LoginView.prototype.serviceProviderLoaded = function(serviceProviderName) {
    console.log("loaded: " + serviceProviderName);
    return this.$("." + serviceProviderName).removeClass('service-loading');
  };

  LoginView.prototype.serviceProviderFailed = function(serviceProviderName) {
    console.error("Error connecting. Please check whether you are blocking " + (utils.upcase(serviceProviderName)) + ".");
    return this.$("." + serviceProviderName).removeClass('service-loading').addClass('service-unavailable').attr('disabled', true).attr('title', "Error connecting. Please check whether you are blocking " + (utils.upcase(serviceProviderName)) + ".");
  };

  return LoginView;

})(View);

});

require.register("views/profile_page_view", function(exports, require, module) {
var Model, PageView, ProfilePageView, mediator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PageView = require('views/base/page_view');

Model = require('models/base/model');

mediator = require('mediator');

module.exports = ProfilePageView = (function(superClass) {
  extend(ProfilePageView, superClass);

  function ProfilePageView() {
    return ProfilePageView.__super__.constructor.apply(this, arguments);
  }

  ProfilePageView.prototype.template = require('views/templates/profile');

  ProfilePageView.prototype.container = '.container';

  ProfilePageView.prototype.containerMethod = 'html';

  ProfilePageView.prototype.initialize = function() {
    ProfilePageView.__super__.initialize.apply(this, arguments);
    return this.subscribeEvent('login', function() {
      this.model = mediator.user;
      return this.render();
    });
  };

  ProfilePageView.prototype.getTemplateData = function() {
    var ref;
    return {
      user: (ref = this.model) != null ? ref.toJSON() : void 0
    };
  };

  return ProfilePageView;

})(PageView);

});

require.register("views/sidebar_view", function(exports, require, module) {
var SidebarView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

module.exports = SidebarView = (function(superClass) {
  extend(SidebarView, superClass);

  function SidebarView() {
    return SidebarView.__super__.constructor.apply(this, arguments);
  }

  SidebarView.prototype.template = require('views/templates/sidebar');

  SidebarView.prototype.container = '.sidebar-nav';

  SidebarView.prototype.autoRender = true;

  SidebarView.prototype.initialize = function() {
    SidebarView.__super__.initialize.apply(this, arguments);
    return this.listenTo(this.collection, 'reset', function() {
      return this.render();
    });
  };

  return SidebarView;

})(View);

});

require.register("views/templates/about", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "\n  <div class=\"btn-group\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n      USERNAME\n      <span class=\"caret\"></span>\n    </a>\n    <ul class=\"dropdown-menu\">\n      <li>Profile</li>\n      <li>Logout</li>\n    </ul>\n  </div>\n";
  }

  buffer += "<div class=\"hero-unit\">\n  <h1>About:</h1>\n  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n</div>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.if_logged_in) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.if_logged_in; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.if_logged_in) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
});

require.register("views/templates/contact", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"hero-unit\">\n  <h2>Contact:</h2>\n  <form class=\"form-horizontal\">\n      <fieldset>\n          <div class=\"control-group\">\n              <label class=\"control-label\" for=\"emailinput\">email</label>\n              <div class=\"controls\">\n                  <div class=\"input-prepend\">\n                      <span class=\"add-on\"><i class=\"icon-envelope\"></i></span><input type=\"email\" class=\"input-xlarge focused\" id=\"emailinput\" required/>\n                  </div>\n              </div>\n          </div>\n          <div class=\"control-group\">\n              <label class=\"control-label\" for=\"fnameinput\">firstname</label>\n              <div class=\"controls\">\n                  <input type=\"text\" class=\"input-xlarge focused\" id=\"fnameinput\" required/>\n              </div>\n          </div>\n          <div class=\"control-group\">\n              <label class=\"control-label\" for=\"lnameinput\">lastname</label>\n              <div class=\"controls\">\n                  <input type=\"text\" class=\"input-xlarge focused\" id=\"lnameinput\" required/>\n              </div>\n          </div>\n          <div class=\"control-group\">\n              <label class=\"control-label\" for=\"questinput\">question</label>\n              <div class=\"controls\">\n                  <textarea class=\"input-xlarge focused\" id=\"questinput\"/>\n              </div>\n          </div>\n          <div class=\"form-actions\">\n              <button type=\"button\" class=\"btn-large btn-primary\" id=\"send\">\n                  <i class=\"icon-comment icon-white\"></i>\n                  Send\n              </button>\n          </div>\n      </fieldset>\n  </form>\n</div>";
  });
});

require.register("views/templates/footer", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p>&copy; Company 2012</p>\n";
  });
});

require.register("views/templates/header", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n        <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.picture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" height=\"20\" width=\"20\"/>&nbsp;"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.given_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <span class=\"caret\"></span>\n      </button>\n      <ul class=\"dropdown-menu\">\n        <li><a href=\"/profile\"><i class=\"icon-user\"></i>&nbsp;View profile</a></li>\n        <li><a href=\"/settings\"><i class=\"icon-cog\"></i>&nbsp;Edit settings</a></li>\n        <li class=\"divider\"></li>\n        <li><a href=\"#\" class=\"logout\"><i class=\"icon-off\"></i>&nbsp;Sign out</a></li>\n      </ul>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <a class=\"btn dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\"><i class=\"icon-user\"></i>Sign In <strong class=\"caret\"></strong></a>\n      <div class=\"dropdown-menu\" style=\"padding: 15px; padding-bottom: 0px;\">\n        <form>\n          <input class=\"btn btn-primary btn-block login_google\" type=\"button\" id=\"sign-in-google\" value=\"Sign In with Google\">\n          <input class=\"btn btn-primary btn-block login_twitter\" disabled type=\"button\" id=\"sign-in-twitter\" value=\"Sign In with Twitter\">\n        </form>\n      </div>\n    ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li><a href=\"";
  if (stack1 = helpers.href) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.href; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"container-fluid\">\n  <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n    <span class=\"icon-bar\"></span>\n    <span class=\"icon-bar\"></span>\n    <span class=\"icon-bar\"></span>\n  </a>\n  <a class=\"brand\" href=\"#\">brunch-with-chaplin-and-bootstrap</a>\n  <div class=\"btn-group pull-right\">\n    ";
  options = {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.if_logged_in) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.if_logged_in; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.if_logged_in) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  <div class=\"nav-collapse\">\n    <ul class=\"nav\">\n    ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div><!--/.nav-collapse -->\n</div>\n";
  return buffer;
  });
});

require.register("views/templates/home", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"hero-unit\">\n  <h1>Hello, brunch and bootstrap!</h1>\n  <p>A lightweight approach to building HTML5 applications with emphasis on elegance and simplicity</p>\n  <p>Brunch is an assembler for HTML5 applications. It's agnostic to frameworks, libraries, programming, stylesheet & templating languages and backend technology.</p>\n  <p><a class=\"btn btn-primary btn-large\" href=\"http://brunch.io\">Learn more &raquo;</a></p>\n  <img src=\"https://a248.e.akamai.net/camo.github.com/73feb7a933dc37e0e030d82bbab9f9ad9a0e9cdb/687474703a2f2f6d656c6579616c2e666c78642e69742f687a66635f3531322e6a7067\" alt=\"Brunch\" />\n</div>\n\n<div class=\"row-fluid\">\n  <div class=\"span4\">\n    <h2>Heading</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div><!--/span-->\n  <div class=\"span4\">\n    <h2>Heading</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div><!--/span-->\n  <div class=\"span4\">\n    <h2>Heading</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div><!--/span-->\n</div><!--/row-->\n<div class=\"row-fluid\">\n  <div class=\"span4\">\n    <h2>Heading</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div><!--/span-->\n  <div class=\"span4\">\n    <h2>Heading</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div><!--/span-->\n  <div class=\"span4\">\n    <h2>Heading</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div><!--/span-->\n</div><!--/row-->";
  });
});

require.register("views/templates/issue", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"hero-unit\">\n  <h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n  <p>";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n</div>";
  return buffer;
  });
});

require.register("views/templates/login", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
});

require.register("views/templates/profile", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"hero-unit\">\n  <h2>Profile:</h2>\n    <fieldset>\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"emailinput\">name</label>\n            <div class=\"controls\">\n                <div class=\"input-prepend\">\n                    <input type=\"text\" class=\"input-xlarge focused\" id=\"name\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"lnameinput\">picture</label>\n            <div class=\"controls\">\n                <a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"link\">\n                  <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.picture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"picture\"></img>\n                </a>\n            </div>\n        </div>\n    </fieldset>\n</div>";
  return buffer;
  });
});

require.register("views/templates/sidebar", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li><a href=\"/issue/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n  ";
  return buffer;
  }

  buffer += "<ul class=\"nav nav-list\">\n  <li class=\"nav-header\">Sidebar</li>\n  <li class=\"active\"><a href=\"#\">Issues</a></li>\n  ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
});


//# sourceMappingURL=app.js.map