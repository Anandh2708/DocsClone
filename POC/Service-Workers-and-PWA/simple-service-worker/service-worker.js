self.addEventListener('install', (event) => {
    const cacheKey = 'MyFancyCacheName_v1';
  
    event.waitUntil(caches.open(cacheKey).then((cache) => {
      // Add all the assets in the array to the 'MyFancyCacheName_v1'
      // `Cache` instance for later use.
      return cache.addAll([
        'index.html'
      ]);
    }));
  });
  


  self.addEventListener('activate', (event) => {
    // Specify allowed cache keys
    const cacheAllowList = ['MyFancyCacheName_v2'];
  
    // Get all the currently active `Cache` instances.
    event.waitUntil(caches.keys().then((keys) => {
      // Delete all caches that aren't in the allow list:
      return Promise.all(keys.map((key) => {
        if (!cacheAllowList.includes(key)) {
          return caches.delete(key);
        }
      }));
    }));
  });
  

  self.addEventListener("fetch", (fetchEvent) => {

    fetchEvent.respondWith(
        fetch(fetchEvent.request).then(res => {
            const cacheRes = res.clone();
            caches.open(CACHE_NAME)
// Add the network response to the cache for future visits.
          // Note: we need to make a copy of the response to save it in
          // the cache and use the original as the request response.

              .then(cache => cache.put(fetchEvent.request, cacheRes));
            return res;
        }).catch(() => caches.match(fetchEvent.request).then(res => res))
	    );
	  });



// Establish a cache name
//const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});




// Establish a cache name
//const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a navigation request
  if (event.request.mode === 'navigate') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());

        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
  } else {
    return;
  }
});



// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});


