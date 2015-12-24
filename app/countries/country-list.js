angular.module('ngcApp')
.controller('CountriesController', ['$scope','ngcCountries', '$routeParams', '$location', function($scope, ngcCountries, $routeParams, $location){
	var vm = this;
	vm.list = [];
	ngcCountries().then(function(data){

		vm.list = data.geonames;
	});


	$scope.sortType = 'name';
	$scope.sortReverse = false;
	$scope.sortArrow = "fa fa-caret-down";
	$scope.searchCountry = "";

	$scope.setSort = function(sortType){
		$scope.sortType = sortType;
		$scope.sortReverse = !$scope.sortReverse;
		$scope.sortArrow = $scope.sortReverse ? "fa fa-caret-up" : "fa fa-caret-down";
		
		if(sortType === 'population' || sortType =='areaInSqKm') {
            angular.forEach(vm.list, function (country) {
	            for(var prop in country )
	            {
	               if(prop == sortType && country[prop] != '') 
	                  country[prop] =  parseFloat(country[prop]);       
	            }
           });
        }
	};

	// $scope.orderBy = function(country){
	// 	if(sortType === 'population'){
	// 		return parseInt(country.population);
	// 	}
	// 	else if(sortType === 'areaInSqKm'){
	// 		return parseFloat(country.areaInSqKm);
	// 	}
	// 	else{
	// 		return sortType;
	// 	}
	// }

	$scope.viewCountryDetails = function(countryCode){
		$location.path("/countries/" + countryCode + "/capital");
	};
}]);