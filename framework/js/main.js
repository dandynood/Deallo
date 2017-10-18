/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",['ngRoute']);
app.controller("mainCtrl", function($scope)
{
    "use strict";
    
    
    $scope.searchText = "";
    $scope.categorySelect = "All Categories";
    
    $scope.search = function(){

    };
    
});

app.controller("loginCtrl",function($scope, $location, $cookies, $http)
{
    "use strict";
    this.login = function(){
        var str = {username: encodeURIComponent(this.inputData.username), password: encodeURIComponent(this.inputData.password)};
        $http({method: 'POST', url:'php/loginJSON.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.errorMsg = 'Either the username or password is incorrect';
           } else {
               $cookies.put('user', response.data);
               $location.path("/home");
               $scope.errorMsg = "";
               $scope.currentLoggedInUser = $cookies.get('user');
           }
        });
    };
    
    this.logout = function(){
        this.inputData.username = "";
        this.inputData.password = "";
        $cookies.remove('user');
        $location.path('/home');
        $scope.currentLoggedInUser = "";
    };

    if(!$cookies.get('user') && $location.path() !== '/home')
    {
        $location.path('/home');
    }   
   
});

app.controller("registerCtrl",function($scope, $location, $cookies, $http)
{
    "use strict";
    this.login = function(){
        var str = {
            username: encodeURIComponent(this.inputData.username),
            password: encodeURIComponent(this.inputData.password),
            firstName: encodeURIComponent(this.inputData.firstName),
            lastName: encodeURIComponent(this.inputData.lastName),
            address: encodeURIComponent(this.inputData.address),
            postcode: encodeURIComponent(this.inputData.postcode),
            state: encodeURIComponent(this.inputData.state),
            country: encodeURIComponent(this.inputData.country),
            Email: encodeURIComponent(this.inputData.Email),
            phoneNumber: encodeURIComponent(this.inputData.phoneNumber),
            accountType: encodeURIComponent(this.inputData.accountType)};
        
        $http({method: 'POST', url:'php/register.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.errorMsg = 'Registration failed! Somethere went wrong! Sorry';
           }
        });
    };
    
    this.logout = function(){
        this.inputData.username = "";
        this.inputData.password = "";
        $cookies.remove('user');
        $location.path('/home');
        $scope.currentLoggedInUser = "";
    };

    if(!$cookies.get('user') && $location.path() !== '/home')
    {
        $location.path('/home');
    }   
   
});


app.config(['$routeProvider', function($routeProvider) 
{
    "use strict";
    $routeProvider
    .when('/home', {
        templateUrl: 'template/home-unregistered.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);
