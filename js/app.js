var app = angular.module('ListaComprasApp', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/listaCompras.html",
		controller: "HomeController"
	})
	.when("/addItem",{
		templateUrl: "views/addItem.html",
		controller: "ComprasItensController"
	})
	.
	when("/addItem/edit/:id",{
		templateUrl: "views/addItem.html",
		controller: "ComprasItensController"
	})

	.otherwise({
		redirectTo: "/"
	})
});

app.service('ListaComprasService', function(){
	var listaComprasService = {};

	listaComprasService.comprasItens = [
	{id: 1, completed: true, nome: 'Leite', 		data: new Date("October 1, 2014 11:13:00")},
	{id: 2, completed: true, nome: 'Biscoitos', 	data: new Date("October 1, 2014 11:13:00")},
	{id: 3, completed: true, nome: 'Sorvetes',		data: new Date("October 1, 2014 11:13:00")},
	{id: 4, completed: true, nome: 'Batatas',	 	data: new Date("October 2, 2014 11:13:00")},
	{id: 5, completed: true, nome: 'Cereal', 		data: new Date("October 3, 2014 11:13:00")},
	{id: 6, completed: true, nome: 'Pão',	 		data: new Date("October 3, 2014 11:13:00")},
	{id: 7, completed: true, nome: 'Ovos', 			data: new Date("October 4, 2014 11:13:00")},
	{id: 8, completed: true, nome: 'Tortillas',		data: new Date("October 5, 2014 11:13:00")}
	];

	listaComprasService.findById = function(id){
		for(var item in listaComprasService.comprasItens){
			if(listaComprasService.comprasItens[item].id === id){
				
				return listaComprasService.comprasItens[item];
			}
		}
	};

	listaComprasService.getNovoId = function(){
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
		var atualizarItem = listaComprasService.findById(entry.id);
		debugger;
		if(atualizarItem){
			atualizarItem.completed = entry.completed;
			atualizarItem.nome = entry.nome;
			atualizarItem.data = entry.data;
		}
		else{
			entry.id = listaComprasService.getNovoId();
			listaComprasService.comprasItens.push(entry);	
		}
		
	};

	listaComprasService.removerItem = function(entry){
		var index = listaComprasService.comprasItens.indexOf(entry);
		listaComprasService.comprasItens.splice(index, 1);
	};

	return listaComprasService;
});

app.controller("HomeController",["$scope", "ListaComprasService", function($scope, ListaComprasService){
	$scope.comprasItens = ListaComprasService.comprasItens;

	$scope.removerItem = function(entry){
		ListaComprasService.removerItem(entry);
	}
}]);


app.controller("ComprasItensController", ["$scope", "$routeParams", "$location", "ListaComprasService", function($scope, $routeParams, $location, ListaComprasService){

	if(!$routeParams){
		$scope.comprasItens = { id: 0, completed: true, nome: '', 		data: new Date() }	
	}
	else{
		$scope.comprasItens = _.clone(ListaComprasService.findById(parseInt($routeParams.id)));
	}

	$scope.salvar = function(){
		debugger;
		ListaComprasService.salvar($scope.comprasItens);
		console.log($scope.comprasItens);

		$location.path("/");
	}
}]);