var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {

	$scope.levels = [
		{
			board: [
				[0,0,0,0,0,0,0],
				[0,1,1,0,3,1,0],
				[0,0,1,0,0,1,0],
				[0,1,1,0,1,1,0],
				[0,1,2,0,1,2,0],
				[0,0,0,0,0,0,0],
			],
			start1: [4,1],
			start2: [4,4]
		},
		{
			board: [
				[0,0,0,0,0,0,0],
				[0,2,0,2,2,0,0],
				[0,1,1,0,3,0,0],
				[0,0,1,1,1,2,0],
				[0,1,1,1,1,1,0],
				[0,2,0,1,1,1,0],
				[0,0,0,0,0,0,0]
			],
			start1: [4,1],
			start2: [2,1]
		},
		/*{ //insert your other level(s) here
			board: [],
			start1: [],
			start2: []
		},*/
		{
			board: [
				[0,0,0,0,0,0,0,0,0,0],
				[0,1,1,0,1,1,1,3,0,0],
				[0,0,1,1,1,1,0,2,1,0],
				[0,0,1,2,1,1,1,1,1,0],
				[0,1,1,1,1,0,0,0,1,0],
				[0,0,0,0,0,0,0,0,0,0]
			],
			start1: [2,2],
			start2: [1,1]
		},
		{
			board: [
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,1,2,0,2,1,1,1,1,1,0],
				[0,0,1,1,2,1,1,1,0,2,1,0],
				[0,2,1,1,1,1,2,1,1,1,1,0],
				[0,1,1,1,0,2,0,1,1,1,1,0],
				[0,1,0,0,2,0,3,1,1,1,2,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
			],
			start1: [4,1],
			start2: [1,6]
		},
	];

	$scope.setStartPixels = function() {
		$scope.horizontal = 3 + (66 * $scope.start[1]) + 'px';
		$scope.vertical = 5 + (66 * $scope.start[0]) + 'px';
		
		$scope.horizontal2 = 3 + (66 * $scope.start2[1]) + 'px';
		$scope.vertical2 = 5 + (66 * $scope.start2[0]) + 'px';
	}
	
	$scope.setLevel = function() {
		console.log($scope.gameLevel, $scope.levels);
		if ($scope.gameLevel == $scope.levels.length) {
			$scope.displayVictory();
		}
		else {
			$scope.gameBoard = JSON.parse(JSON.stringify($scope.levels[$scope.gameLevel].board));
			$scope.start = JSON.parse(JSON.stringify($scope.levels[$scope.gameLevel].start1));
			$scope.start2 = JSON.parse(JSON.stringify($scope.levels[$scope.gameLevel].start2));
			/*$scope.gameBoard = $scope.levels[$scope.gameLevel].board;
			$scope.start = $scope.levels[$scope.gameLevel].start1;
			$scope.start2 = $scope.levels[$scope.gameLevel].start2;*/
			$scope.setStartPixels();
		}
	}
	
	$scope.gameLevel = 0;
	
	$scope.setLevel();
	
	$scope.moveHorizontal = function(increase) {
		var temp = $scope.start[1] + (increase > 0) - (increase < 0);
		var temp2 = $scope.start2[1] + (increase > 0) - (increase < 0);
		if ($scope.gameBoard[$scope.start[0]][temp] != 0) {
			$scope.horizontal = parseInt($scope.horizontal) + increase + 'px';
			$scope.start[1] = temp;
			//put it in loop
			if ($scope.gameBoard[$scope.start2[0]][temp2] != 0) {
			$scope.horizontal2 = parseInt($scope.horizontal2) + increase + 'px';
			$scope.start2[1] = temp2;
			}
		}
		if ($scope.start[0] == $scope.start2[0] && $scope.start[1] == $scope.start2[1]) {
			$scope.horizontal = parseInt($scope.horizontal) - increase + 'px';
			$scope.start[1] = $scope.start[1] - (increase > 0) + (increase < 0);
		}
		if ($scope.gameBoard[$scope.start2[0]][$scope.start2[1]] == 2 || $scope.gameBoard[$scope.start[0]][$scope.start[1]] == 2) {
			$scope.gameLevel = 0;
			$scope.setLevel();
		}
		if ($scope.gameBoard[$scope.start2[0]][$scope.start2[1]] == 3) {
			$scope.gameLevel++;
			$scope.setLevel();
		}
	}
	$scope.moveVertical = function(increase) {
		var temp = $scope.start[0] + (increase > 0) - (increase < 0);
		var temp2 = $scope.start2[0] + (increase > 0) - (increase < 0);
		if ($scope.gameBoard[temp][$scope.start[1]] != 0) {
			$scope.vertical = parseInt($scope.vertical) + increase + 'px';
			$scope.start[0] = temp;
			if ($scope.gameBoard[temp2][$scope.start2[1]] != 0) {
				$scope.vertical2 = parseInt($scope.vertical2) + increase + 'px';
				$scope.start2[0] = temp2;
			}
		}
		if ($scope.start[0] == $scope.start2[0] && $scope.start[1] == $scope.start2[1]) {
			$scope.vertical = parseInt($scope.vertical) - increase + 'px';
			$scope.start[0] = $scope.start[0] - (increase > 0) + (increase < 0);
		}
		if ($scope.gameBoard[$scope.start2[0]][$scope.start2[1]] == 2 || $scope.gameBoard[$scope.start[0]][$scope.start[1]] == 2) {
			$scope.gameLevel = 0;
			$scope.setLevel();
		}
		if ($scope.gameBoard[$scope.start2[0]][$scope.start2[1]] == 3) {
			$scope.gameLevel++;
			$scope.setLevel();
		}
	}
	$scope.keypress = function($event) {
		console.log("KEYPRESS");
		if ($event.keyCode == 37) {
			$scope.moveHorizontal(-66);
		}
		if ($event.keyCode == 39) {
			$scope.moveHorizontal(66);
		}
		if ($event.keyCode == 38) {
			$scope.moveVertical(-66);
		}
		if ($event.keyCode == 40) {
			$scope.moveVertical(66);
		}
	}
	
	$scope.displayVictory = function() {
		$scope.displayModal = true;
	}
	
	$scope.playAgain =function() {
		location.reload();
	}
});

app.directive('cngAutofocus', function () {
	return {
		link: link,
		restrict: 'A'           
	};
	function link(scope, element, attrs){
		console.log(element);
		element[0].focus();
	}
});