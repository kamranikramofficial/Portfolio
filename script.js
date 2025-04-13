document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    window.addEventListener("load", () => {
      const preloader = document.querySelector(".preloader")
      if (preloader) {
        preloader.classList.add("fade-out")
        setTimeout(() => {
          preloader.style.display = "none"
        }, 500)
      }
    })
  
 // Bootstrap-style Navigation Toggle
 const navbarToggler = document.querySelector(".navbar-toggler")
 const navbarCollapse = document.querySelector(".navbar-collapse")

 if (navbarToggler && navbarCollapse) {
   // Toggle menu when toggler is clicked
   navbarToggler.addEventListener("click", () => {
     navbarCollapse.classList.toggle("show")
     navbarToggler.classList.toggle("active")
     navbarToggler.setAttribute(
       "aria-expanded",
       navbarToggler.getAttribute("aria-expanded") === "false" ? "true" : "false",
     )
   })

   // Close menu when a navigation link is clicked
   document.querySelectorAll(".nav-links a").forEach((link) => {
     link.addEventListener("click", () => {
       navbarCollapse.classList.remove("show")
       navbarToggler.classList.remove("active")
       navbarToggler.setAttribute("aria-expanded", "false")
     })
   })

   // Close menu when clicking outside
   document.addEventListener("click", (e) => {
     if (
       !navbarToggler.contains(e.target) &&
       !navbarCollapse.contains(e.target) &&
       navbarCollapse.classList.contains("show")
     ) {
       navbarCollapse.classList.remove("show")
       navbarToggler.classList.remove("active")
       navbarToggler.setAttribute("aria-expanded", "false")
     }
   })
 }

  
    // Header scroll effect
    const header = document.querySelector("header")
  
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      })
    }
  
    // Back to top button
    const backToTopBtn = document.querySelector(".back-to-top")
  
    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("active")
        } else {
          backToTopBtn.classList.remove("active")
        }
      })
  
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  
    // Skill progress bars animation
    const skillBars = document.querySelectorAll(".progress")
  
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        const percent = bar.getAttribute("data-percent")
        bar.style.width = percent
      })
    }
  
    // Scroll animations
    const animatedElements = document.querySelectorAll(
      ".animate-on-scroll, .section-title, .about-image, .about-text, .skill-category, .project-card, .resume-download, .resume-section, .contact-info, .contact-form",
    )
  
    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.85
  
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
  
        if (elementTop < triggerBottom) {
          element.classList.add("fade-in")
  
          // Animate skill bars when skills section is visible
          if (element.classList.contains("skill-category")) {
            animateSkillBars()
          }
        }
      })
    }
  
    // Initial check
    checkScroll()
  
    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  
    // Custom cursor
    const cursor = document.createElement("div")
    cursor.classList.add("custom-cursor")
    document.body.appendChild(cursor)
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })
  
    document.addEventListener("mousedown", () => {
      cursor.classList.add("active")
    })
  
    document.addEventListener("mouseup", () => {
      cursor.classList.remove("active")
    })
  
    // Interactive elements cursor effect
    const interactiveElements = document.querySelectorAll("a, button, .btn, .project-card, .timeline-item, .contact-item")
  
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("active")
      })
  
      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("active")
      })
    })
  
    // Parallax effect for hero section
    const hero = document.querySelector(".hero")
  
    if (hero) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Dark mode toggle
    const darkModeToggle = document.querySelector(".dark-mode")
    const body = document.body
  
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme")
  
        // Save preference to localStorage
        if (body.classList.contains("dark-theme")) {
          localStorage.setItem("theme", "dark")
        } else {
          localStorage.setItem("theme", "light")
        }
      })
  
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "dark") {
        body.classList.add("dark-theme")
      }
    }
  
    // Project filter functionality
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    if (filterButtons.length > 0) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          button.classList.add("active")
  
          const filter = button.getAttribute("data-filter")
  
          projectCards.forEach((card) => {
            if (filter === "all") {
              card.style.display = "block"
            } else if (card.classList.contains(filter)) {
              card.style.display = "block"
            } else {
              card.style.display = "none"
            }
  
            // Reset and re-trigger animation
            setTimeout(() => {
              card.classList.remove("fade-in")
              setTimeout(() => {
                checkScroll()
              }, 50)
            }, 50)
          })
        })
      })
    }
  
    // Form validation
    const contactForm = document.querySelector(".contact-form form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic validation
        let valid = true
        const inputs = contactForm.querySelectorAll("input, textarea")
  
        inputs.forEach((input) => {
          if (!input.value.trim()) {
            valid = false
            input.classList.add("error")
          } else {
            input.classList.remove("error")
          }
        })
  
        if (valid) {
          // Form submission logic would go here
          // For now, just show a success message
          const formGroups = contactForm.querySelectorAll(".form-group")
          formGroups.forEach((group) => (group.style.display = "none"))
  
          const successMessage = document.createElement("div")
          successMessage.classList.add("success-message")
          successMessage.innerHTML =
            "<h4>Thank you for your message!</h4><p>I will get back to you as soon as possible.</p>"
          contactForm.appendChild(successMessage)
        }
      })
    }
  
    // Typing effect for hero section
    const typingElement = document.querySelector(".typing-text")
  
    if (typingElement) {
      const phrases = JSON.parse(typingElement.getAttribute("data-phrases"))
      let currentPhraseIndex = 0
      let currentCharIndex = 0
      let isDeleting = false
      let typingSpeed = 100
  
      function typeText() {
        const currentPhrase = phrases[currentPhraseIndex]
  
        if (isDeleting) {
          typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1)
          currentCharIndex--
          typingSpeed = 50
        } else {
          typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1)
          currentCharIndex++
          typingSpeed = 100
        }
  
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
          isDeleting = true
          typingSpeed = 1000 // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
          typingSpeed = 500 // Pause before typing next phrase
        }
  
        setTimeout(typeText, typingSpeed)
      }
  
      // Start the typing effect
      setTimeout(typeText, 1000)
    }
  })
  document.addEventListener("DOMContentLoaded", () => {
    // Add preloader
    const preloader = document.createElement("div")
    preloader.className = "preloader"
    preloader.innerHTML = '<div class="loader"></div>'
    document.body.appendChild(preloader)
  
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("fade-out")
        setTimeout(() => {
          preloader.style.display = "none"
        }, 500)
      }, 500)
    })
  
    // Mobile Navigation
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        hamburger.classList.toggle("active")
      })
  
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active")
          hamburger.classList.remove("active")
        })
      })
    }
  
    // Header scroll effect
    const header = document.querySelector("header")
  
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      })
    }
  
    // Back to Top Button
    const backToTopButton = document.querySelector(".back-to-top")
  
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add("active")
        } else {
          backToTopButton.classList.remove("active")
        }
      })
    }
  
    // Scroll Animation
    const animateElements = document.querySelectorAll(
      ".animate-on-scroll, .section-title, .about-image, .about-text, .skill-category, .project-card, .resume-download, .resume-section, .contact-info, .contact-form",
    )
  
    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.85
  
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
  
        if (elementTop < triggerBottom) {
          element.classList.add("fade-in")
        }
      })
    }
  
    // Initial check
    checkScroll()
  
    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  
    // Skill Progress Animation
    const progressBars = document.querySelectorAll(".progress")
  
    function animateProgressBars() {
      progressBars.forEach((bar) => {
        const percent = bar.getAttribute("data-percent")
        bar.style.width = percent + "%"
      })
    }
  
    const skillsSection = document.querySelector(".skills")
  
    function checkSkillsVisibility() {
      if (skillsSection) {
        const skillsPosition = skillsSection.getBoundingClientRect().top
        const screenPosition = window.innerHeight * 0.85
  
        if (skillsPosition < screenPosition) {
          animateProgressBars()
          window.removeEventListener("scroll", checkSkillsVisibility)
        }
      }
    }
  
    window.addEventListener("scroll", checkSkillsVisibility)
    checkSkillsVisibility()
  
    // Form Submission with validation
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic validation
        let isValid = true
        const inputs = contactForm.querySelectorAll("input, textarea")
  
        inputs.forEach((input) => {
          if (!input.value.trim()) {
            isValid = false
            input.style.borderColor = "var(--danger-color)"
            input.style.backgroundColor = "rgba(239, 68, 68, 0.05)"
  
            // Add shake animation
            input.classList.add("shake")
            setTimeout(() => {
              input.classList.remove("shake")
            }, 500)
          } else {
            input.style.borderColor = "var(--success-color)"
            input.style.backgroundColor = "rgba(16, 185, 129, 0.05)"
          }
        })
  
        if (isValid) {
          const name = document.getElementById("name").value
          const email = document.getElementById("email").value
          const subject = document.getElementById("subject").value
          const message = document.getElementById("message").value
  
          console.log("Form submitted:", { name, email, subject, message })
  
          // Success message with animation
          const formContent = contactForm.innerHTML
          contactForm.innerHTML = `
                      <div class="success-message" style="text-align: center; padding: 30px;">
                          <div style="font-size: 3rem; color: var(--success-color); margin-bottom: 20px;">
                              <i class="fas fa-check-circle"></i>
                          </div>
                          <h3 style="margin-bottom: 15px; color: var(--success-color);">Message Sent Successfully!</h3>
                          <p style="margin-bottom: 20px; color: var(--gray-color);">Thank you for your message! I will get back to you soon.</p>
                          <button type="button" class="btn primary-btn" id="resetForm">Send Another Message</button>
                      </div>
                  `
  
          // Reset form button
          document.getElementById("resetForm").addEventListener("click", () => {
            contactForm.innerHTML = formContent
            // Re-attach event listener to the new form
            document.getElementById("contactForm").addEventListener("submit", arguments.callee)
          })
        }
      })
  
      // Real-time validation
      contactForm.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("input", function () {
          if (this.value.trim()) {
            this.style.borderColor = "var(--primary-color)"
            this.style.backgroundColor = "white"
          }
        })
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Parallax effect for hero section
    const hero = document.querySelector(".hero")
  
    if (hero) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        if (scrollPosition < 600) {
          hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`
        }
      })
    }
  
    // Add typing effect to hero section
    const heroTitle = document.querySelector(".hero-content h2")
  
    if (heroTitle) {
      const originalText = heroTitle.textContent
      heroTitle.textContent = ""
  
      let i = 0
      const typeWriter = () => {
        if (i < originalText.length) {
          heroTitle.textContent += originalText.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        } else {
          // Add blinking cursor at the end
          heroTitle.innerHTML = heroTitle.textContent + '<span class="cursor">|</span>'
  
          // Blink the cursor
          setInterval(() => {
            const cursor = document.querySelector(".cursor")
            if (cursor) {
              cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0"
            }
          }, 500)
        }
      }
  
      // Start typing effect after a delay
      setTimeout(typeWriter, 1000)
    }
  
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        projectCards.forEach((c) => {
          if (c !== this) {
            c.style.opacity = "0.7"
            c.style.transform = "scale(0.95)"
          }
        })
      })
  
      card.addEventListener("mouseleave", () => {
        projectCards.forEach((c) => {
          c.style.opacity = "1"
          c.style.transform = "translateY(0)"
        })
      })
    })
  
    // Add CSS for cursor animation
    const style = document.createElement("style")
    style.textContent = `
          @keyframes shake {
              0%, 100% { transform: translateX(0); }
              10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
              20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          .shake {
              animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }
          
          .cursor {
              font-weight: 100;
              animation: blink 1s infinite;
          }
          
          @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
          }
          
          .success-message {
              animation: fadeInUp 0.5s ease forwards;
          }
      `
    document.head.appendChild(style)
  })
  