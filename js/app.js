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
	.when("/addItem/:id",{
		templateUrl: "views/addItem.html",
		controller: "ListaComprasController"
	})
	.otherwise({
		redirectTo: "/"
	})
});

app.service('ListaComprasService', function(){
	var listaComprasService = {};

	listaComprasService.comprasItens = [
	{id: 1, completed: true, nome: 'Leite', 		data: '2014-10-01'},
	{id: 2, completed: true, nome: 'Biscoitos', 	data: '2014-10-01'},
	{id: 3, completed: true, nome: 'Sorvetes',		data: '2014-10-02'},
	{id: 4, completed: true, nome: 'Batatas',	 	data: '2014-10-02'},
	{id: 5, completed: true, nome: 'Cereal', 		data: '2014-10-03'},
	{id: 6, completed: true, nome: 'Pão',	 		data: '2014-10-03'},
	{id: 7, completed: true, nome: 'Ovos', 		data: '2014-10-04'},
	{id: 8, completed: true, nome: 'Tortillas',	data: '2014-10-04'}
	];

	listaComprasService.getNovoId = function(){
		debugger;
		if(listaComprasService.newId){
			listaComprasService.newId++;
			return listaComprasService.newId;
		} else{
			var maxid = _.max(listaComprasService.comprasItens, function(entry){return entry.id})

			listaComprasService.newId = maxid.id + 1;
			return listaComprasService.newId;
		}
	};
	
	listaComprasService.salvar = function(entry){
		debugger;
		entry.id = listaComprasService.getNovoId();
		listaComprasService.comprasItens.push(entry);
	};

	return listaComprasService;
});

app.controller("HomeController", ["$scope", function($scope) {
	$scope.appTitle = "Lista de Compras";
}]);

app.controller("ListaComprasController", ["$scope", "$routeParams", "$location", "ListaComprasService", function($scope, $routeParams, $location, ListaComprasService){

	$scope.comprasItens = ListaComprasService.comprasItens;

	$scope.compraItem = { id: 0, completed: true, nome: '', 		data: new Date() }

	$scope.salvar = function(){
		debugger;
		ListaComprasService.salvar($scope.compraItem);
		console.log($scope.compraItem);

		$location.path("/");
	}
}]);