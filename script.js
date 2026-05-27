document.addEventListener("DOMContentLoaded", () => {
    console.log("Live Interactive Resume Engine Loaded Successfully");

    /* 1. Toast Notification Helper */
    const toastContainer = document.getElementById("toast-container");
    
    function showToast(message, duration = 2500) {
        if (!toastContainer) return;
        
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
        
        toastContainer.appendChild(toast);
        
        // Remove toast sequence
        setTimeout(() => {
            toast.classList.add("removing");
            toast.addEventListener("animationend", () => {
                toast.remove();
            });
        }, duration);
    }

    /* 2. Scroll Progress Tracker */
    const scrollBar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        if (!scrollBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const progressPercentage = (window.scrollY / totalHeight) * 100;
        scrollBar.style.width = `${progressPercentage}%`;
    });

    /* 3. Print Button Confirmation Dialog */
    const printBtn = document.getElementById("print-btn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            showToast("Formatting PDF page layout for export...");
            setTimeout(() => {
                window.print();
            }, 800);
        });
    }

    /* 4. Project Filters Engine */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Update active button state
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter cards
            const filterValue = button.getAttribute("data-filter");
            showToast(`Filtering projects: ${button.textContent}`);

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("filtered-out");
                } else {
                    card.classList.add("filtered-out");
                }
            });
        });
    });

    /* 5. Staggered Entrance Animations on Page Load */
    const animatedElements = document.querySelectorAll(
        ".resume-header, .resume-section, .project-card, .timeline-item, .section-two-column section"
    );

    // Initialize elements
    animatedElements.forEach((el) => {
        el.classList.add("animate-in");
    });

    // Stagger activation sequentially
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("active");
        }, index * 45);
    });

    // Welcome greeting
    setTimeout(() => {
        showToast("Welcome to Sri Hasmitha Reddy's Live Resume!");
    }, 500);
});