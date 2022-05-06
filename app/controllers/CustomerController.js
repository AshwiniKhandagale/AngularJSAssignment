App.controller('CustomerController', [
    '$scope', 'customerService','$timeout','$http', 
    function ($scope,customerService, $timeout,$http) {
        $scope.customerList =[];
        $scope.sortKey = 'name';
        $scope.sortReverse = false;
        $scope.itemsPerPage = 5;
        $scope.isAllSelected =false;
        
        $scope.sort = function(key){
            $scope.sortReverse = ( $scope.sortKey == key) ? ! $scope.sortReverse :  $scope.sortReverse;
            $scope.sortKey = key;
        }
        var onSuccess = function (data, status, headers, config) {
            $scope.customerList = data.data.data;
            $scope.$applyAsync();
            console.log(' $scope.customerList: ',  $scope.customerList);
            
        };
        
        //Get All Customer Data
        customerService.getData().then(onSuccess);
         //Select All customer
        $scope.toggleAll = function() {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.customerList, function(itm){ itm.selected = toggleStatus; });
          
         }
         
         $scope.optionToggled = function(){
           $scope.isAllSelected = $scope.customerList.every(function(itm){ return itm.selected; })
         }
          //Delete one or more customer
         $scope.deleteCustomers = function(){
            var newCustomerListList=[];
            angular.forEach($scope.customerList,function(v){
            if(!v.selected){
                newCustomerListList.push(v);
            }
        });  
          $scope.customerList=newCustomerListList;
          console.log(' $scope.customerList: ',  $scope.customerList);
        };
        $scope.hasError = function(field, validation){
            if(validation){
              return ($scope.form[field].$dirty && $scope.form[field].$error[validation]) || ($scope.submitted && $scope.form[field].$error[validation]);
            }
            return ($scope.form[field].$dirty && $scope.form[field].$invalid) || ($scope.submitted && $scope.form[field].$invalid);
          };
          $scope.submit = function(customerL){
            customerL.id=  $scope.customerList.length+1;
            $scope.customerList.push(customerL)
          }
    }])
