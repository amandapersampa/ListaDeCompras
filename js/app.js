var app = angular.module('ListaComprasApp', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/listaCompras.html",
		controller: "ListaComprasController"
	})
	.when("/addItem",{
		templateUrl: "views/addItem.html",
		controller: "ListaComprasController"
	})
	.otherwise({
		redirectTo: "/"
	})
});

app.controller("HomeController", ["$scope", function($scope) {
	$scope.appTitle = "Lista de Compras";
}]);

app.controller("ListaComprasController", ["$scope", function($scope){

	$scope.comprasItens = [
	{completed: true, nome: 'Leite', 		data: '2014-10-01'},
	{completed: true, nome: 'Biscoitos', 	data: '2014-10-01'},
	{completed: true, nome: 'Sorvetes',		data: '2014-10-02'},
	{completed: true, nome: 'Batatas',	 	data: '2014-10-02'},
	{completed: true, nome: 'Cereal', 		data: '2014-10-03'},
	{completed: true, nome: 'Pão',	 		data: '2014-10-03'},
	{completed: true, nome: 'Ovos', 		data: '2014-10-04'},
	{completed: true, nome: 'Tortillas',	data: '2014-10-04'}
	]

}]);