const topBoundary = 60; // Height of the navigation bar
const bottomBoundary = 60; // Height of the contact bar
const leftBoundary = 250; // Discreet left boundary
const rightBoundary = 20; // Discreet right boundary
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const isMobile = window.innerWidth <= 600;
let zIndexCounter = 1001;
function isMobileView() {
  return window.innerWidth <= 600;
};

window.onload = () => {
    const imageContainers = document.querySelectorAll('.image-container');
    const textContainers = document.querySelectorAll('.text-container');

    imageContainers.forEach(container => {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        // Randomize initial position

            // Generate proposed position for the image

            let x = Math.random() * (window.innerWidth - container.width);
            let y = Math.random() * (window.innerHeight - container.height);

            // Validate the the image will be placed inside the bounds, and update the proposed position otherwise
            if (!isMobile && x < leftBoundary) x = leftBoundary;
            if (isMobile && x < 0) x = 0;  
            if (y < topBoundary) y = topBoundary;
            if (x + container.width > viewportWidth - rightBoundary) {
                x = viewportWidth - container.width - rightBoundary;
            }
            if (y + container.height > viewportHeight - bottomBoundary) {
                y = viewportHeight - container.height - bottomBoundary;
            }
            container.style.left = `${x}px`;
            container.style.top = `${y}px`;
            container.style.opacity ='1'

    function dragStart(e) {
        const target = e.target;
  if (target.tagName === 'A' || target.closest('a')) {
    // Let the link behave normally
    return;
  }
      e.preventDefault();
      isDragging = true;
      if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else {
        startX = e.clientX;
        startY = e.clientY;
      }
      initialLeft = parseFloat(window.getComputedStyle(container).left) || 0;
      initialTop = parseFloat(window.getComputedStyle(container).top) || 0;
      container.style.cursor = 'grabbing';
      zIndexCounter += 1;
      container.style.zIndex = `${zIndexCounter}`;
    }

    function dragMove(e) {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      const offsetX = clientX - startX;
      const offsetY = clientY - startY;

      let newLeft = initialLeft + offsetX;
      let newTop = initialTop + offsetY;

      const containerRect = container.getBoundingClientRect();

      // Only apply boundaries if NOT mobile (or customize boundaries for mobile here)
      if (!isMobile) {
        if (newLeft < leftBoundary) newLeft = leftBoundary;
        if (newTop < topBoundary) newTop = topBoundary;
        if (newLeft + containerRect.width > viewportWidth - rightBoundary) {
          newLeft = viewportWidth - containerRect.width - rightBoundary;
        }
        if (newTop + containerRect.height > viewportHeight - bottomBoundary) {
          newTop = viewportHeight - containerRect.height - bottomBoundary;
        }
        } else {
    // Mobile: constrain within viewport edges, but top respects topBoundary
    if (newLeft < 0) newLeft = 0;
    if (newTop < topBoundary) newTop = topBoundary;
    if (newLeft + containerRect.width > viewportWidth) {
      newLeft = viewportWidth - containerRect.width;
    }
    if (newTop + containerRect.height > viewportHeight) {
      newTop = viewportHeight - containerRect.height;
    }
      }

      container.style.left = `${newLeft}px`;
      container.style.top = `${newTop}px`;
    }

    function dragEnd(e) {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'grab';
      }
    }

    // Attach mouse and touch event listeners

    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart, { passive: false });

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchmove', dragMove, { passive: false });

    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);

    container.addEventListener('contextmenu', e => e.preventDefault());
  });

    textContainers.forEach(container => {
     let isDragging = false;
     let startX, startY, initialLeft, initialTop;

     container.style.position = 'absolute';

     const rect = container.getBoundingClientRect();
     const width = rect.width;
     const height = rect.height;

     const viewportWidth = window.innerWidth;
     const viewportHeight = window.innerHeight;
        // Randomize initial position
            // Generate proposed position for the image
     let x, y;
     
     if (isMobile) {
  // Start at bottom-right corner on mobile
  x = viewportWidth - width - rightBoundary;
  y = viewportHeight - height - bottomBoundary;
} else {
  // Randomize on desktop
  x = Math.random() * (viewportWidth - width);
  y = Math.random() * (viewportHeight - height);

  if (x < leftBoundary) x = leftBoundary;
  if (y < topBoundary) y = topBoundary;
  if (x + width > viewportWidth - rightBoundary) {
    x = viewportWidth - width - rightBoundary;
  }
    if (y + height > viewportHeight - bottomBoundary) {
        y = viewportHeight - height - bottomBoundary;
      }
  }
            container.style.left = `${x}px`;
            container.style.top = `${y}px`;
            container.style.opacity ='1'

    function dragStart(e) {
      e.preventDefault();
      isDragging = true;
      if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else {
        startX = e.clientX;
        startY = e.clientY;
      }
      initialLeft = parseFloat(window.getComputedStyle(container).left) || 0;
      initialTop = parseFloat(window.getComputedStyle(container).top) || 0;
      container.style.cursor = 'grabbing';
      zIndexCounter += 1;
      container.style.zIndex = `${zIndexCounter}`;
    }

    function dragMove(e) {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      const offsetX = clientX - startX;
      const offsetY = clientY - startY;

      let newLeft = initialLeft + offsetX;
      let newTop = initialTop + offsetY;

      const containerRect = container.getBoundingClientRect();

      // Only apply boundaries if NOT mobile (or customize boundaries for mobile here)
      if (!isMobile) {
        if (newLeft < leftBoundary) newLeft = leftBoundary;
        if (newTop < topBoundary) newTop = topBoundary;
        if (newLeft + containerRect.width > viewportWidth - rightBoundary) {
          newLeft = viewportWidth - containerRect.width - rightBoundary;
        }
        if (newTop + containerRect.height > viewportHeight - bottomBoundary) {
          newTop = viewportHeight - containerRect.height - bottomBoundary;
        }
        } else {
    // Mobile: constrain within viewport edges, but top respects topBoundary
    if (newLeft < 0) newLeft = 0;
    if (newTop < topBoundary) newTop = topBoundary;
    if (newLeft + containerRect.width > viewportWidth) {
      newLeft = viewportWidth - containerRect.width;
    }
    if (newTop + containerRect.height > viewportHeight) {
      newTop = viewportHeight - containerRect.height;
    }
      }

      container.style.left = `${newLeft}px`;
      container.style.top = `${newTop}px`;
    }

    function dragEnd(e) {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'grab';
      }
    }

    // Attach mouse and touch event listeners

    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart, { passive: false });

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchmove', dragMove, { passive: false });

    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);

    container.addEventListener('contextmenu', e => e.preventDefault());
    });
};
    document.addEventListener('DOMContentLoaded', () => {
      const menuButton = document.querySelector('.menu-toggle');
      const menu = document.querySelector('.menu-container');

      function updateMenuInitialState() {
      if (window.innerWidth > 600) {
        menu.classList.add('show'); // Desktop: menu visible
      } else {
        menu.classList.remove('show'); // Mobile: menu hidden
      }
    }

    updateMenuInitialState();

menuButton.addEventListener('click', () => {
  menu.classList.toggle('show');

  if (menu.classList.contains('show')) {
    menu.style.zIndex = '10000'; // always on top when open
  } else {
    menu.style.zIndex = ''; // reset when closed
  }
});

      // Make menu draggable
      let isDragging = false;
      let startX, initialLeft;

      if (window.innerWidth > 600)
      menu.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        initialLeft = parseFloat(window.getComputedStyle(menu).left) || 0;
        menu.style.cursor = 'grabbing';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        menu.style.left = `${Math.min(0, initialLeft + dx)}px`;
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          menu.style.cursor = 'grab';
        }
      });
    })

 
 document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mouseenter', () => {
        const title = tile.getAttribute('data-title');
        const menuItem = document.querySelector(`.menu-container li[data-title="${title}"]`);
        if (menuItem) menuItem.classList.add('hovered');
      });
  
    tile.addEventListener('mouseleave', () => {
        const title = tile.getAttribute('data-title');
        const menuItem = document.querySelector(`.menu-container li[data-title="${title}"]`);
        if (menuItem) menuItem.classList.remove('hovered');
      });
    });
  
  document.querySelectorAll('.menu-container li').forEach(menuItem => {
    menuItem.addEventListener('mouseenter', () => {
      const title = menuItem.getAttribute('data-title');
      const tile = document.querySelector(`.tile[data-title="${title}"]`);
      if (tile) tile.classList.add('zoom');
    });

    menuItem.addEventListener('mouseleave', () => {
      const title = menuItem.getAttribute('data-title');
      const tile = document.querySelector(`.tile[data-title="${title}"]`);
      if (tile) tile.classList.remove('zoom');
     });

      });