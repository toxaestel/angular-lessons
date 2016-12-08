var module = angular.module('myapp', ['dndLists']);

module.controller('NotesController', function ($scope, $http) {
    $scope.notes = [];
    $scope.orderID = 0;
    
    var update = function () {
        var params = {params: {
            orderBy: $scope.orderID,
            section: $scope.activeSection
        }};
        $http.get('/notes', params)
            .success(function (notes) {
                $scope.notes = notes;
            });
    };

    update();
    
    $scope.addNote = function () {
        if (!$scope.text || $scope.text.length == 0) return;
        $scope.noteDate = new Date().getTime();
        var note = {
            text: $scope.text,
            date: $scope.noteDate,
            orderID: $scope.orderID,
            section: $scope.activeSection
        };
        $http.post('/notes', note)
            .success(function () {
                $scope.text = '';
                $scope.orderID += 1;
                update();
            });
    };

    $scope.sendToTop = function (orderID) {
        $http.put('/notes', {params: {orderID: orderID}})
            .success(function () {
                update();
            });
    };

    var readSections = function () {
        $http.get('/sections')
            .success(function (sections) {
                $scope.sections = sections;
                if ($scope.activeSection == null && $scope.sections.length > 0) {
                    $scope.activeSection = $scope.sections[0].title;
                }
                update();
            });
    };

    readSections();
    
    $scope.showSection = function (section) {
        $scope.activeSection = section.title;
        update();
    };

    $scope.writeSections = function () {
        if ($scope.sections && $scope.sections.length > 0) {
            $http.post('/sections/replace', $scope.sections);
        }
    };

    $scope.addSection = function () {
        if ($scope.newSection.length == 0) return;

        for (var i = 0; i < $scope.sections.length; i++) {
            if ($scope.sections[i].title == $scope.newSection) return;
        }

        var section = {title: $scope.newSection};
        $scope.sections.unshift(section);
        $scope.activeSection = $scope.newSection;
        $scope.newSection = '';
        $scope.writeSections();
        update();
    };

});