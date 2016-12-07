var module = angular.module('myapp', []);

module.controller('NotesController', function ($scope, $http) {
    $scope.notes = [];
    
    var update = function () {
        $http.get('/notes')
            .success(function (notes) {
                $scope.notes = notes;
            });
    };

    update();
    
    $scope.add = function () {
        var note = {
            text: $scope.text
        };
        $http.post('/notes', note)
            .success(function () {
                $scope.text = '';
                update();
            });
    };

    $scope.remove = function () {
        $http.delete('/notes', {params: {id: id}})
            .success(function () {
                update();
            });
    }
});