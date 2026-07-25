// Without WeakMap: Memory leak!
const cache = new Map();
const element = document.getElementById('button');
cache.set(element, { clicks: 0 }); // Map holds the DOM node
element.remove(); // Removed from DOM, but Map still has it → memory leak!

// With WeakMap: Safe!
const cache = new WeakMap();
const element = document.getElementById('button');
cache.set(element, { clicks: 0 }); // WeakMap holds weak reference
element.remove(); // No other references → GC removes both element and cache entry