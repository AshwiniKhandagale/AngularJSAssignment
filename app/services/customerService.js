App.service('customerService', function($http) {
    return {
      getData: function() {
        return $http({    // calls to $http return a promise object
          method: 'GET',
          url: '/asset/data.json',
          cache: true
        });
       },
      sendData : function(data){
         return $http.post('/asset/data.json', JSON.stringify(data));
      }
}
})