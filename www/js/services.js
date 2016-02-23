angular.module('directory.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('/employees/:employeeId/:data');
    })

    .factory('Products', function ($resource) {
        return $resource('/products/:productId/:data');
    });