
module.controller('NotesController', function ($scope, $http, $routeParams, $location, Note) {
    $scope.activeSection = $routeParams.section;

    $scope.notes = [];
    $scope.orderID = 0;
    
    var update = function () {
        $scope.notes = Note.query({section: $scope.activeSection});
    };

    update();
    
    $scope.addNote = function () {
        if ($scope.text.length == 0) return;
        $scope.noteDate = new Date().getTime();
        var note = new Note();
        note.text = $scope.text;
        note.section = $scope.activeSection;

        note.$save(function () {
            $scope.text = '';
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
        $location.path(section.title);
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

module.factory('Note', function ($resource) {
    return $resource('/notes');
});