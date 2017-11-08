/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",
                         ['ngRoute','ngCookies'
                         ,'loginService',
                         'registerService',
                          'productSearchService',
                          'individualProuductService',
                          'userProfileService',
                          'sellerMgtService',
                          'LocalStorageModule',
                          'editProfileService',
                         'editPasswordService',
                          'sellerAddService',
                          'sellerEditService',
                          'LocalStorageModule']);

app.controller("mainCtrl", function($scope,$window,$location,$http,localStorageService,$interval,$route)
{
    "use strict";
    $scope.searchItemText = "";
    $scope.categorySelected = "";
    $scope.showingResultsFor = "";
    $scope.accountID = null;
    
    $scope.loggedin = false;
    
    $scope.logoutaccount = function()
    {
        localStorageService.remove("loginstatus");
        localStorageService.remove("userdata");
        $scope.loggedin = false;
        $scope.userdata= null;
        $route.reload();
    };


    $scope.goToAllProduct = function()
    {
        $location.path("/productlist/All/index");
    }

    $scope.goToAddForm = function()
    {
        $location.path("/sellingaddform");
    }

    $scope.goToDashboard = function()
    {
        $location.path("/dashboard");
    }
    
    $scope.checkloginstatus = function()
    {
        if(localStorageService.get("loginstatus")==='in')
            {
        $scope.loggedin = true;
        $scope.userdata = localStorageService.get("userdata");
            }
        else
            {
                        $scope.loggedin = false;
        $scope.userdata = localStorageService.get("userdata");
            }
      
    };
    
    $interval($scope.checkloginstatus,50);
    
    
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
        templateUrl: 'template/home-unregistered.html'
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
    .when('/user/:username',{
        templateUrl: 'template/userprofile.html',
        controller: 'userProfileCtrl'
    })
    .when('/edit_password',{
        templateUrl: 'template/user_change_password.html',
        controller: 'editPasswordCtrl'
    })
    .when('/edit_profile',{
        templateUrl: 'template/user_edit_info.html',
        controller: 'editProfileCtrl'
    })
    .when('/dashboard', {
        templateUrl: 'template/sellingdashboard.html',
        controller: 'sellerMgtCtrl'
    })
    .when('/sellingaddform', {
        templateUrl: 'template/sellingaddform.html',
        controller: 'sellerAddCtrl'
    })
    .when('/sellingeditform', {
        templateUrl: 'template/sellingeditform.html',
        controller: 'sellerEditCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);

