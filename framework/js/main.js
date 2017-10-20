/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",
                         ['ngRoute','ngCookies'
                         ,'loginService',
                         'registerService',
                          'productSearchService','LocalStorageModule']);
app.controller("mainCtrl", function($scope,$window,$location,$http, searchFactory,localStorageService)
{
    "use strict";
    $scope.searchItemText = "";
    $scope.categorySelected = "";
    $scope.showingResultsFor = "";
    
    $scope.search = function(){
        var str = {name: encodeURIComponent($scope.searchItemText), category: encodeURIComponent($scope.categorySelected)};
        $http({method: 'POST', url:'php/search.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.noResult = "Cannot find what you're looking for. Sorry";
               $scope.gotoProductList();
           } else {
               $scope.productSearchResult = response.data;
               localStorageService.set('result',$scope.productSearchResult);
               searchFactory.setSearch($scope.productSearchResult);
               $scope.gotoProductList();
           }
        });
        
    };
    
    $scope.getCategories = function(){
        $http.get('php/getCategories.php')
        .then (
            function (response) {
                $scope.categories = response.data;
            }
        );
    };
    
    $scope.getCategories();

             
    $scope.enableWarning = function(num)
    {
        $scope.warningArray[num] = true;
    };

   $scope.disableWarning =function(num)
    {
        $scope.warningArray[num] = false;

    };


   $scope.gotoHome = function()
   {
       $location.path('/home');
   };

   $scope.gotoRegister = function()
   {
        $location.path('/register');

   };

   $scope.gotoLogin = function()
   {
        $location.path('/login');

       };
    
    $scope.gotoProductList = function(){
        var str = $scope.searchItemText;
        $location.path('/productlist/' + str.replace(/\s+/g,"_"));
    };
    
});

app.config(['$routeProvider', function($routeProvider) 
{
    "use strict";
    $routeProvider
    .when('/home', {
        templateUrl: 'template/home-unregistered.html',
        controller: 'loginCtrl'
    })
    .when('/register', {
        templateUrl: 'template/register.html',
        controller: 'registerCtrl'
    })
    .when('/login', {
        templateUrl: 'template/login.html',
        controller: 'loginCtrl'
    })
    .when('/product', {
        templateUrl: 'template/IndiProduct.html'
    })
    .when('/productlist/:id', {
        templateUrl: 'template/productlist.html',
        controller: 'productSearchCtrl'
    })
   
    .otherwise({
        redirectTo: '/home'
    });
    
}]);

