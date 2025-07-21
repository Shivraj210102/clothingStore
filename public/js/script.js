(function($) {

  "use strict";

  var searchPopup = function() {
      // open search box
      $('.secondary-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

  // Preloader
  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-img"), {
      keepImg: true,
    });
  }

  // Tab Section
  var initTabs = function() {
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // document ready
  $(document).ready(function() {
    searchPopup();
    initPreloader();
    initTabs();
    initJarallax();

    jQuery(document).ready(function($) {
      jQuery('.stellarnav').stellarNav({
        position: 'right'
      });
    });

    $(".user-items .icon-search").click(function(){
      $(".search-box").toggleClass('active');
      $(".search-box .search-input").focus();
    });
    $(".close-button").click(function(){
      $(".search-box").toggleClass('active');
    });

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      pagination: {
        el: "#billboard .swiper-pagination",
        clickable: true,
      },
    });

    var swiper = new Swiper(".two-column-swiper", {
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
    });

    var swiper = new Swiper("#featured-products .product-swiper", {
      pagination: {
        el: "#featured-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        999: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1299: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper("#featured-products .product-swiper-two", {
      pagination: {
        el: "#featured-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        999: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1299: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper("#flash-sales .product-swiper", {
      pagination: {
        el: "#flash-sales .product-swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        999: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1299: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: {
        nextEl: ".next-button",
        prevEl: ".prev-button",
      },
    });

    var thumb_slider = new Swiper(".thumb-swiper", {
      slidesPerView: 1,
    });
    var large_slider = new Swiper(".large-swiper", {
      spaceBetween: 10,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    // Initialize Isotope
    var $grid = $('.entry-container').isotope({
      itemSelector: '.entry-item',
      layoutMode: 'masonry'
    });
    $grid.imagesLoaded().progress(function() {
      $grid.isotope('layout');
    });

    $(".gallery").colorbox({
      rel:'gallery'
    });
    
    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585,
    });

  });

})(jQuery);

        let generatedOtp = ""; // Store generated OTP

        // Function to generate a random OTP
        function generateOTP(length = 6) {
            let otp = '';
            for (let i = 0; i < length; i++) {
                otp += Math.floor(Math.random() * 10); // Random digit from 0-9
            }
            return otp;
        }

        // Event listener for OTP generation
        document.getElementById("generateOtpBtn").addEventListener("click", function () {
            generatedOtp = generateOTP(); // Generate a 6-digit OTP
            alert("Your OTP is: " + generatedOtp); // Display OTP (for testing)
            document.getElementById("otpSection").classList.remove("hidden"); // Show OTP input field
        });

        // Event listener for OTP verification
        document.getElementById("verifyOtpBtn").addEventListener("click", function () {
            let otpInput = document.getElementById("otpInput").value;
            let otpMessage = document.getElementById("otpMessage");

            if (otpInput === generatedOtp) {
                otpMessage.textContent = "OTP verified successfully!";
                otpMessage.className = "success";
                document.getElementById("otpSection").classList.add("hidden"); // Hide OTP section
                document.getElementById("passwordFields").classList.remove("hidden"); // Show password fields
            } else {
                otpMessage.textContent = "Invalid OTP. Please try again.";
                otpMessage.className = "error";
            }
        });

        // Check if passwords match
        document.addEventListener('DOMContentLoaded', function () {
          var passwordInput = document.getElementById('password');
          var passwordToggle = document.getElementById('password-toggle');
          var confirmPasswordInput = document.getElementById('confirmPassword');
          var submitButton = document.getElementById('submitButton');
          var message = document.getElementById('message');
          var strengthMeter = document.getElementById('strength-meter');
          var strengthText = document.getElementById('strength-text');
      
          // Toggle password visibility
          passwordToggle.addEventListener('click', function () {
              if (passwordInput.type === 'password') {
                  passwordInput.type = 'text';
                  passwordToggle.classList.remove('animate-open');
                  passwordToggle.classList.add('animate-close');
              } else {
                  passwordInput.type = 'password';
                  passwordToggle.classList.remove('animate-close');
                  passwordToggle.classList.add('animate-open');
              }
          });
      
          // Check password match
          function checkPasswordMatch() {
              let password = passwordInput.value;
              let confirmPassword = confirmPasswordInput.value;
      
              if (password === confirmPassword && password !== "") {
                  submitButton.disabled = false;
                  message.textContent = "Passwords match!";
                  message.style.color = "green";
              } else {
                  submitButton.disabled = true;
                  message.textContent = "Passwords do not match.";
                  message.style.color = "red";
              }
          }
      
          passwordInput.addEventListener('input', checkPasswordMatch);
          confirmPasswordInput.addEventListener('input', checkPasswordMatch);
      
          // Update strength meter
          passwordInput.addEventListener('input', updateStrengthMeter);
      
          function updateStrengthMeter() {
              let passwordValue = passwordInput.value;
              let strength = checkPasswordStrength(passwordValue);
      
              // Update the strength meter and text
              strengthMeter.style.width = `${strength.percent}%`;
              strengthMeter.style.background = strength.color;
              strengthText.textContent = strength.message;
          }
      
          function checkPasswordStrength(password) {
              let strength = 0;
      
              // Criteria for password strength
              if (password.length >= 8) strength += 1; // Length
              if (/[A-Z]/.test(password)) strength += 1; // Uppercase letters
              if (/[a-z]/.test(password)) strength += 1; // Lowercase letters
              if (/\d/.test(password)) strength += 1; // Numbers
              if (/[^\w]/.test(password)) strength += 1; // Special characters
      
              let percent = (strength / 5) * 100;
              let color = "";
              let message = "";
      
              // Determine color and message based on strength
              switch (strength) {
                  case 1:
                  case 2:
                      color = "red";
                      message = "Weak";
                      break;
                  case 3:
                      color = "orange";
                      message = "Moderate";
                      break;
                  case 4:
                      color = "yellowgreen";
                      message = "Strong";
                      break;
                  case 5:
                      color = "green";
                      message = "Very Strong";
                      break;
                  default:
                      color = "#e0e0e0";
                      message = "Too Short";
              }
      
              return { percent, color, message };
          }
      
          // Optional: Submit button action (for demonstration purposes)
          submitButton.addEventListener("click", function() {
              alert("Passwords match! Form submitted.");
          });
      });
      