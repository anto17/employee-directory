angular.module('directory.controllers', [])

    .controller('EmployeeListCtrl', function ($scope, Employees) {
        console.log('search controller in');
        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.employees = Employees.query();
        }

        $scope.search = function () {
            $scope.employees = Employees.query({name: $scope.searchKey});
        }

        $scope.employees = Employees.query();
    })
    .controller('EmployeeDetailCtrl', function($scope, $stateParams, Employees) {
        console.log('details');
        $scope.employee = Employees.get({employeeId: $stateParams.employeeId});
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, Employees) {
        console.log('reports');
        $scope.employee = Employees.get({employeeId: $stateParams.employeeId, data: 'reports'});
    })



    .controller('ProductListCtrl', function ($scope, $location, $http, Products) {
        $http.get('/dyn').then(function (response) {
            console.log('response.data.bby-'+response.data.bby);
            var bby = response.data.bby == 'Y';
            if(bby){
                $scope.searchKey = "";

                $scope.clearSearch = function () {
                    $scope.searchKey = "";
                    $scope.products = Products.query();
                }

                $scope.search = function () {
                    console.log('ProductListCtrl in');
                    $scope.products = Products.query({query: $scope.searchKey});
                    console.log('ProductListCtrl out');
                }

                $scope.products = Products.query();
            }else{
                console.log('Going to legacy');
                $scope.$state.go("search"); //$location.path("/search");
            }
        });
    })
    .controller('ProductDetailCtrl', function($scope, $stateParams, $http, Products) {
        $http.get('/dyn').then(function (response) {
            console.log('response.data.bby-'+response.data.bby);
            var bby = response.data.bby == 'Y';
            if(bby){
                $scope.product = Products.get({productId: $stateParams.productId});
            }else{
                console.log('Going to legacy');
                $scope.$state.go("search");
            }
        });
    })
    .controller('ProductReportsCtrl', function ($scope, $stateParams, Products) {
        console.log('ProductReportsCtrl');
        $scope.product = Products.get({productId: $stateParams.productId, data: 'reports'});
    })