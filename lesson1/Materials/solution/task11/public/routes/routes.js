var module = angular.module('myapp', ['dndLists', 'ngRoute']);

module.config(['$routeProvider',
           function($routeProvider) {
               $routeProvider.
                   when('/section/:name', {
                       templateUrl: 'routes/viewSection/viewSection.html',
                       controller: 'ViewSectionController'
                   }).
                   when('/register', {
                       templateUrl: 'routes/userForm/userForm.html',
                       controller: 'UserFormController'
                   }).
                   when('/:section?', {
                       templateUrl: 'routes/notes/notes.html',
                       controller: 'NotesController'
                   }).
                   otherwise({
                       redirectTo: '/'
                   });
           }]);

