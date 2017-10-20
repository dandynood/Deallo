/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var productList = angular.module('productSearchService',[]);

productList.factory('searchFactory',function(){
   "use strict";
   var mySearch = null;
    return {
        getSearch: function(){
            return mySearch;
        },
        setSearch: function(val){
            mySearch = val;
        }
    };
});


productList.controller("productSearchCtrl",function($scope,$window, $location, $http, $rootScope, searchFactory,localStorageService)
{
    "use strict";
   // $scope.productSearchResult =  searchFactory.getSearch();
    $scope.productSearchResult = localStorageService.get("result");
    $scope.showingResultsFor = $scope.searchItemText;
    console.log($scope.productSearchResult);
    console.log($scope.productSearchResult[0].productName);
    
});