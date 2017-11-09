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
                          'checkoutService',
                          'LocalStorageModule']);
app.controller("mainCtrl", function($scope,$window,$location,$http,localStorageService,$interval,$route,$rootScope)
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
        localStorageService.remove("cart");
        $scope.shoppingCart = [];
        $scope.loggedin = false;
        $scope.userdata= null;
        $route.reload();
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
    
    $scope.goTocheckout = function()
    {
        $location.path('/checkout');

    };
    
    $rootScope.$on("callGetShoppingCart", function(){
           $scope.getShoppingCart();
        });

    $scope.getShoppingCart = function(){
        if(localStorageService.get("cart")){
            $scope.shoppingCart = localStorageService.get("cart");
        } else {
            $scope.shoppingCart = [];
        }
    };
    
    $scope.getShoppingCart();
    
    $scope.quantityToBuy = 1;
    
    $scope.getQuantityValid = function(){
        if($scope.quantityToBuy === 0 || $scope.quantityToBuy === ""){
            return true;
        }
        return false;
    };
    
    $scope.addToCart = function(product,quantity){
        var i, alreadyPresent = false;
        $scope.quantityToBuy = angular.copy(quantity);
        
        for(i=0;i<$scope.shoppingCart.length;i++){
            if($scope.shoppingCart[i].productID === product.productID){
                alreadyPresent = true;
                $scope.shoppingCart[i].quantity = $scope.shoppingCart[i].quantity + quantity;
                break;
            } else {
                alreadyPresent = false;
            }
        }
        
        if(alreadyPresent === false){
            product.quantity = quantity;
            $scope.shoppingCart.push(product);
        }
        
        localStorageService.set("cart", $scope.shoppingCart);
        console.log(localStorageService.get("cart"));
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
        controller: 'sellerMgtCtrl'
    })
    .when('/checkout', {
        templateUrl: 'template/checkout.html',
        controller: 'checkoutCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);

