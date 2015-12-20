angular.module('ngcLibrary', [])
.constant('NGC_BASE_PATH','http://api.geonames.org')
.constant('NGC_USER_NAME_PATH','?username=koberlag')
.constant('NGC_USER_NAME','koberlag')
.constant('NGC_COUNTRY_INFO_PATH', '/countryInfoJSON')
.factory('ngcCountries',['ngcRequest', 'NGC_COUNTRY_INFO_PATH', function(ngcRequest, NGC_COUNTRY_INFO_PATH){
	return function(countryCode){
		var config = {
			params:{},
			cache:true,
			method:'GET'
		}
		if(countryCode){
			config.params.country = countryCode;
		}
		return ngcRequest(NGC_COUNTRY_INFO_PATH, config);
	};
}])
.factory('ngcRequest',['$http', 'NGC_BASE_PATH', 'NGC_USER_NAME', function($http,NGC_BASE_PATH,NGC_USER_NAME) {
	return function(endpoint, config) {
		config.params.username = NGC_USER_NAME;
		config.url = NGC_BASE_PATH + endpoint
		return $http(config).then(function(res) {
			    	return res.data;
			    });
	
	};
}]);