// make sure sw are suport
if('serviceWorker' in navigator){
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/UASPAW/sw_cached_pages.js')
			.then(reg => console.log('Service Worker: Registered'))
			.catch(err => console.log('Service Worker: Error: ${err}'))
	})
}