/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",
                         ['ngRoute','ngCookies'
                         ,'loginService',
                         'registerService']);
app.controller("mainCtrl", function($scope,$window,$interval,$location)
{
    "use strict";
    $scope.searchText = "";
    $scope.categorySelect = "All Categories";
    
    $scope.search = function(){

    };
    
             
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
    .when('/productlist', {
        templateUrl: 'template/productlist.html'
    })
   
    .otherwise({
        redirectTo: '/home'
    });
    
}]);
