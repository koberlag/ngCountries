angular.module('ngcApp')
.controller('CountryController', ['$scope','ngcCountries', '$routeParams', '$location', function($scope,ngcCountries, $routeParams, $location){
	var vm = this,
		countryCode = $routeParams.country;

	vm.detail = [];
	ngcCountries(countryCode).then(function(data){
		vm.detail = data.geonames[0];
	});
}]);