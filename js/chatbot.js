(function() {
  'use strict';

  // ========================================
  // Response Database
  // ========================================
  var responses = {
    greeting: {
      messages: [
        "Hi there! I\u2019m HydraClean\u2019s quick-help assistant. I can answer common questions, but I\u2019m not a substitute for our experts.",
        "What can I help you with?"
      ],
      buttons: [
        { label: "\ud83d\udea8 I have an emergency", topic: "emergency" },
        { label: "What services do you offer?", topic: "services" },
        { label: "Service areas & phone numbers", topic: "areas" },
        { label: "Insurance questions", topic: "insurance" },
        { label: "Book a free assessment", topic: "assessment" },
        { label: "About HydraClean", topic: "about" }
      ]
    },

    emergency: {
      messages: [
        "If you\u2019re dealing with an emergency right now, the fastest way to get help is to call us. We respond 24/7, typically within 60 minutes in the Okanagan."
      ],
      buttons: [
        { label: "\ud83d\udcde 1-877-91-FLOOD", href: "tel:18779135663", call: true },
        { label: "Okanagan: 250-862-8815", href: "tel:2508628815", call: true },
        { label: "What should I do while I wait?", topic: "emergency-wait" },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    "emergency-wait": {
      messages: [
        "While you wait for our team:",
        "\u2022 Stay safe first \u2014 if there\u2019s standing water near electrical outlets or panels, do NOT enter the area.\n\u2022 Turn off the water source if you can safely reach the shutoff valve.\n\u2022 Move valuables and documents to a dry area if it\u2019s safe to do so.\n\u2022 Take photos and video of the damage for insurance documentation.",
        "Important: Do NOT try to remove mould, handle asbestos, or clean up sewage yourself. These require professional equipment and certification."
      ],
      buttons: [
        { label: "\ud83d\udcde Call us now", href: "tel:18779135663", call: true },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    services: {
      messages: [
        "We offer 14 specialized restoration services. Which area are you interested in?"
      ],
      buttons: [
        { label: "Water damage", topic: "service-water" },
        { label: "Fire & smoke", topic: "service-fire" },
        { label: "Mould remediation", topic: "service-mould" },
        { label: "Asbestos abatement", topic: "service-asbestos" },
        { label: "Storm & natural disaster", topic: "service-storm" },
        { label: "Other services", topic: "services-other" },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    "service-water": {
      messages: [
        "Our water damage team handles emergency extraction, structural drying, dehumidification, and moisture monitoring. We respond within 60 minutes in the Okanagan.",
        "Every situation is different \u2014 we recommend a free assessment to determine the right approach for your property."
      ],
      buttons: [
        { label: "Book free assessment", topic: "assessment" },
        { label: "Learn more", href: "services/water-damage.html", page: true },
        { label: "\u2190 Back to services", topic: "services" }
      ]
    },

    "service-fire": {
      messages: [
        "Fire and smoke damage requires specialized cleaning and restoration techniques. Soot, smoke odour, and structural damage each need different approaches.",
        "We handle everything from emergency board-up to full reconstruction. A professional assessment is the best starting point."
      ],
      buttons: [
        { label: "Book free assessment", topic: "assessment" },
        { label: "Learn more", href: "services/fire-smoke.html", page: true },
        { label: "\u2190 Back to services", topic: "services" }
      ]
    },

    "service-mould": {
      messages: [
        "Mould remediation requires professional containment and removal \u2014 especially if it\u2019s behind walls or in HVAC systems. We follow IICRC S520 standards.",
        "Important: Do NOT disturb visible mould, as this can spread spores throughout your home. Let our certified team assess the situation first."
      ],
      buttons: [
        { label: "Book free assessment", topic: "assessment" },
        { label: "Learn more", href: "services/mould-remediation.html", page: true },
        { label: "\u2190 Back to services", topic: "services" }
      ]
    },

    "service-asbestos": {
      messages: [
        "Asbestos handling is regulated by WorkSafeBC and must be done by certified professionals. If you suspect asbestos in your home or building, do not disturb the material.",
        "Our team is WorkSafeBC certified for asbestos abatement and follows all provincial regulations. We can test, assess, and safely remove asbestos-containing materials."
      ],
      buttons: [
        { label: "Book free assessment", topic: "assessment" },
        { label: "Learn more", href: "services/asbestos-abatement.html", page: true },
        { label: "\u2190 Back to services", topic: "services" }
      ]
    },

    "service-storm": {
      messages: [
        "We respond to all types of natural disaster damage across BC \u2014 floods, storms, wildfires, and more. Our team has 37+ years of experience with BC\u2019s specific climate challenges.",
        "If your property has been affected by a natural disaster, call us for an immediate assessment."
      ],
      buttons: [
        { label: "Book free assessment", topic: "assessment" },
        { label: "Learn more", href: "services/natural-disaster.html", page: true },
        { label: "\u2190 Back to services", topic: "services" }
      ]
    },

    "services-other": {
      messages: [
        "We also handle:\n\u2022 Contents restoration & pack-outs\n\u2022 Trauma & crime scene cleanup\n\u2022 Sewage & contamination cleanup\n\u2022 Vehicle impact restoration\n\u2022 Vandalism restoration\n\u2022 Commercial restoration\n\u2022 Emergency board-up\n\u2022 Odour removal\n\u2022 Repairs & reconstruction",
        "Each of these requires a different approach. We\u2019re happy to discuss your specific situation."
      ],
      buttons: [
        { label: "View all services", href: "services.html", page: true },
        { label: "Book free assessment", topic: "assessment" },
        { label: "\u2190 Back to services", topic: "services" }
      ]
    },

    areas: {
      messages: [
        "We serve all of British Columbia, with local teams across the Interior:",
        "\ud83d\udccd Okanagan (Kelowna, Penticton): 250-862-8815\n\ud83d\udccd Vernon: 250-542-6211\n\ud83d\udccd Kootenays (Nelson, Trail, Grand Forks): 250-442-7977\n\ud83d\udccd Kamloops & all other BC areas: 1-877-91-FLOOD"
      ],
      buttons: [
        { label: "\ud83d\udcde 1-877-91-FLOOD", href: "tel:18779135663", call: true },
        { label: "Contact page", href: "contact.html", page: true },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    insurance: {
      messages: [
        "We work directly with all major insurance providers in BC. Our team can help guide you through the claims process. A few things to know:",
        "1) Document damage with photos before any cleanup begins.\n2) Contact your insurance company as soon as possible.\n3) We provide the detailed documentation that insurers need.\n4) We bill insurance directly in most cases.",
        "For specific questions about your claim, our team can give you the best guidance based on your situation."
      ],
      buttons: [
        { label: "Insurance professionals page", href: "insurance-professionals.html", page: true },
        { label: "Insurance info", href: "insurance.html", page: true },
        { label: "Book free assessment", topic: "assessment" },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    assessment: {
      messages: [
        "We offer free, no-obligation assessments for all restoration needs. The fastest way to book one is to call us, or you can fill out our contact form.",
        "Our assessments include a thorough inspection and honest recommendation \u2014 we\u2019ll tell you straight if you need professional help or not."
      ],
      buttons: [
        { label: "\ud83d\udcde 1-877-91-FLOOD", href: "tel:18779135663", call: true },
        { label: "Contact form", href: "contact.html", page: true },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    about: {
      messages: [
        "HydraClean has been restoring properties across British Columbia since 1989 \u2014 over 37 years of building science expertise.",
        "We hold IICRC Master Designation (the highest level of restoration certification), WorkSafeBC Asbestos Certification, and BBB Accreditation."
      ],
      buttons: [
        { label: "About us page", href: "about.html", page: true },
        { label: "Our certifications", topic: "certifications" },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    certifications: {
      messages: [
        "Our certifications include:\n\u2022 IICRC Master Technician Designation \u2014 the highest level of restoration certification\n\u2022 WorkSafeBC Asbestos Certification\n\u2022 BBB Accreditation\n\u2022 Ongoing continuing education in building science",
        "These aren\u2019t just plaques on the wall \u2014 they mean our team follows the latest science-based standards for every project."
      ],
      buttons: [
        { label: "About us page", href: "about.html", page: true },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    "safety-redirect": {
      messages: [
        "That\u2019s something our experts should assess in person. Every situation is different, and getting it wrong can create health or safety risks.",
        "We strongly recommend having a professional evaluate your specific situation before taking any action. We\u2019re happy to take a look \u2014 no charge for the assessment."
      ],
      buttons: [
        { label: "\ud83d\udcde 1-877-91-FLOOD", href: "tel:18779135663", call: true },
        { label: "Book free assessment", topic: "assessment" },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    },

    fallback: {
      messages: [
        "I\u2019m not sure I have the right answer for that. Our team would be happy to help you directly \u2014 every situation is unique, and they can give you specific guidance."
      ],
      buttons: [
        { label: "\ud83d\udcde 1-877-91-FLOOD", href: "tel:18779135663", call: true },
        { label: "\u2709\ufe0f Email us", href: "mailto:info@hydraclean.ca" },
        { label: "Contact page", href: "contact.html", page: true },
        { label: "\u2190 Main menu", topic: "greeting" }
      ]
    }
  };

  // ========================================
  // Keyword Matching
  // ========================================
  var topicKeywords = {
    "emergency": ["emergency", "urgent", "help me", "flooding", "flood", "pipe burst", "burst pipe", "leak", "water coming", "house fire", "on fire", "smoke", "gas leak"],
    "service-water": ["water damage", "water", "wet", "drying", "extraction", "dehumidifier", "flooded", "basement flood", "sump pump"],
    "service-fire": ["fire", "smoke damage", "soot", "burned", "burning"],
    "service-mould": ["mould", "mold", "musty", "black spots", "fungus", "spores", "musty smell"],
    "service-asbestos": ["asbestos", "vermiculite", "abatement", "testing", "popcorn ceiling"],
    "service-storm": ["storm", "natural disaster", "wildfire", "hurricane", "wind damage", "hail", "tree fell"],
    "services-other": ["sewage", "trauma", "crime scene", "vandalism", "vehicle", "car hit", "board up", "odour", "odor", "smell", "contents", "pack out", "commercial"],
    "services": ["services", "what do you do", "what can you do", "help with"],
    "areas": ["where", "location", "area", "phone", "number", "kelowna", "vernon", "penticton", "kamloops", "nelson", "trail", "grand forks", "kootenay", "okanagan"],
    "insurance": ["insurance", "claim", "adjuster", "coverage", "deductible", "denied", "denial"],
    "assessment": ["assessment", "quote", "estimate", "free", "inspection", "cost", "price", "how much"],
    "about": ["about", "who are you", "company", "history", "how long", "years", "experience"],
    "certifications": ["certified", "certification", "iicrc", "worksafe", "bbb", "accredited", "qualified", "license"]
  };

  var safetyTriggers = ["diy", "myself", "can i", "should i", "is it safe", "how do i remove", "how to remove", "how to clean", "clean up", "safe to stay", "safe to live", "safe to sleep", "safe to breathe", "can i stay"];
  var hazardWords = ["asbestos", "mould", "mold", "sewage", "fire", "smoke", "structural", "ceiling", "collapse", "gas", "carbon monoxide", "black mould", "black mold", "lead paint", "chemical"];

  function matchTopic(input) {
    var text = input.toLowerCase().replace(/[^\w\s]/g, "");

    // Safety check first
    var hasSafetyTrigger = safetyTriggers.some(function(t) { return text.indexOf(t) !== -1; });
    var hasHazard = hazardWords.some(function(h) { return text.indexOf(h) !== -1; });
    if (hasSafetyTrigger && hasHazard) return "safety-redirect";

    // Keyword scoring
    var scores = {};
    for (var topic in topicKeywords) {
      var keywords = topicKeywords[topic];
      var score = 0;
      for (var i = 0; i < keywords.length; i++) {
        if (text.indexOf(keywords[i]) !== -1) {
          score += keywords[i].split(" ").length > 1 ? 3 : 1;
        }
      }
      if (score > 0) scores[topic] = score;
    }

    // Return highest scoring topic
    var best = null;
    var bestScore = 0;
    for (var t in scores) {
      if (scores[t] > bestScore) {
        bestScore = scores[t];
        best = t;
      }
    }

    return best || "fallback";
  }

  // ========================================
  // Path Helper
  // ========================================
  function resolvePath(href) {
    if (!href || href.indexOf("tel:") === 0 || href.indexOf("mailto:") === 0 || href.indexOf("http") === 0) return href;
    // Detect if we're in a subdirectory
    var path = window.location.pathname;
    if (path.indexOf("/services/") !== -1 || path.indexOf("/areas/") !== -1 || path.indexOf("/blog/") !== -1) {
      return "../" + href;
    }
    return href;
  }

  // ========================================
  // DOM Builder
  // ========================================
  function buildChatbot() {
    // Trigger button
    var trigger = document.createElement("button");
    trigger.className = "chatbot-trigger";
    trigger.setAttribute("aria-label", "Open chat assistant");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

    // Panel
    var panel = document.createElement("div");
    panel.className = "chatbot-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "HydraClean chat assistant");

    // Header
    var header = document.createElement("div");
    header.className = "chatbot-header";
    header.innerHTML =
      '<div class="chatbot-header__title">' +
        '<span class="chatbot-header__dot"></span>' +
        'HydraClean Assistant' +
      '</div>';

    var closeBtn = document.createElement("button");
    closeBtn.className = "chatbot-header__close";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    header.appendChild(closeBtn);

    // Messages area
    var messagesArea = document.createElement("div");
    messagesArea.className = "chatbot-messages";
    messagesArea.setAttribute("role", "log");
    messagesArea.setAttribute("aria-live", "polite");

    // Buttons area
    var buttonsArea = document.createElement("div");
    buttonsArea.className = "chatbot-buttons";

    // Input area
    var inputArea = document.createElement("div");
    inputArea.className = "chatbot-input";

    var inputField = document.createElement("input");
    inputField.className = "chatbot-input__field";
    inputField.type = "text";
    inputField.placeholder = "Type a question...";
    inputField.setAttribute("aria-label", "Type a question");

    var sendBtn = document.createElement("button");
    sendBtn.className = "chatbot-input__send";
    sendBtn.setAttribute("aria-label", "Send message");
    sendBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

    inputArea.appendChild(inputField);
    inputArea.appendChild(sendBtn);

    // Disclaimer
    var disclaimer = document.createElement("div");
    disclaimer.className = "chatbot-disclaimer";
    disclaimer.textContent = "General info only \u2014 not professional advice. For your specific situation, contact HydraClean directly.";

    // Assemble panel
    panel.appendChild(header);
    panel.appendChild(messagesArea);
    panel.appendChild(buttonsArea);
    panel.appendChild(inputArea);
    panel.appendChild(disclaimer);

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    return { trigger: trigger, panel: panel, closeBtn: closeBtn, messagesArea: messagesArea, buttonsArea: buttonsArea, inputField: inputField, sendBtn: sendBtn };
  }

  // ========================================
  // Chat Logic
  // ========================================
  function initChat(els) {
    var isOpen = false;

    function openChat() {
      isOpen = true;
      els.panel.classList.add("chatbot-open");
      els.trigger.setAttribute("aria-expanded", "true");
      els.inputField.focus();
    }

    function closeChat() {
      isOpen = false;
      els.panel.classList.remove("chatbot-open");
      els.trigger.setAttribute("aria-expanded", "false");
      els.trigger.style.display = "";
    }

    function addMessage(text, type) {
      var msg = document.createElement("div");
      msg.className = "chatbot-msg chatbot-msg--" + type;
      msg.textContent = text;
      els.messagesArea.appendChild(msg);
      els.messagesArea.scrollTop = els.messagesArea.scrollHeight;
    }

    function showTyping() {
      var typing = document.createElement("div");
      typing.className = "chatbot-typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      els.messagesArea.appendChild(typing);
      els.messagesArea.scrollTop = els.messagesArea.scrollHeight;
      return typing;
    }

    function showResponse(topicId) {
      var data = responses[topicId];
      if (!data) data = responses.fallback;

      // Clear old buttons
      els.buttonsArea.innerHTML = "";

      // Show typing indicator briefly
      var typing = showTyping();

      setTimeout(function() {
        // Remove typing indicator
        if (typing.parentNode) typing.parentNode.removeChild(typing);

        // Add bot messages
        var delay = 0;
        data.messages.forEach(function(text, i) {
          setTimeout(function() {
            addMessage(text, "bot");
          }, delay);
          delay += 150;
        });

        // Add buttons after messages
        setTimeout(function() {
          renderButtons(data.buttons);
        }, delay + 50);
      }, 500);
    }

    function renderButtons(buttons) {
      els.buttonsArea.innerHTML = "";
      buttons.forEach(function(btn) {
        if (btn.href) {
          var a = document.createElement("a");
          a.className = "chatbot-btn chatbot-btn--link" + (btn.call ? " chatbot-btn--call" : "");
          a.href = btn.call ? btn.href : resolvePath(btn.href);
          a.textContent = btn.label;
          if (btn.page) a.target = "_self";
          if (btn.href.indexOf("mailto:") === 0) a.target = "_self";
          els.buttonsArea.appendChild(a);
        } else {
          var button = document.createElement("button");
          button.className = "chatbot-btn";
          button.textContent = btn.label;
          button.addEventListener("click", function() {
            handleButtonClick(btn);
          });
          els.buttonsArea.appendChild(button);
        }
      });
      els.messagesArea.scrollTop = els.messagesArea.scrollHeight;
    }

    function handleButtonClick(btn) {
      addMessage(btn.label, "user");
      showResponse(btn.topic);
    }

    function handleTextInput() {
      var text = els.inputField.value.trim();
      if (!text) return;

      addMessage(text, "user");
      els.inputField.value = "";

      var topic = matchTopic(text);
      showResponse(topic);
    }

    // Event listeners
    els.trigger.addEventListener("click", function() {
      openChat();
      if (els.messagesArea.children.length === 0) {
        showResponse("greeting");
      }
    });

    els.closeBtn.addEventListener("click", closeChat);

    els.sendBtn.addEventListener("click", handleTextInput);

    els.inputField.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleTextInput();
      }
    });

    // Escape key closes
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && isOpen) {
        closeChat();
      }
    });
  }

  // ========================================
  // Initialize
  // ========================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      initChat(buildChatbot());
    });
  } else {
    initChat(buildChatbot());
  }

})();
