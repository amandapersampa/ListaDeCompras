/**
 * Created by Thomas on 5/28/2015.
 */
var app = angular.module('LitaComprasApp', []);

app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
}]);

app.controller("LitaComprasController", ["$scope", function($scope){


    $scope.comprasItems = [
        {completed: true, itemName: 'Leite', 		date: '2014-10-01'},
        {completed: true, itemName: 'Biscoitos', 	date: '2014-10-01'},
        {completed: true, itemName: 'Sorvetes',		date: '2014-10-02'},
        {completed: true, itemName: 'Batatas',	 	date: '2014-10-02'},
        {completed: true, itemName: 'Cereal', 		date: '2014-10-03'},
        {completed: true, itemName: 'Pão',	 		date: '2014-10-03'},
        {completed: true, itemName: 'Ovos', 		date: '2014-10-04'},
        {completed: true, itemName: 'Tortillas',	date: '2014-10-04'}
    ]

}]);