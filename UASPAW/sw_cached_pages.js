const cacheName = 'v1';
const cacheAssets = [
	'index.html',
	'/UASPAW/index.html',
	'/UASPAW/pages/about.html',
	'/UASPAW/pages/contact.html',
	'/UASPAW/css/materialize.css',
	'/UASPAW/css/materialize.min.js',
	'/UASPAW/css/style.css',
	'/UASPAW/img/dish.png',
	'/UASPAW/js/main.js',
	'/UASPAW/js/materialize.js',
	'/UASPAW/js/materialize.min.js',
	'/UASPAW/js/ui.js'

];

//call instal event
self.addEventListener('install', (e) =>{
	console.log('Service Worker: Installed');
 
	e.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			console.log('Service Worker: Catching Files');
			cache.addAll(cacheAssets);  
		})
		.then(() => self.skipWaiting)
		);
	}); 

//call activated event
self.addEventListener('activate', (e) =>{
	console.log('Service Worker: Activated');
//remove unwanted caches
	e.waitUntil(
		caches.keys().then(cacheName => {
			return Promise.all(
				cacheName.map(cache => {
					if(cache !== cacheName){
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			)
		})
	); 
});
//call fetch
self.addEventListener('fetch', e =>{
	console.log('Service Worker : Fetching');
	e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});