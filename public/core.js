// public/core.js

var app = angular.module('jct', []);  
app.controller('createTicketPage', function($scope, $http){
    $scope.createTicket = function(){
        var submitData = [
            $scope.formSubject,
            $scope.formTime,
            $scope.formBody
        ];
        // for(var i=0; i<submitData.length; i++){
        //     alert(submitData[i]);
        // }
        $http.post('/api/tickets', submitData)
            .then(alert("POST success"), alert("POST failure"));
    };
});