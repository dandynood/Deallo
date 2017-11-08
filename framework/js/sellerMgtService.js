/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('sellerMgtService',['ngRoute'])
.controller("sellerMgtCtrl",function($scope,$route, $location,$window,$interval, $cookies, $http, localStorageService)
{
    "use strict";

    if(localStorageService.get("userdata")){
        $scope.accountID = localStorageService.get("userdata").accountID;
    }
    else{  $location.path('/home');}

    $scope.sellerProducts = null;
    $scope.buyerOrders = null;
    $scope.sellerHistory = null;
    $scope.pendingTransaction = null;
    $scope.totalRevenue = 0.00;
    $scope.graphPlotLine = [];
    $scope.graphPlotHist = [];
    $scope.graphPlotIndi = [];
    $scope.graphPlotIndiHist = [];
    $scope.graphUpdate = false;
    

    $scope.setLocalEdit = function(m)
    {
        localStorageService.set("editid",m.productID);
        localStorageService.set("editprice",m.price);
        localStorageService.set("editdiscount",m.discount);
        localStorageService.set("editcategory",m.categoryID);
        localStorageService.set("editname", m.productName);
        localStorageService.set("editstock",m.stock);
        localStorageService.set("editdetails",m.description);
        localStorageService.set("editxdetails",m.extraDetails);
    }
    $scope.goToEdit = function()
    {
        $location.path("/sellingeditform");
    }
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
               $scope.noOrders = "No pending orders found";
               $scope.buyerOrders = "";
           } else {
               $scope.noOrders = "";
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
               $scope.noSellerHistory = "No selling history? Get started!";
           } else {
               $scope.noSellerHistory = "";
               $scope.sellerHistory = response.data[0];
               console.log("graph");
               console.log(response.data[0]);
            $scope.calculateRevenue(response.data[0]);
            $scope.plotGraph(response.data[0]);  
            return response.data[0];
           }});
    };

    $scope.getSellerHistory();



    $scope.calculateRevenue = function(object)
    {
        var i;
        for (i =0 ;i < object.length;i++)
        {
            $scope.totalRevenue = $scope.totalRevenue + parseFloat(object[i].sales);
        }
        
    };

    $scope.initIndiArray = function(object)
    {
        var i;
        for(i=0;i<object.length;i++)
        {
            $scope.graphPlotIndi[i] = [object[i].productID, object[i].productName,[]];
        }

        var x;
        for(x=0;x<object.length;x++)
        {
            $scope.graphPlotIndiHist[x] = [object[x].productID, object[x].productName,[]];
        }

        console.log($scope.graphPlotIndi);
        console.log(object);
    };

    $scope.plotGraph = function(object)
    {

        var currentRevenue = 0, x ,i, date,dateobject,

        
        currentRevenueIndi = [];

    
        for(x=0;x<$scope.graphPlotIndi.length;x++)
        {
                currentRevenueIndi[x]=0;
        }

        for(i=0; i< object.length;i++)
        {
            currentRevenue = currentRevenue + parseFloat(object[i].sales);
            
            dateobject = object[i].orderDate.split(" ");
        
            date = dateobject[0].split("-");

            $scope.graphPlotLine[i]= [parseInt(date[0]),parseInt(date[1]),parseInt(date[2]),currentRevenue];
        
            for(x=0;x<$scope.graphPlotIndi.length;x++)
            {
                
                if($scope.graphPlotIndi[x][0] === object[i].productID)
                {
                    //console.log("yoyoyooyoyoyoyo");
                    currentRevenueIndi[x] = currentRevenueIndi[x] + parseFloat(object[i].sales);
                    //console.log("cuurentIndi[x]"+currentRevenueIndi[x]);
                    $scope.graphPlotIndi[x][2].push([Date.UTC(parseInt(date[0]),parseInt(date[1]),parseInt(date[2])),parseFloat(currentRevenueIndi[x])]);
                    $scope.graphPlotIndiHist[x][2].push([Date.UTC(parseInt(date[0]),parseInt(date[1]),parseInt(date[2])),parseFloat(object[i].sales)]);
                }


            }
        
        }


        console.log($scope.graphPlotIndi);
        for(i=0; i< object.length;i++)
            {
                currentRevenue = currentRevenue + parseFloat(object[i].sales);
                dateobject = object[i].orderDate.split(" ");
            
                date = dateobject[0].split("-");
    
                $scope.graphPlotHist[i]= [parseInt(date[0]),parseInt(date[1]),parseInt(date[2]),parseFloat(object[i].sales)];
            }

    };
    
    
    $scope.checkDiscount = function(price,discount){
        var originalPrice = parseFloat(price),discountPrice;
        if(discount > 0){
            discountPrice = originalPrice - price*parseFloat(discount);
            return discountPrice.toString();
        } else {
            return price.toString();
        }
    };
    
    $scope.selectOrder = function(object){
        $scope.successDelivered = false;
        $scope.failDelivered = false;
        $scope.selectedOrder = object;
    };
    
    $scope.markDelivered = function(order,status){
        var str = {orderId: encodeURIComponent(order.orderId), productId: encodeURIComponent(order.productID), status: encodeURIComponent(status)};
        console.log(str);
        $http({method: 'POST', url:'php/setDelivered.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               console.log(response.data);
               $scope.failDelivered = true;
               $scope.successDelivered = false;
           } else {
               console.log(response.data);
               $scope.successDelivered = true;
               $scope.failDelivered = false;
               $scope.getBuyerOrders();
               $scope.getSellerHistory();

         
           setTimeout(function()
            {
                $location.path('/path');
                $location.path('/dashboard')
            },400)
            


           }});
    };
    

        $scope.sendWindowData = function()
        {
            $window.graphPlotLine = $scope.graphPlotLine;
            $window.graphPlotHist = $scope.graphPlotHist;
            $window.graphPlotIndi = $scope.graphPlotIndi;
            $window.graphPlotIndiHist = $scope.graphPlotIndiHist;
        }

        $scope.sendWindowData();


   

});
