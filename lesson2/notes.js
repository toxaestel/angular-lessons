angular.module('myapp', []);

angular.module('myapp').controller('NotesController',
    function ($scope) {
        $scope.defaultNotes = [
            {name: 'tutorial', version: '0.0.1', text: 'test'},
            {name: 'tutorial2', version: '0.0.1', text: 'test1'},
            {name: 'tutorial3', version: '0.0.1', text: 'test2'},
            {name: 'tutorial4', version: '0.0.1', text: 'test3'}
        ];

        $scope.viewNotes = $scope.defaultNotes;

        $scope.rewritedNotes = [
            {name: 'tutorial', version: '0.0.1', text: 'texzt'},
            {name: 'tutorial2', version: '0.0.1', text: 'texzt1'},
            {name: 'tutorial3', version: '0.0.1', text: 'texzt2'},
            {name: 'tutorial4', version: '0.0.1', text: 'texzt3'}
        ];

        $scope.update = function (notes) {
            $scope.viewNotes = notes;
        };

    }
);
