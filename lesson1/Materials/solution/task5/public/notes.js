var module = angular.module('myapp', []);

module.controller('NotesController', function($scope, $http) {

	var update = function() {
		$http.get("/notes")
			.success(function(notes) {
				$scope.notes = notes;
			});
	};
	
	$scope.update = update;

	$scope.add = function() {
		var note = {text: $scope.text};
		$http.post("/notes", note).success(function() {
				$scope.text = "";
				update();
			});
	};

	update();
});
