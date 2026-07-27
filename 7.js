// =============================================
// DEBOUNCE IMPLEMENTATION
// =============================================

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        // Clear the previous timer
        clearTimeout(timeoutId);
        
        // Start a new timer
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// =============================================
// THROTTLE IMPLEMENTATION (Leading + Trailing)
// =============================================

function throttle(func, limit) {
    let inCooldown = false;
    let lastArgs = null;
    let lastThis = null;
    let timeoutId = null;
    
    return function(...args) {
        // If not in cooldown, execute immediately
        if (!inCooldown) {
            func.apply(this, args);
            inCooldown = true;
            
            // Start cooldown period
            timeoutId = setTimeout(() => {
                inCooldown = false;
                
                // If there were trailing calls, execute one now
                if (lastArgs) {
                    func.apply(lastThis, lastArgs);
                    lastArgs = null;
                    lastThis = null;
                    
                    // Restart cooldown
                    inCooldown = true;
                    timeoutId = setTimeout(() => {
                        inCooldown = false;
                    }, limit);
                }
            }, limit);
        } else {
            // Store the latest arguments for trailing execution
            lastArgs = args;
            lastThis = this;
        }
    };
}

// =============================================
// SIMPLER THROTTLE (Leading only)
// =============================================

function simpleThrottle(func, limit) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

// =============================================
// USE CASE 1: SEARCH INPUT (Debounce)
// =============================================

// Scenario: User typing in a search box
const searchInput = document.getElementById('search');

const performSearch = (query) => {
    console.log(`Making API call for: "${query}"`);
    // fetch(`/api/search?q=${query}`)
};

// Wait 300ms after user stops typing
const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// User types "H" -> no API call
// User types "He" -> no API call (timer resets)
// User types "Hel" -> no API call (timer resets)
// User types "Hell" -> no API call (timer resets)
// User types "Hello" -> waits 300ms, then makes ONE API call
// Result: 1 API call instead of 5!

// =============================================
// USE CASE 2: SCROLL EVENT (Throttle)
// =============================================

// Scenario: Infinite scroll / position tracking
const handleScroll = () => {
    const scrollY = window.scrollY;
    console.log(`Scrolled to: ${scrollY}px`);
    // Check if user reached bottom, load more content
};

// Execute at most once every 200ms
const throttledScroll = throttle(handleScroll, 200);

window.addEventListener('scroll', throttledScroll);

// User scrolls 1000px in 100ms -> 
// Executes at time 0, then ignores all until 200ms mark
// At 200ms, executes again with latest position
// Result: 1000 scroll events become ~5-10 events

// =============================================
// USE CASE 3: WINDOW RESIZE (Throttle or Debounce?)
// =============================================

// Throttle for responsive updates (execute during resize)
const updateLayout = () => {
    console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`);
};

const throttledResize = throttle(updateLayout, 200);
window.addEventListener('resize', throttledResize);

// Debounce for expensive operations (execute after resize stops)
const recalculateCharts = () => {
    console.log('Recalculating expensive charts...');
};

const debouncedRecalc = debounce(recalculateCharts, 500);
window.addEventListener('resize', debouncedRecalc);

// =============================================
// USE CASE 4: BUTTON CLICK (Throttle with leading)
// =============================================

const handleSubmit = () => {
    console.log('Submitting form...');
    // POST /api/submit
};

// Prevent double submission
const throttledSubmit = throttle(handleSubmit, 1000);

document.getElementById('submitBtn').addEventListener('click', throttledSubmit);

// Click 1 (0ms): Executes immediately
// Click 2 (100ms): Ignored
// Click 3 (200ms): Ignored
// Click 4 (1100ms): Executes again (cooldown expired)

// =============================================
// USE CASE 5: SAVE AUTO-SAVE (Debounce)
// =============================================

class DocumentEditor {
    constructor() {
        this.save = debounce(this.saveDocument.bind(this), 2000);
        this.content = '';
    }
    
    updateContent(newContent) {
        this.content = newContent;
        this.save(); // Auto-save after user stops typing
    }
    
    saveDocument() {
        console.log('Saving to server:', this.content);
        // POST /api/save
    }
}

const editor = new DocumentEditor();
editor.updateContent('Hello'); // Timer starts
editor.updateContent('Hello World'); // Timer resets
editor.updateContent('Hello World!'); // Timer resets
// After 2 seconds of inactivity: Saves once