angular.module('ngcLibrary', [])
.constant('NGC_BASE_PATH','http://api.geonames.org')
.constant('NGC_USER_NAME','koberlag')
.constant('NGC_COUNTRY_INFO_PATH', '/countryInfoJSON')
.constant('NGC_SEARCH_PATH', '/searchJSON')
.constant('NGC_NEIGHBOURS_PATH', '/neighboursJSON')
.factory('ngcNeighbours',['ngcRequest', 'NGC_NEIGHBOURS_PATH', function(ngcRequest, NGC_NEIGHBOURS_PATH){
	return function(geonameId){
		var config = {
			params:{
				geonameId:geonameId,
			},
			method:'GET'
		};
		return ngcRequest(NGC_NEIGHBOURS_PATH, config);
	};
}])
.factory('ngcCapital',['ngcRequest', 'NGC_SEARCH_PATH', function(ngcRequest, NGC_SEARCH_PATH){
	return function(placeName, countryCode){
		var config = {
			params:{
				name_equals:placeName,
				country: countryCode,
				style: "LONG",
				featureCode:"PPLC"
			},
			method:'GET'
		};
		return ngcRequest(NGC_SEARCH_PATH, config);
	};
}])
.factory('ngcCountries',['ngcRequest', 'NGC_COUNTRY_INFO_PATH', function(ngcRequest, NGC_COUNTRY_INFO_PATH){
	return function(countryCode){
		var config = {
			params:{},
			cache:true,
			method:'GET'
		};
		if(countryCode){
			config.params.country = countryCode;
		}
		return ngcRequest(NGC_COUNTRY_INFO_PATH, config);
	};
}])
.factory('ngcRequest',['$http', 'NGC_BASE_PATH', 'NGC_USER_NAME', function($http,NGC_BASE_PATH,NGC_USER_NAME) {
	return function(endpoint, config) {
		config.params.username = NGC_USER_NAME;
		config.url = NGC_BASE_PATH + endpoint;
		return $http(config).then(function(res) {
			    	return res.data;
			    });
	
	};
}]);