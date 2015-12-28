angular.module('ngcApp', ['ngRoute', 'ngAnimate', 'ngcLibrary'])
.run(function($rootScope, $location, $timeout) {
  $rootScope.$on('$routeChangeError', function(){
    $location.path('/error');
  });
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.isLoading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.isLoading = false;
  });
})
.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
  .when('/',{
  	templateUrl : './home/home.html',
    controller : 'HomeController as home'
  })
  .when('/countries',{
    templateUrl : './countries/country-list.html',
    controller : 'CountriesController as countries',
     resolve:{
      list: function (ngcCountries) {
              return ngcCountries().then(function(data){
                return data.geonames;
              });
            },
      country: function(){
        var country = {
          detail:[],
          capital:[],
          neighbours:[]
        };
        return country;
    }
  }
})
  .when('/countries/:country/capital',{
    templateUrl : './countries/country-detail.html',
    controller : 'CountriesController as country',
    resolve:{
      list: function(){
        return [];
      },
      country: function ($route,ngcCountries, ngcCapital, ngcNeighbours) {
        var country = {},
            countryCode = $route.current.params.country;
            
        return ngcCountries(countryCode)
        .then(function(data){
          country.detail = data.geonames[0];
          return ngcCapital(country.detail.capital, country.detail.countryCode);
        })
        .then(function(data){
          country.capital = data.geonames[0];
          return ngcNeighbours(country.detail.geonameId);
        })
        .then(function(data){
          country.neighbours = data.geonames;
          return country;
        });
      }
    }
  })
  .when('/error', {
      template : '<p>Error - Page Not Found</p>'
  })
  .otherwise({
    redirectTo : '/'
  });
});