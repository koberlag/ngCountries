angular.module('ngcApp')
.controller('CountryController', ['$scope','ngcCountries', 'ngcCapital', 'ngcNeighbours','$routeParams', '$location', function($scope,ngcCountries, ngcCapital, ngcNeighbours, $routeParams, $location){
	var vm = this,
		countryCode = $routeParams.country;

	vm.detail = [];
	ngcCountries(countryCode)
	.then(function(data){
		vm.detail = data.geonames[0];
		return ngcCapital(vm.detail.capital, vm.detail.countryCode);
	})
	.then(function(data){
		vm.capital = data.geonames[0];
		return ngcNeighbours(vm.detail.geonameId);
	})
	.then(function(data){
		vm.neighbours = data.geonames;
	});

}]);