angular.module('ngcApp')
.controller('CountriesController', ['$scope','ngcCountries', '$routeParams', '$location', function($scope, ngcCountries, $routeParams, $location){
	var vm = this;
	vm.list = [];
	ngcCountries().then(function(data){
		vm.list = data.geonames;
	});

	$scope.viewCountryDetails = function(countryCode){
		$location.path("/countries/" + countryCode + "/capital");
	};
}]);