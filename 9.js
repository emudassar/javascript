<!-- ============================================= -->
<!-- HTML STRUCTURE FOR OUR EXAMPLES -->
<!-- ============================================= -->

<!DOCTYPE html>
<html>
<body>
    <div id="grandparent">
        <div id="parent">
            <button id="child">Click Me!</button>
        </div>
    </div>
    
    <!-- For our examples -->
    <div id="debug"></div>

    <script>
        // =============================================
        // EXAMPLE 1: DEFAULT BEHAVIOR (BUBBLING)
        // =============================================
        
        const grandparent = document.getElementById('grandparent');
        const parent = document.getElementById('parent');
        const child = document.getElementById('child');
        
        // Add listeners to all three elements (default = bubbling)
        grandparent.addEventListener('click', function(e) {
            console.log('Grandparent (bubbling)');
        });
        
        parent.addEventListener('click', function(e) {
            console.log('Parent (bubbling)');
        });
        
        child.addEventListener('click', function(e) {
            console.log('Child (target)');
        });
        
        // Click the button:
        // Console output:
        // "Child (target)"      <- Starts at target
        // "Parent (bubbling)"   <- Then bubbles up
        // "Grandparent (bubbling)" <- Then bubbles up more
        
        // =============================================
        // EXAMPLE 2: CAPTURING BEHAVIOR
        // =============================================
        
        // Add listeners with capturing (third parameter = true)
        grandparent.addEventListener('click', function(e) {
            console.log('Grandparent (capturing)');
        }, true);
        
        parent.addEventListener('click', function(e) {
            console.log('Parent (capturing)');
        }, true);
        
        child.addEventListener('click', function(e) {
            console.log('Child (target)');
        });
        
        // Click the button:
        // Console output:
        // "Grandparent (capturing)" <- Starts at top, goes down
        // "Parent (capturing)"      <- Then to parent
        // "Child (target)"          <- Then reaches target
        
        // =============================================
        // EXAMPLE 3: BUBBLING + CAPTURING TOGETHER
        // =============================================
        
        // Add both bubbling AND capturing listeners
        grandparent.addEventListener('click', function(e) {
            console.log('Grandparent (capturing)');
        }, true); // Capturing
        
        grandparent.addEventListener('click', function(e) {
            console.log('Grandparent (bubbling)');
        }, false); // Bubbling (default)
        
        parent.addEventListener('click', function(e) {
            console.log('Parent (capturing)');
        }, true);
        
        parent.addEventListener('click', function(e) {
            console.log('Parent (bubbling)');
        }, false);
        
        child.addEventListener('click', function(e) {
            console.log('Child (target)');
        });
        
        // Click the button:
        // Console output:
        // "Grandparent (capturing)" <- Capture phase (top to bottom)
        // "Parent (capturing)"      <- Capture phase
        // "Child (target)"          <- Target phase
        // "Parent (bubbling)"       <- Bubble phase (bottom to top)
        // "Grandparent (bubbling)"  <- Bubble phase
        
        // =============================================
        // EXAMPLE 4: STOPPING PROPAGATION
        // =============================================
        
        // Stop bubbling at parent level
        parent.addEventListener('click', function(e) {
            console.log('Parent (bubbling) - stopping propagation');
            e.stopPropagation(); // Stops event from going further up
        });
        
        grandparent.addEventListener('click', function(e) {
            console.log('Grandparent (bubbling) - WILL NOT RUN');
        });
        
        child.addEventListener('click', function(e) {
            console.log('Child (target) - runs normally');
        });
        
        // Click the button:
        // Console output:
        // "Child (target) - runs normally"
        // "Parent (bubbling) - stopping propagation"
        // (Grandparent listener does NOT run because propagation stopped)
        
        // =============================================
        // EXAMPLE 5: event.target vs event.currentTarget
        // =============================================
        
        document.body.addEventListener('click', function(e) {
            console.log('Target (what was clicked):', e.target.tagName);
            console.log('Current Target (what is handling):', e.currentTarget.tagName);
        });
        
        // Click the button:
        // Console output:
        // "Target (what was clicked): BUTTON"
        // "Current Target (what is handling): BODY"
        
        // =============================================
        // EXAMPLE 6: REAL-WORLD - EVENT DELEGATION
        // =============================================
        
        // Problem: You have many items, don't want to add listener to each
        const list = document.getElementById('myList');
        
        // SOLUTION: Add ONE listener to the parent (uses bubbling)
        list.addEventListener('click', function(e) {
            // Check if the clicked item is an LI
            if (e.target.tagName === 'LI') {
                console.log('You clicked list item:', e.target.textContent);
                // Now you can handle the click without attaching
                // listeners to each individual item
            }
        });
        
        // HTML:
        // <ul id="myList">
        //     <li>Item 1</li>
        //     <li>Item 2</li>
        //     <li>Item 3</li>
        // </ul>
        
        // Click "Item 2":
        // Console output: "You clicked list item: Item 2"
        
        // Even if you add new items dynamically:
        const newItem = document.createElement('li');
        newItem.textContent = 'Item 4';
        list.appendChild(newItem);
        // Clicking "Item 4" works automatically! (No extra code needed)
        
        // =============================================
        // EXAMPLE 7: VISUAL DEMO WITH COLORS
        // =============================================
        
        // Simple visual demonstration
        function addColorListener(element, color, phase) {
            element.addEventListener('click', function(e) {
                // Don't change background if it's the target
                if (e.target === element) {
                    element.style.backgroundColor = color;
                }
                // Log what happened
                console.log(`${element.id} (${phase})`);
            }, phase === 'capturing');
        }
        
        // Add capturing listeners (top to bottom)
        addColorListener(grandparent, 'lightblue', 'capturing');
        addColorListener(parent, 'lightgreen', 'capturing');
        
        // Add bubbling listeners (bottom to top)
        addColorListener(parent, 'lightcoral', 'bubbling');
        addColorListener(grandparent, 'lightpink', 'bubbling');
        
        // Target
        child.addEventListener('click', function(e) {
            child.style.backgroundColor = 'gold';
            console.log('Child (target)');
        });
        
        // Click the button - you'll see colors change in order!
    </script>
</body>
</html>