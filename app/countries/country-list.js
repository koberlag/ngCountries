angular.module('ngcApp')
.controller('CountriesController', ['$scope','ngcCountries', 'ngcCapital', 'ngcNeighbours','$routeParams', '$location', function($scope, ngcCountries, ngcCapital, ngcNeighbours,$routeParams, $location){
	var vm = this,
	countryCode = $routeParams.country;
	vm.list = [];
	vm.detail = [];
	if(countryCode)
	{
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
	}
	else{
		ngcCountries().then(function(data){
			vm.list = data.geonames;
		});
	}

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

	$scope.viewCountryDetails = function(countryCode){
		$location.path("/countries/" + countryCode + "/capital");
	};
}]);