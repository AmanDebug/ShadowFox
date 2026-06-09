// Content Data with Icons
const data = {
    languages: {
        title: "Sacred Scripts",
        html: `<ul class="icon-list">
                <li><i class="devicon-c-plain colored"></i> C</li>
                <li><i class="devicon-java-plain colored"></i> Java</li>
                <li><i class="devicon-kotlin-plain colored"></i> Kotlin</li>
                <li><i class="devicon-javascript-plain colored"></i> JavaScript</li>
                <li><i class="devicon-html5-plain colored"></i> HTML</li>
                <li><i class="devicon-css3-plain colored"></i> CSS</li>
               </ul>`
    },
    tools: {
        title: "Artifacts & Hardware",
        html: `<ul class="icon-list">
                <li><i class="devicon-matlab-plain colored"></i> MATLAB</li>
                <li><i class="devicon-arduino-plain colored"></i> Arduino & Arduino IDE</li>
                <li><i class="fa-solid fa-microchip custom-cyan"></i> ESP32</li>
                <li><i class="fa-solid fa-memory custom-gold"></i> 8051 Microcontroller</li>
                <li><i class="devicon-androidstudio-plain colored"></i> Android Studio</li>
               </ul>`
    },
    education: {
        title: "Lineage",
        html: `<ul class="icon-list-detailed">
                <li><i class="fa-solid fa-building-columns"></i> <div><strong>VIT Bhopal University</strong><br>3rd Year Electronics and Communication</div></li>
                <li><i class="fa-solid fa-users-gear"></i> <div><strong>VITB Android Club</strong><br>PR Co-lead</div></li>
                <li><i class="fa-solid fa-school"></i> <div><strong>Saltlake CA School</strong><br>Classes 11 & 12</div></li>
                <li><i class="fa-solid fa-school-flag"></i> <div><strong>WWA Cossipore English School</strong><br>Up to Class 10</div></li>
               </ul>`
    },
    projects: {
        title: "Creations",
        html: `<ul class="icon-list-detailed">
                <li><i class="fa-solid fa-bolt"></i> <div><strong>EV Route Planner:</strong> A GPS-based construct that maps routes alongside battery monitoring, calculating if your EV possesses the charge to reach its destination.</div></li>
                <li><i class="fa-solid fa-plane-departure"></i> <div><strong>Sky Scanner Clone:</strong> A flight search engine replica forged during a Job Simulation at Forage.</div></li>
               </ul>`
    },
    connect: {
        title: "Establish Link",
        html: `<div class="connect-links">
                <a href="https://github.com/AmanDebug" target="_blank"><i class="devicon-github-original"></i> GitHub Nexus</a>
                <a href="https://www.linkedin.com/in/aman-prasad-9a4908327" target="_blank"><i class="devicon-linkedin-plain"></i> LinkedIn Network</a>
               </div>`
    }
};

// Chakravyu Interaction Logic
const spokes = document.querySelectorAll('.spoke-node');
const displayPanel = document.getElementById('display-panel');

spokes.forEach(spoke => {
    spoke.addEventListener('mouseenter', function() {
        const targetKey = this.getAttribute('data-target');
        const targetData = data[targetKey];
        
        displayPanel.classList.add('active');
        displayPanel.innerHTML = `
            <h3 class="info-title">${targetData.title}</h3>
            <div class="info-content">${targetData.html}</div>
        `;
    });
});

// Intersection Observer for Scroll Animations & Progress Bars
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Fade in the section
            entry.target.classList.add('visible');
            
            // If the section has progress bars, trigger their custom animations
            const progressBoxes = entry.target.querySelectorAll('.progress-box');
            
            progressBoxes.forEach(box => {
                const bar = box.querySelector('.progress-fill');
                const percentText = box.querySelector('.skill-percent');
                const targetWidth = parseInt(bar.getAttribute('data-width'));
                
                // Prevent re-animating if it has already been animated
                if (bar.style.width === targetWidth + '%') return;

                // 1. Expand the bar
                bar.style.width = targetWidth + '%';
                // Make the number visible
                percentText.style.opacity = '1';

                // 2. Animate the number counting up
                let currentNum = 0;
                const duration = 1500; // 1.5 seconds (Matches CSS transition)
                const intervalTime = 20; // Update every 20ms
                const steps = duration / intervalTime;
                const increment = targetWidth / steps;

                const counter = setInterval(() => {
                    currentNum += increment;
                    
                    if (currentNum >= targetWidth) {
                        currentNum = targetWidth; // Cap it exactly at target
                        clearInterval(counter);
                    }
                    
                    percentText.innerText = Math.round(currentNum) + '%';
                }, intervalTime);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
});

// --- Cipher Text Animation ---
function animateCipher() {
    const title = document.getElementById('main-title');
    const targetText = "The Rachyeta";
    
    // Arrays to hold current moving letters and the final target letters
    let currents = [];
    let targets = [];

    // Setup: Convert targets to character codes and set starting points
    for (let i = 0; i < targetText.length; i++) {
        const charCode = targetText.charCodeAt(i);
        targets.push(charCode);
        
        if (charCode >= 65 && charCode <= 90) {
            currents.push(65); // If uppercase, start at 'A'
        } else if (charCode >= 97 && charCode <= 122) {
            currents.push(97); // If lowercase, start at 'a'
        } else {
            currents.push(charCode); // Keep spaces as spaces instantly
        }
    }

    // Run the interval every 30 milliseconds
    const interval = setInterval(() => {
        let finished = true;
        let displayString = "";

        // Build the current string for this frame
        for (let i = 0; i < targets.length; i++) {
            displayString += String.fromCharCode(currents[i]);

            // If the current letter hasn't reached the target letter yet, increment it
            if (currents[i] < targets[i]) {
                currents[i]++; // Move to the next letter in the alphabet
                finished = false; // The animation isn't done yet
            }
        }

        // Apply the text to the screen
        title.innerText = displayString;
        
        // Apply the text to the data-text attribute so the CSS glow matches
        title.setAttribute('data-text', displayString);

        // Clear the timer when every letter has hit its target
        if (finished) {
            clearInterval(interval);
        }
    }, 30); // 30ms * 17 steps (A to R) = ~510ms (0.5 seconds)
}

// Trigger the animation shortly after the page loads
window.onload = () => {
    setTimeout(animateCipher, 200); // 200ms delay so the user doesn't miss the start
};