const cacheName = 'v1';

//call instal event
self.addEventListener('install', (e) =>{
	console.log('Service Worker: Installed');
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
	e.respondWith(
		fetch(e.request)
		.then(res => {
			//copy/clone response
			const resClone = res.clone();
			//open cache
			caches
			.open(cacheName)
			.then(cache => {
				//add respon to cache
				cache.put(e.request, resClone);
			});
			return res;
		}).catch(ee => caches.match(e.request).then(res => res))
		);
});