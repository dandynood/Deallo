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
                          'LocalStorageModule']);
app.controller("mainCtrl", function($scope,$window,$location,$http,localStorageService,$interval)
{
    "use strict";
    $scope.searchItemText = "";
    $scope.categorySelected = "";
    $scope.showingResultsFor = "";
    
    $scope.loggedin = false;
    
    $scope.logoutaccount = function()
    {
        localStorageService.remove("loginstatus");
        localStorageService.remove("userdata");
        $scope.loggedin = false;
        $scope.userdata= null;
        
        //alert("gej");
    };


 //   localStorageService.set("loginstatus",false);
        

    
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
        controller: 'userProfileCtrl'
    })
    .when('/selling', {
        templateUrl: 'template/sellingdashboard.html',
        controller: 'sellerMgtCtrl'
    })
    .when('/sellingaddform', {
        templateUrl: 'template/sellingaddform.html',
        controller: 'sellerMgtCtrl'
    })
    .when('/sellingeditform', {
        templateUrl: 'template/sellingeditform.html',
        controller: 'sellerMgtCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);

