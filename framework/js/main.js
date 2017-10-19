/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",['ngRoute']);
app.controller("mainCtrl", function($scope,$window,$interval)
{
    "use strict";
    
    
    $scope.searchText = "";
    $scope.categorySelect = "All Categories";
    
    $scope.search = function(){

    };
    
   
    
      $scope.warningArray = new Array();
             
        $scope.enableWarning = function(num)
        {
            $scope.warningArray[num] = true;
        }
    
       $scope.disableWarning =function(num)
        {
            $scope.warningArray[num] = false;
            
        }
        
   



     var alwaysCheckForm = function()
    {
        
       
        /** Section 1 **/
        $window.email = $scope.registerform.email.$valid;
        $window.password = $scope.registerform.password.$valid;
        if($scope.password == $scope.repassword)
        {
        $window.repassword = $scope.registerform.repassword.$valid;
        }
        
        /** Section 2 **/
        $window.first = $scope.registerform2.first.$valid;
        $window.last = $scope.registerform2.last.$valid;
        $window.tel = $scope.registerform2.tel.$valid;
        
        /** Section 3 **/
        $window.address1 = $scope.registerform3.address1.$valid;
        $window.address2 = $scope.registerform3.address2.$valid;
        $window.postcode = $scope.registerform3.postcode.$valid;
        $window.city = $scope.registerform3.city.$valid;
        $window.state = $scope.registerform3.state.$valid;
        $window.country = $scope.registerform3.country.$valid;
        
        $window.loginemail  = $scope.registerform4.loginemail.$valid;
        $window.loginpassword  = $scope.registerform4.loginpassword.$valid;
        
        alert($scope.registerform4.loginpassword.$valid);
        
        $window.warning0 = $scope.warningArray[0];
        $window.warning1 = $scope.warningArray[1];
        $window.warning2 = $scope.warningArray[2];
        $window.warning3 = $scope.warningArray[3];
        $window.warning4 = $scope.warningArray[4];
        $window.warning5 = $scope.warningArray[5];
        $window.warning6 = $scope.warningArray[6];
        $window.warning7 = $scope.warningArray[7];
        $window.warning8 = $scope.warningArray[8];
        $window.warning9 = $scope.warningArray[9];
        $window.warning10 = $scope.warningArray[10];
        $window.warning11 = $scope.warningArray[11];
        
        /* Section Login */
        
        if($scope.registerform4.loginemail.$valid && $scope.registerform4.loginpassword.$valid)
        {
            $window.loginstat = true;
        }
        else
        {
            $window.loginstat = false;
        }


    }
 
    setInterval(alwaysCheckForm,50);
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
    .when('/register', {
        templateUrl: 'template/register.html'
    })
    .when('/login', {
        templateUrl: 'template/login.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);
