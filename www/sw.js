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

console.log('Started', self);

self.addEventListener('install', function(e) {
  console.log('Installed', e);
  e.waitUntil(
    caches.open('empdircache').then(function(cache) {
      return cache.addAll([
        '/',
        '/lib/ionic/css/ionic.css',
        '/css/style.css',
        '/lib/ionic/js/ionic.bundle.js',
        '/lib/ionic/js/angular/angular-resource.min.js',
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

        '/index.html',
        '/templates/employee-detail.html',
        'templates/employee-list.html',
        'templates/employee-reports.html',

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
        'employees/5/reports'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
  //self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('activate', event);
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);

  var title = 'Push message';

  event.waitUntil(
      self.registration.showNotification(title, {
        'body': 'The Message',
        'icon': '/img/ipnic.png'
      }));
});