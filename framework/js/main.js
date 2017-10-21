/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",
                         ['ngRoute','ngCookies'
                         ,'loginService',
                         'registerService',
                          'productSearchService',
                          'individualProuductService',
                          'LocalStorageModule']);
app.controller("mainCtrl", function($scope,$window,$location,$http)
{
    "use strict";
    $scope.searchItemText = "";
    $scope.categorySelected = "";
    $scope.showingResultsFor = "";
    
    $scope.search = function(){
        $scope.gotoProductList($scope.categorySelected,$scope.searchItemText);
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
    
    $scope.gotoProductList = function(category, param){
        if(category === "") {
            category = "All";
        }
        if(param === ""){
            param = "index";
        }
        $location.path('/productlist/'+category+'/'+param);
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
    .when('/productlist/:params1/:params2',{
        templateUrl: 'template/productlist.html',
        controller: 'productSearchCtrl'
    })
    .when('/product/:id', {
        templateUrl: 'template/IndiProduct.html',
        controller: 'individualProuductCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);

