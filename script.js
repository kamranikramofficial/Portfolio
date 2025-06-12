document.addEventListener("DOMContentLoaded", () => {
  // Custom Cursor
  const customCursor = document.getElementById("customCursor")
  const cursorFollower = document.getElementById("cursorFollower")

  if (customCursor && cursorFollower && window.innerWidth > 768) {
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      customCursor.style.left = mouseX + "px"
      customCursor.style.top = mouseY + "px"
    })

    // Smooth follower animation
    function animateFollower() {
      const speed = 0.2
      followerX += (mouseX - followerX) * speed
      followerY += (mouseY - followerY) * speed

      cursorFollower.style.left = followerX + "px"
      cursorFollower.style.top = followerY + "px"

      requestAnimationFrame(animateFollower)
    }
    animateFollower()

    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, button, .btn, .project-card, .skill-bar")
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        customCursor.classList.add("hover")
        cursorFollower.classList.add("hover")
      })
      element.addEventListener("mouseleave", () => {
        customCursor.classList.remove("hover")
        cursorFollower.classList.remove("hover")
      })
    })
  }

  // Scroll Progress Bar
  const scrollProgressBar = document.getElementById("scrollProgressBar")

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    scrollProgressBar.style.width = `${scrollPercent}%`
  }

  window.addEventListener("scroll", updateScrollProgress)

  // 3D Scroll Effects for Images
  const scroll3DImages = document.querySelectorAll("[data-scroll-3d]")

  function update3DScrollEffects() {
    scroll3DImages.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      const yPos = -(rate / 10)
      const rotateY = (rect.top - window.innerHeight / 2) * 0.02
      const rotateX = (rect.left - window.innerWidth / 2) * 0.01

      const image = element.querySelector(".scroll-3d-image")
      if (image) {
        image.style.transform = `translateY(${yPos}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`
      }
    })
  }

  window.addEventListener("scroll", update3DScrollEffects)

  //  Navigation Toggle
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

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Follow Along Links Navigation System
  class FollowAlongNavigation {
    constructor() {
      this.navLinks = document.querySelectorAll(".nav-link")
      this.highlight = document.getElementById("navHighlight")
      this.sections = document.querySelectorAll("section")
      this.currentSection = "home"
      this.isScrolling = false

      this.init()
    }

    init() {
      this.setupEventListeners()
      this.updateHighlight()
      this.observeSections()
    }

    setupEventListeners() {
      // Navigation link clicks
      this.navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault()
          const targetId = link.getAttribute("href").substring(1)
          this.scrollToSection(targetId)
          this.setActiveLink(link)
        })

        // Hover effects
        link.addEventListener("mouseenter", () => {
          if (!this.isScrolling && window.innerWidth > 768) {
            this.updateHighlight(link)
          }
        })
      })

      // Return highlight to active link when not hovering
      const navLinksContainer = document.querySelector(".nav-links")
      if (navLinksContainer) {
        navLinksContainer.addEventListener("mouseleave", () => {
          if (!this.isScrolling && window.innerWidth > 768) {
            const activeLink = document.querySelector(".nav-link.active")
            this.updateHighlight(activeLink)
          }
        })
      }

      // Scroll events
      window.addEventListener("scroll", () => {
        this.updateActiveSection()
      })

      // Resize events
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          this.updateHighlight()
        }
      })
    }

    updateHighlight(targetLink = null) {
      if (window.innerWidth <= 768) return // Don't show highlight on mobile

      const activeLink = targetLink || document.querySelector(".nav-link.active")
      if (!activeLink || !this.highlight) return

      const linkRect = activeLink.getBoundingClientRect()
      const navRect = document.querySelector(".nav-links").getBoundingClientRect()

      const left = linkRect.left - navRect.left - 8
      const width = linkRect.width
      const height = linkRect.height

      this.highlight.style.left = `${left}px`
      this.highlight.style.width = `${width}px`
      this.highlight.style.height = `${height}px`
    }

    setActiveLink(clickedLink) {
      this.navLinks.forEach((link) => link.classList.remove("active"))
      clickedLink.classList.add("active")
      this.updateHighlight(clickedLink)
    }

    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId)
      if (section) {
        this.isScrolling = true
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Reset scrolling flag after animation
        setTimeout(() => {
          this.isScrolling = false
        }, 1000)
      }
    }

    updateActiveSection() {
      if (this.isScrolling) return

      const scrollPosition = window.scrollY + 150

      this.sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (this.currentSection !== sectionId) {
            this.currentSection = sectionId
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`)
            if (correspondingLink) {
              this.setActiveLink(correspondingLink)
            }
          }
        }
      })
    }

    observeSections() {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const sectionContent = entry.target.querySelector(".section-content")
          if (entry.isIntersecting && sectionContent) {
            sectionContent.classList.add("visible")
          }
        })
      }, observerOptions)

      this.sections.forEach((section) => {
        observer.observe(section)
      })
    }
  }

  // Initialize Follow Along Navigation
  new FollowAlongNavigation()

  // Parallax Effects for Floating Shapes
  const floatingShapes = document.querySelectorAll(".shape")

  function updateParallaxShapes() {
    const scrolled = window.pageYOffset
    floatingShapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      const rotation = scrolled * 0.05 * (index + 1)
      shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`
    })
  }

  window.addEventListener("scroll", updateParallaxShapes)

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
      bar.style.width = percent
    })
  }

  const skillsSection = document.querySelector(".skills")

  function checkSkillsVisibility() {
    if (skillsSection) {
      const skillsPosition = skillsSection.getBoundingClientRect().top
      const screenPosition = window.innerHeight * 0.85

      if (skillsPosition < screenPosition) {
        animateProgressBars()
        setTimeout(() => {
          animateSkillCounters()
        }, 500) // Start counter animation after progress bars
        window.removeEventListener("scroll", checkSkillsVisibility)
      }
    }
  }

  window.addEventListener("scroll", checkSkillsVisibility)
  checkSkillsVisibility()

  // Animated Skill Counters
  function animateSkillCounters() {
    const skillPercents = document.querySelectorAll(".skill-percent[data-target]")

    skillPercents.forEach((percent) => {
      const target = Number.parseInt(percent.getAttribute("data-target"))
      let current = 0
      const increment = target / 50 // Animation duration control

      const updateCounter = () => {
        if (current < target) {
          current += increment
          percent.textContent = Math.ceil(current) + "%"
          requestAnimationFrame(updateCounter)
        } else {
          percent.textContent = target + "%"
        }
      }

      updateCounter()
    })
  }

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
        document.getElementById("resetForm").addEventListener("click", function resetFormHandler() {
          contactForm.innerHTML = formContent
          // Re-attach event listener to the new form
          const newForm = document.getElementById("contactForm")
          if (newForm) {
            newForm.addEventListener("submit", (e) => {
              e.preventDefault()
              contactForm.removeEventListener("submit", arguments.callee)
              contactForm.dispatchEvent(new Event("submit"))
            })
          }
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

  // Enhanced Project Card Interactions
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    const overlay = card.querySelector(".project-overlay")
    const links = card.querySelector(".project-links")

    card.addEventListener("mouseenter", function () {
      // Ensure overlay is visible
      if (overlay) {
        overlay.style.opacity = "1"
        overlay.style.visibility = "visible"
      }
      if (links) {
        links.style.transform = "translateY(0)"
      }

      // Dim other cards
      projectCards.forEach((c) => {
        if (c !== this) {
          c.style.opacity = "0.7"
          c.style.transform = "scale(0.95)"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      // Reset overlay
      if (overlay) {
        overlay.style.opacity = "0"
        overlay.style.visibility = "hidden"
      }
      if (links) {
        links.style.transform = "translateY(20px)"
      }

      // Reset all cards
      projectCards.forEach((c) => {
        c.style.opacity = "1"
        c.style.transform = "translateY(0)"
      })
    })

    // Ensure links are clickable
    const projectLinks = card.querySelectorAll(".project-links a")
    projectLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.stopPropagation()
        // Link will work normally
      })
    })
  })

  // Enhanced 3D Background Effects
  const bgElements = document.querySelectorAll(".bg-element")

  function update3DBackground() {
    const scrolled = window.pageYOffset
    const mouseX = window.innerWidth / 2
    const mouseY = window.innerHeight / 2

    bgElements.forEach((element, index) => {
      const speed = 0.3 + index * 0.1
      const rotationSpeed = 0.02 + index * 0.01
      const yPos = -(scrolled * speed)
      const rotationY = scrolled * rotationSpeed
      const rotationX = (mouseY - window.innerHeight / 2) * 0.01

      element.style.transform = `translateY(${yPos}px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`
    })
  }

  window.addEventListener("scroll", update3DBackground)
  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      update3DBackground()
    }
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
