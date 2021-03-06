angular.module('directory', ['ionic', 'directory.controllers', 'directory.services','ngCookies'])

    .run(function ($rootScope, $state, $stateParams,$ionicPlatform) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'templates/employee-list.html',
                controller: 'EmployeeListCtrl'
            })
            .state('employee', {
                url: '/employees/:employeeId',
                templateUrl: 'templates/employee-detail.html',
                controller: 'EmployeeDetailCtrl'
            })

            .state('reports', {
                url: '/employees/:employeeId/reports',
                templateUrl: 'templates/employee-reports.html',
                controller: 'EmployeeReportsCtrl'
            })

            .state('list', {
                url: '/list',
                templateUrl: 'templates/product-list.html',
                controller: 'ProductListCtrl'
            })
            .state('product', {
                url: '/products/:productId',
                templateUrl: 'templates/product-detail.html',
                controller: 'ProductDetailCtrl'
            })
            .state('buy', {
                url: '/buy/:productId',
                templateUrl: 'templates/product-buy.html',
                controller: 'ProductBuyCtrl'
            })
            .state('order-confirmation', {
                url: '/order-confirmation',
                templateUrl: 'templates/order-confirmation.html',
                controller: 'OrderConfirmationCtrl'
            })
            .state('order-view', {
                url: '/order/view/:orderId',
                templateUrl: 'templates/order-view.html',
                controller: 'OrderViewCtrl'
            }).state('login', {
                url: '/login',
                templateUrl: 'templates/login1.html',
                controller: 'LoginCtrl'
            });

        $urlRouterProvider.otherwise('/list');

    });