angular.module('directory.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('/employees/:employeeId/:data');
    })

    .factory('Products', function ($resource) {
        return $resource('/products/:productId/:data');
    })
    .factory('Authentication', function ($http, $q) {
        function isAuth() {
            var d = $q.defer();
            $http.get('/isAuthenticated').then(function (res) {
                if(res.data == "Y")
                    d.resolve(res.data);
                else
                    d.reject(res.data);
            })
            return d.promise;
        }
        return {
            isAuth: isAuth
        };
    });