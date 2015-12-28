angular.module('ngcApp')
.controller('CountriesController', ['$scope','$location', 'list', 'country', function($scope, $location, list, country){
	var vm = this;
	vm.list = list;
	vm.detail = country.detail;
	vm.capital = country.capital;
	vm.neighbours = country.neighbours;

	$scope.sortType = 'name';
	$scope.sortReverse = false;
	$scope.sortArrow = "fa fa-caret-down";
	$scope.searchCountry = "";

	$scope.setSort = function(sortType){
		$scope.sortType = sortType;
		$scope.sortReverse = !$scope.sortReverse;
		$scope.sortArrow = $scope.sortReverse ? "fa fa-caret-up" : "fa fa-caret-down";
		
		if(sortType === 'population' || sortType =='areaInSqKm'){
    	angular.forEach(vm.list, function (country){
      	for(var prop in country){
        	if(prop == sortType && country[prop] != '') 
          	country[prop] =  parseFloat(country[prop]);
        }
      });
    }
	};

	$scope.viewCountryDetails = function(countryCode){
		$location.path("/countries/" + countryCode + "/capital");
	};
}]);