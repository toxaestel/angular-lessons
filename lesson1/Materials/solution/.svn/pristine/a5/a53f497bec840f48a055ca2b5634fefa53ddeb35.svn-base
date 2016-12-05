var module = angular.module('myapp', ['dndLists']);

module.controller('NotesController', function($scope, $http) {

	var update = function(params) {
		var params = {params:{section:$scope.activeSection}};
		$http.get("/notes", params)
			.success(function(notes) {
				$scope.notes = notes;
			});
	};
	
	var readSections = function() {
		$http.get("/sections")
		.success(function(sections) {
			$scope.sections = sections;
			if ($scope.sections.length>0) {
				$scope.activeSection = $scope.sections[0].title;
			}
			update();
		});
	}
	
	$scope.update = update;

	$scope.add = function() {
		if ($scope.text.length==0) return;
		var note = {text: $scope.text};
		note.section = $scope.activeSection;
		$http.post("/notes", note).success(function() {
				$scope.text = "";
				update();
			});
	};

	readSections();
	
	$scope.showSection = function(section) {
		$scope.activeSection = section.title;
		update();
	}
	
	$scope.addSection = function() {
		if ($scope.newSection.length==0) return;
		// check for duplicates
		for (var i=0;i<$scope.sections.length;i++) {
			if ($scope.sections[i].title==$scope.newSection) {
				return;
			}
		}
		
		var section = {title: $scope.newSection};
		$scope.sections.unshift(section);
		$scope.activeSection = $scope.newSection;
		$scope.newSection = "";
		$scope.writeSections();
		update();
	}
	
    $scope.writeSections = function() {
        // replace sections after dragging to reflect the new order
    		if ($scope.sections && $scope.sections.length>0) {
    			$http.post("/sections/replace", $scope.sections);
    		}
    };
    
});
