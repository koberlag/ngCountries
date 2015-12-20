angular.module('ngcApp', ['ngRoute', 'ngAnimate', 'ngcLibrary'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
    .when('/',{
    	templateUrl : './home/home.html',
      controller : 'HomeController as home'
    })
    .when('/countries',{
      templateUrl : './countries/country-list.html',
      controller : 'CountriesController as countries'
    })
    .when('/countries/:country',{
      templateUrl : './countries/country-detail.html',
      controller : 'CountryController as country'
    })
    .otherwise({
      redirectTo : '/'
    });
  });