var module = angular.module('myapp', []);

module.controller('NotesController', function ($scope, $http) {
    $scope.notes = [];
    $scope.orderID = 0;
    
    var update = function () {
        $http.get('/notes', {params: {orderBy: $scope.orderSort.value}})
            .success(function (notes) {
                $scope.notes = notes;
            });
    };

    update();
    
    $scope.add = function () {
        $scope.noteDate = new Date().getTime();
        var note = {
            text: $scope.text,
            date: $scope.noteDate,
            orderID: $scope.orderID
        };
        $http.post('/notes', note)
            .success(function () {
                $scope.text = '';
                $scope.orderID += 1;
                update();
            });
    };

    $scope.remove = function (id) {
        $http.delete('/notes', {params: {id: id}})
            .success(function () {
                $scope.orderID -= 1;
                update();
            });
    };

    $scope.sendToTop = function (orderID) {
        $http.put('/notes', {params: {orderID: orderID}})
            .success(function () {
                update();
            });
    };

});