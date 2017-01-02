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

app.service('ListaComprasService', function($http){
	var listaComprasService = {};

	listaComprasService.comprasItens = [$http];
	$http.get("data/server_data.json")
	.success(function(data){
		listaComprasService.comprasItens = data;

		for (var item in listaComprasService.comprasItens) {
			listaComprasService.comprasItens.data = new Date(listaComprasService.comprasItens[item].data);
		}
	})
	.error(function(data,status){
		alert("error");
	})
	;

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
		if(atualizarItem){
			$http.post("data/updated_item.json", entry)
			.success(function(data){
				if(data.status == 1){
					atualizarItem.completed = entry.completed;
					atualizarItem.nome = entry.nome;
					atualizarItem.data = entry.data;
					console.log(atualizarItem);
				}
			})
			.error(function(data, status){
				alert("error")
			});
			
		}
		else{
			$http.post("data/added_item.json", entry)
			.success(function(data){
				entry.id = data.newId;
				listaComprasService.comprasItens.push(entry);	

			})
			.error(function(data, status){
				alert("error")
			});
		}
		
	};

	listaComprasService.removerItem = function(entry){

		$http.post("data/delete_item.json", {id: entry.id})
		.success(function(data){
			if(data.status == 1){
				var index = listaComprasService.comprasItens.indexOf(entry);
				listaComprasService.comprasItens.splice(index, 1);
			}
		})
		.error(function(data, status){

		});
		
	};

	listaComprasService.marcarCompleted = function(entry){
		entry.completed = !entry.completed;
	};

	return listaComprasService;
});

app.controller("HomeController",["$scope", "ListaComprasService", function($scope, ListaComprasService){
	$scope.comprasItens = ListaComprasService.comprasItens;

	$scope.appTitle = "Lista de Compras";

	$scope.removerItem = function(entry){
		ListaComprasService.removerItem(entry);
	}

	$scope.marcarCompleted = function(entry){
		ListaComprasService.marcarCompleted(entry);
	}

	$scope.$watch(function(){return ListaComprasService.comprasItens}, function(comprasItens){
		$scope.comprasItens = comprasItens;
	});
}]);


app.controller("ComprasItensController", ["$scope", "$routeParams", "$location", "ListaComprasService", function($scope, $routeParams, $location, ListaComprasService){

	if(!$routeParams){
		$scope.comprasItens = { id: 0, completed: true, nome: '', 		data: new Date() }	
	}
	else{
		$scope.comprasItens = _.clone(ListaComprasService.findById(parseInt($routeParams.id)));
	}

	$scope.salvar = function(){
		ListaComprasService.salvar($scope.comprasItens);
		
		$location.path("/");
	}
}]);

app.directive("tbcomprasitem", function(){
	return {
		restrict: "E",
		templateUrl: "views/comprasItem.html"
	}
})