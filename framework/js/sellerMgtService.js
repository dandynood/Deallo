/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('sellerMgtService',[])
.controller("sellerMgtCtrl",function($scope, $location,$window,$interval, $cookies, $http, localStorageService)
{
    "use strict"

  

    if(localStorageService.get("userdata")){}
    else{  $location.path('/home');}

    $scope.accountID = localStorageService.get("userdata").accountID;
    $scope.sellerProducts = null;
    $scope.buyerOrders = null;
    $scope.sellerHistory = null;
    $scope.pendingTransaction = null;
    $scope.totalRevenue = 0.00;
    $scope.graphPlotLine = new Array();
    $scope.graphPlotHist = new Array();
    $scope.graphPlotIndi = new Array();
    
    $scope.getSellersProducts = function(){
    var str = {accountID: encodeURIComponent($scope.accountID)};
    $http({method: 'POST', url:'php/sellerProducts.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
           alert($scope.noResult);
       } else {
           $scope.sellerProducts = response.data[0];

           $scope.initIndiArray(response.data[0]);

           console.log(response.data[0]);
           return response.data[0];
       }});
    };


    
    console.log($scope.getSellersProducts());
    console.log($scope.sellerProducts);

    $scope.getBuyerOrders = function(){
        var str = {accountID: encodeURIComponent($scope.accountID)};
        $http({method: 'POST', url:'php/getOrders.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
                alert($scope.noResult);
           } else {
               $scope.buyerOrders = response.data[0];
               $scope.pendingTransaction = response.data[0].length;
               console.log(response.data[0]);
               return response.data[0];
           }});
    };

    $scope.getBuyerOrders();

    $scope.getSellerHistory = function()
    {
        var str = {accountID: encodeURIComponent($scope.accountID)};
        $http({method: 'POST', url:'php/getSales.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
               alert($scope.noResult);
       
           } else {
               $scope.sellerHistory = response.data[0];
               console.log(response.data[0]);
            $scope.calculateRevenue(response.data[0]);
            $scope.plotGraph(response.data[0]);
               
            return response.data[0];
          
          
           }});
    };

    $scope.getSellerHistory();



    $scope.calculateRevenue = function(object)
    {
        for (var i =0 ;i < object.length;i++)
        {
            $scope.totalRevenue = $scope.totalRevenue + parseFloat(object[i].sales);
        }
        
    }

    $scope.initIndiArray = function(object)
    {
        for(var i=0;i<object.length;i++)
        {
            $scope.graphPlotIndi[i] = [object[i].productID, object[i].productName,[]];
        }

        console.log($scope.graphPlotIndi);
        console.log(object);
    }

    $scope.plotGraph = function(object)
    {

        var currentRevenue = 0
        var currentRevenueIndi = [];
        for(var x=0;x<$scope.graphPlotIndi.length;x++)
        {
                currentRevenueIndi[x]=0;
        }

        for(var i=0; i< object.length;i++)
        {
            currentRevenue = currentRevenue + parseFloat(object[i].sales);
            
            var dateobject = object[i].orderDate.split(" ");
        
            var date = dateobject[0].split("-");

            $scope.graphPlotLine[i]= [parseInt(date[0]),parseInt(date[1]),parseInt(date[2]),currentRevenue];
        
          

          
            for(var x=0;x<$scope.graphPlotIndi.length;x++)
            {
                
                if($scope.graphPlotIndi[x][0] == object[i].productID)
                {
                    console.log("yoyoyooyoyoyoyo");
                    currentRevenueIndi[x] = currentRevenueIndi[x] + parseFloat(object[i].sales);
                    console.log("cuurentIndi[x]"+currentRevenueIndi[x]);
                    $scope.graphPlotIndi[x][2].push([Date.UTC(parseInt(date[0]),parseInt(date[1]),parseInt(date[2])),parseFloat(currentRevenueIndi[x])]);
                }


            }
        
        }


        console.log($scope.graphPlotIndi);
        for(var i=0; i< object.length;i++)
            {
                currentRevenue = currentRevenue + parseFloat(object[i].sales);
                var dateobject = object[i].orderDate.split(" ");
            
                var date = dateobject[0].split("-");
    
                $scope.graphPlotHist[i]= [parseInt(date[0]),parseInt(date[1]),parseInt(date[2]),parseFloat(object[i].sales)];
            }

    }

        $window.graphPlotLine = $scope.graphPlotLine;
        $window.graphPlotHist = $scope.graphPlotHist;
        $window.graphPlotIndi = $scope.graphPlotIndi;
        $window.graphDate = $scope.graphDate;
  

});
