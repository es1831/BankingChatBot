'use strict';

angular.module('Soju')
.controller('HomeController', ['$scope', '$location', '$mdSidenav', '$log', '$interval', function($scope, $location, $mdSidenav, $log, $interval) {

	/* Charts Initialization */
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.maintainAspectRatio = false;

	/* Radar Chart Initialization */
	$scope.radar_labels = ['Objects', 'Functions', 'Modules', 'Reusability', 'Duplication', 'Comments', 'Documentation'];

	$scope.radar_data = [
		[65, 59, 90, 81, 56, 55, 40],
		[28, 48, 40, 19, 96, 27, 100]
	];

	/* Bubble Chart Initialization */
	$scope.bubble_options = {
		scales: {
			xAxes: [{
				display: false,
				ticks: {
					max: 125,
					min: -125,
					stepSize: 10
				}
			}],
			yAxes: [{
				display: false,
				ticks: {
					max: 125,
					min: -125,
					stepSize: 10
				}
			}]
		}
	};

	createBubbleChart();
	$interval(createBubbleChart, 2000);

	function createBubbleChart() {

		$scope.bubble_series = [];
		$scope.bubble_data = [];
		for (var i = 0; i < 50; i++) {

			$scope.bubble_series.push('Series ${i}');
			$scope.bubble_data.push([{
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: randomRadius()
			}]);

		}

	}

	function randomScalingFactor() {

		return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);

	}

	function randomRadius() {

		return Math.abs(randomScalingFactor()) / 4;

	}


	/* Bar Chart Initialization */
	$scope.bar_colors = ['#2d87b2', '#fc5b6c', '#f1f1f1'];
	$scope.bar_labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	$scope.bar_data = [
		[32, 20, 44, 38, 19, 43, 12],
		[28, 24, 33, 22, 37, 27, 38]
	];
	$scope.datasetOverride = [
		{
			label: 'Bar chart',
			borderWidth: 1,
			type: 'bar'
		},
		{
			label: 'Line chart',
			borderWidth: 3,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			type: 'line'
		}
	];

	/* Knob Chart Initialization */

	$scope.first_knob_value = 65;
	$scope.first_knob_options = {
		size: 125,
		unit: '%',
		subText: {
			enabled: true,
			text: 'CPU used',
			color: 'grey',
			font: 'auto'
		},
		trackWidth: 20,
		barWidth: 10,
		trackColor: '#2d87b2',
		barColor: '#a0efdd'
	};
	$scope.second_knob_value = 35;
	$scope.second_knob_options = {
		size: 125,
		unit: '%',
		subText: {
			enabled: true,
			text: 'Memory used',
			color: 'grey',
			font: 'auto'
		},
		trackWidth: 20,
		barWidth: 10,
		trackColor: '#2d87b2',
		barColor: '#a0efdd'
	};
	$scope.third_knob_value = 88;
	$scope.third_knob_options = {
		size: 125,
		unit: '%',
		subText: {
			enabled: true,
			text: 'Storage used',
			color: 'grey',
			font: 'auto'
		},
		trackWidth: 20,
		barWidth: 10,
		trackColor: '#2d87b2',
		barColor: '#a0efdd'
	};

	/* End Charts Initialization */

	$scope.close = function() {

		$mdSidenav('left').close()
			.then(function() {

				$log.debug('close LEFT is done');

			});

	};
	$scope.toggleList = function() {

		$mdSidenav('left').toggle();

	};

}]);
