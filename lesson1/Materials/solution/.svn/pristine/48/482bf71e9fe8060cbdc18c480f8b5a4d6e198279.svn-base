function Hello($scope, $http) {
	$scope.greeting = "";
	$scope.update = function() {
		if ($scope.name) {
			$http.get("/greeting", 
				{params:
					{name: $scope.name}
				})
				.success(function(res) {
					$scope.greeting = res;
				});
		}
	}
}

