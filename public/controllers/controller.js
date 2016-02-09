
var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl", function ($scope, $http) {
//myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");





    var refresh = function(){
		$http.get('/servprolist').success(function(response){
			console.log("I got it");
			$scope.servprolist = response;
			$scope.employee = "";
		});
	};

	refresh();

	

	$scope.addservpro = function(){
		console.log($scope.employee);
		$http.post('/servprolist',$scope.employee).success(function(response){
			console.log(response);
			refresh();
		});

	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/servprolist' + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/servprolist/' + id).success(function(response){
			$scope.employee = response;
		});
	};
	var t=1;
	$scope.getin = function(){
		console.log("hiii");
		$http.get('/cities',$scope.employee ).success(function(response){
			console.log(response);
			var x = document.getElementById("sell2");
     		for( var i=0;i<response.length;i++)
	       {
		       	if(t==1)
		       	{
		           var option =document.createElement("option");
		           option.text=response[i].cityname;
		           x.add(option);
				}
	       }
	       t=0;
		});
	$scope.update = function(){
		console.log($scope.employee._id);
		$http.put('/servprolist/' + $scope.employee._id, $scope.employee).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.employee = "";
	};


});	


