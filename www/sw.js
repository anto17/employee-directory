/*
 *
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

importScripts('/cache-polyfill.js');

console.log('Started.', self);

self.addEventListener('install', function (e) {
    console.log('Installed', e);
    e.waitUntil(
        caches.open('empdircache').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/lib/ionic/css/ionic.css',
                '/css/style.css',
                '/lib/ionic/js/ionic.bundle.js',
                '/lib/ionic/js/angular/angular-resource.min.js',
                '/lib/ionic/js/angular/angular-cookies.min.js',
                '/lib/jquery.min.js',
                '/cordova.js',
                '/js/app.js',
                '/js/controllers.js',
                '/js/services.js',
                '/lib/ionic/fonts/ionicons.ttf?v=1.5.2',

                '/pics/Lisa_Wong.jpg',
                '/pics/Gary_Donovan.jpg',
                '/pics/Kathleen_Byrne.jpg',
                '/pics/Amy_Jones.jpg',
                '/pics/Steven_Wells.jpg',
                '/pics/James_King.jpg',
                '/pics/Julie_Taylor.jpg',
                '/pics/Eugene_Lee.jpg',
                '/pics/John_Williams.jpg',
                '/pics/Ray_Moore.jpg',
                '/pics/Paul_Jones.jpg',
                '/pics/Paula_Gates.jpg',
                '/templates/employee-detail.html',
                '/templates/employee-list.html',
                '/templates/employee-reports.html',

                '/employees',
                '/employees/0',
                '/employees/1',
                '/employees/2',
                '/employees/3',
                '/employees/4',
                '/employees/5',
                '/employees/6',
                '/employees/7',

                'employees/0/reports',
                'employees/1/reports',
                'employees/2/reports',
                'employees/3/reports',
                'employees/4/reports',
                'employees/5/reports',

                '/templates/product-list.html',
                '/templates/product-detail.html',
                '/dyn',
                '/img/header_sprite.png',
                '/products',
                '/manifest.json',

                '/products/4684000',
                '/products/4684101',
                '/products/4684301',
                '/products/2178004',
                '/products/9055007',

                'http://img.bbystatic.com/BestBuy_US/images/products/4684/4684000_sc.jpg',
                'http://bestbuy.ugc.bazaarvoice.com/static/3545a/r_5_ispacer.gif',
                'http://bestbuy.ugc.bazaarvoice.com/static/3545a/bazaarvoice.css'
            ]).then(function () {
                return self.skipWaiting();
            });
        })
    );
    //self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log('activate', event);
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('Push message', event);
    event.waitUntil(
        fetch('/getmsginfo').then(function(response) {
            return response.json().then(function(data) {
                console.log('Response from getmsginfo service::',data);
                var title = data.title || 'A Price Drop Alert';
                var message = data.msg || 'A price drop for most of the items - Next 1 hour sale';

                return self.registration.showNotification(title, {
                    'body': message,
                    'icon': '/img/price_reduced.png',
                    'data': data.sku || ''
                });
            });
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    var sku = event.notification.data;
    console.log(event.notification);
    // Android doesn't close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == '/' && 'focus' in client)
                    return client.focus();
            }
            if (clients.openWindow) {
                if(sku){
                    return clients.openWindow('/index.html#/products/'+sku);
                }else{
                    return clients.openWindow('/');
                }

            }
        })
    );
});

 self.registration.showNotification('Buzz!', {
 body: 'Bzzz bzzzz',
 vibrate: [300, 100, 400] // Vibrate 300ms, pause 100ms, then vibrate 400ms
 });