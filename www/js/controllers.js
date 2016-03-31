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



    .controller('ProductListCtrl',  function ($scope, $location, $http, $cookies,Products) {
        $http.get('/dyn').then(function (response) {
            console.log('response.data.bby-'+response.data.bby);
            var bby = response.data.bby == 'Y';
            if(bby){
                $scope.searchKey = $cookies.mySearch;

                $scope.clearSearch = function () {
                    $scope.searchKey = "";
                    //$scope.products = Products.query();
                }

                $scope.search = function () {
                    console.log('ProductListCtrl in');
                    $cookies.mySearch = $scope.searchKey;
                    $scope.products = Products.query({query: $scope.searchKey});
                    if(!$scope.searchKey || $scope.searchKey == null || $scope.searchKey.length == 0) {
                        $scope.dealOfDay="Deal of the Day";
                    }else {
                        $scope.dealOfDay="";
                    }
                    console.log('ProductListCtrl out');
                }

                if($scope.products == null || $scope.products.length == 0){
                    if(!$scope.searchKey || $scope.searchKey == null || $scope.searchKey.length == 0) {
                        $scope.products = Products.query();
                        $scope.dealOfDay="Deal of the Day";
                    }else {
                        $scope.products = Products.query({query: $scope.searchKey});
                        $scope.dealOfDay="";
                    }
                }
            }else{
                console.log('Going to legacy');
                $scope.$state.go("search"); //$location.path("/search");
            }
        });
    })
    .controller('ProductDetailCtrl', function($scope, $stateParams, $http, $sce, Products) {
        $http.get('/dyn').then(function (response) {
            console.log('response.data.bby-'+response.data.bby);
            var bby = response.data.bby == 'Y';
            if(bby){
                $scope.product = Products.get({productId: $stateParams.productId});
                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };
                //try{$scope.product.reviewurl=$sce.trustAsResourceUrl($scope.product.reviewurl);}catch(err){}
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
    .controller('ProductBuyCtrl', function ($scope, $ionicModal,$stateParams, Products) {
        $scope.contacts = [
            { firstName: 'Jelastin', lastName: 'Johnsraj', email: 'anto@abc.com' }
        ];

        $ionicModal.fromTemplateUrl('templates/customer-modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.createContact = function(u) {
            //$scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
            $scope.contacts = [{ firstName: u.firstName, lastName: u.lastName, email: u.email }];
            $scope.modal.hide();
        };
        $scope.product = Products.get({productId: $stateParams.productId});
    })
    .controller('OrderConfirmationCtrl',  function ($scope, $location, $cookies, $http, $timeout, $filter) {
        $cookies.mySearch = "";
        var orderId = $filter('date')(new Date(), "yyyy-MM-dd-hh-MM-ss");
        orderId = 'BBY-LITE-'+orderId.replace(/-/g,'');
        var searchObject = $location.search();

        var order = {
            orderId:orderId,
            regId:  $cookies.regid,
            status: 1,
            productname:searchObject.productname,
            imagepath:searchObject.imagepath,
            price:searchObject.price
        };
        $http.post('/register/order',{order:order});

        $scope.callAtTimeout = function(id, time) {
           $http.get('/pushmsg?orderId='+id).then(function (response) {
               var hasNext = response.data;
               if(hasNext == 'Y'){
                   $timeout( function(){ $scope.callAtTimeout(id, time); }, time * 1000);
               }
           });
        };

        if(true) {
            $http.get('/dyn?interval=GET').then(function (res) {
                var time = res.data;
                time = parseInt(time);
                time = isNaN(time) ? 20 : time;
                $timeout(function () {$scope.callAtTimeout(orderId, time);}, time * 1000);
            });
        }
    })
    .controller('OrderViewCtrl', function ($scope,$stateParams, $http) {
        $http.get('/dyn?orderId='+$stateParams.orderId).then(function (res) {
            console.log('OrderViewCtrl response::',res);
            $scope.order = res.data;
        });
    });