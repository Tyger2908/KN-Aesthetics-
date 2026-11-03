/* KN Aesthetics Studio site script. You shouldn't need to edit this file:
   everyday changes belong in site-settings.js */
(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (q, r) { return (r || document).querySelector(q); };
  var $$ = function (q, r) { return Array.prototype.slice.call((r || document).querySelectorAll(q)); };

  if (!S) {
    var warn = document.createElement("p");
    warn.className = "setup-error";
    warn.textContent = "The site can't read site-settings.js. A comma, bracket or quote mark was probably removed in the last edit. Undo that change and save the file again.";
    document.body.prepend(warn);
    return;
  }

  var esc = function (v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var cap = function (w) { return w.charAt(0).toUpperCase() + w.slice(1); };
  var todo = function (t) { return '<span class="todo">' + esc(t) + "</span>"; };
  var waNumber = function () {
    var n = String(S.whatsapp || "").replace(/\D/g, "");
    if (n.charAt(0) === "0") n = "27" + n.slice(1);
    return n;
  };
  var telHref = function (p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); };
  var mins = function (t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; };
  var time12 = function (t) {
    var m = mins(t), h = Math.floor(m / 60), n = m % 60;
    return (h % 12 || 12) + (n ? ":" + String(n).padStart(2, "0") : "") + (h < 12 ? "am" : "pm");
  };

  /* Shared header and footer */
  var LINKS = [["index.html", "Home"], ["services.html", "Services"], ["gallery.html", "Our work"], ["about.html", "About us"], ["faq.html", "Questions"], ["contact.html", "Contact us"]];
  function buildHeader() {
    var here = location.pathname.split("/").pop() || "index.html";
    var nav = LINKS.map(function (l) {
      return '<a href="' + l[0] + '"' + (l[0] === here ? ' aria-current="page"' : "") + ">" + l[1] + "</a>";
    }).join("");
    $("#site-header").innerHTML =
      '<a class="skip" href="#main">Skip to content</a><header class="site-head"><div class="wrap head-in">' +
      '<a class="brand" href="index.html">' + esc(S.name) + "</a>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + nav + '<a class="btn" href="book.html">Book now</a></nav>' +
      "</div></header>" +
      (S.announcement ? '<p class="announce">' + esc(S.announcement) + ' <a href="services.html">See the specials</a></p>' : "");
    var btn = $(".menu-btn"), n = $("#nav");
    btn.addEventListener("click", function () {
      var open = n.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.textContent = open ? "Close" : "Menu";
    });
  }
  function hoursTable() {
    var today = todayParts().day;
    var rows = [1, 2, 3, 4, 5, 6, 0].map(function (i) {
      var d = DAYS[i], h = S.hours[d];
      return '<tr' + (i === today ? ' class="today"' : "") + '><th scope="row">' + cap(d) + "</th><td>" +
        (h ? time12(h.open) + " to " + time12(h.close) : "Closed") + "</td></tr>";
    }).join("");
    return '<table class="hours"><caption class="sr" hidden>Opening hours</caption><tbody>' + rows + "</tbody></table>";
  }
  function contactLines() {
    var out = [];
    out.push(S.phone ? '<a href="' + telHref(S.phone) + '">' + esc(S.phone) + "</a>" : todo("Add your phone number"));
    if (waNumber()) out.push('<a href="https://wa.me/' + waNumber() + '" target="_blank" rel="noopener">WhatsApp us</a>');
    else out.push(todo("Add your WhatsApp number"));
    out.push(S.email ? '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>" : todo("Add your email address"));
    return out;
  }
  function buildFooter() {
    var soc = [["Instagram", S.instagram], ["Facebook", S.facebook], ["TikTok", S.tiktok]].filter(function (x) { return x[1]; });
    var socHtml = soc.map(function (x) { return '<li><a href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + x[0] + "</a></li>"; }).join("");
    $("#site-footer").innerHTML =
      '<footer class="foot"><div class="wrap"><div class="foot-grid"><div><h2>' + esc(S.name) + "</h2><ul>" +
      contactLines().map(function (x) { return "<li>" + x + "</li>"; }).join("") +
      "<li>" + (S.address ? esc(S.address) : todo("Add your address")) + "</li>" + socHtml +
      "</ul></div><div><h2>Find your way</h2><ul>" +
      LINKS.concat([["book.html", "Book an appointment"]]).map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("") +
      "</ul></div><div><h2>Opening hours</h2>" + hoursTable() + "</div></div>" +
      '<p class="foot-small">&copy; ' + new Date().getFullYear() + " " + esc(S.name) + ". All rights reserved.</p></div></footer>";
  }

  /* Time in the salon's own timezone */
  function todayParts() {
    var d = new Date(), parts = {};
    try {
      new Intl.DateTimeFormat("en-GB", { timeZone: S.timezone, weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit" })
        .formatToParts(d).forEach(function (p) { parts[p.type] = p.value; });
      return { day: DAYS.indexOf(parts.weekday.toLowerCase()), minutes: +parts.hour * 60 + +parts.minute, iso: parts.year + "-" + parts.month + "-" + parts.day };
    } catch (e) {
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes(), iso: d.toISOString().slice(0, 10) };
    }
  }
  function openStatus() {
    var el = $("#open-status");
    if (!el) return;
    var t = todayParts(), h = S.hours[DAYS[t.day]];
    if (h && t.minutes >= mins(h.open) && t.minutes < mins(h.close)) {
      el.classList.add("is-open");
      el.textContent = "Open now, until " + time12(h.close);
      return;
    }
    if (h && t.minutes < mins(h.open)) { el.textContent = "Closed now. Opens today at " + time12(h.open); return; }
    for (var i = 1; i <= 7; i++) {
      var di = (t.day + i) % 7, nh = S.hours[DAYS[di]];
      if (nh) { el.textContent = "Closed now. Opens " + (i === 1 ? "tomorrow" : cap(DAYS[di])) + " at " + time12(nh.open); return; }
    }
    el.textContent = "";
  }

  /* Photo slots: show the photo if it exists, otherwise a labelled space */
  function mountPhoto(box) {
    var src = box.getAttribute("data-photo");
    box.innerHTML = '<div class="slot-empty"><strong>Your photo here</strong><span>' + esc(src) + "</span></div>";
    var img = new Image();
    img.alt = box.getAttribute("data-alt") || "";
    img.onload = function () {
      box.innerHTML = "";
      box.appendChild(img);
      box.classList.add("has-photo");
      box.dispatchEvent(new CustomEvent("photoloaded", { bubbles: true }));
    };
    img.src = src;
  }
  function mountPhotos(root) { $$("[data-photo]", root).forEach(mountPhoto); }

  /* Services */
  var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-"); };
  function renderServices() {
    var el = $("#price-menu");
    if (!el) return;
    el.innerHTML = S.services.map(function (g) {
      return '<section class="price-group" id="' + slug(g.group) + '"><div><h2>' + esc(g.group) + "</h2><p>" + esc(g.intro) + '</p></div><ul class="price-list">' +
        g.items.map(function (it) {
          return '<li class="price-row"><span class="price-name">' + esc(it.name) + '</span><span class="price-time">' + esc(it.time) + '</span><span class="price-amt">' + esc(it.price) + "</span>" +
            (it.note ? '<span class="price-note">' + esc(it.note) + "</span>" : "") +
            '<a class="price-book" href="book.html?service=' + encodeURIComponent(it.name) + '">Book ' + esc(it.name.toLowerCase()) + "</a></li>";
        }).join("") + "</ul></section>";
    }).join("");
    var jump = $("#jump");
    if (jump) jump.innerHTML = S.services.map(function (g) { return '<a href="#' + slug(g.group) + '">' + esc(g.group) + "</a>"; }).join("");
  }
  function renderHomePrices() {
    var el = $("#home-prices");
    if (!el) return;
    el.innerHTML = S.services.map(function (g) {
      return "<div><h3>" + esc(g.group) + '</h3><ul class="price-list">' + g.items.slice(0, 3).map(function (it) {
        return '<li class="price-row"><span class="price-name">' + esc(it.name) + '</span><span class="price-amt">' + esc(it.price) + "</span></li>";
      }).join("") + "</ul></div>";
    }).join("");
  }

  /* Hide unused spaces once at least one real photo is in place */
  function hideEmptiesWhenFilled(root, selector) {
    root.addEventListener("photoloaded", function () {
      $$(selector, root).forEach(function (item) {
        if (!$(".has-photo", item)) item.hidden = true;
      });
      if (root.refresh) root.refresh();
    });
  }
  function renderWorkStrip() {
    var el = $("#work-strip");
    if (!el) return;
    el.innerHTML = S.gallery.slice(0, 4).map(function (g) {
      return '<figure><div class="photo arch" data-photo="images/gallery/' + esc(g.file) + '" data-alt="' + esc(g.caption) + '"></div><figcaption>' + esc(g.caption) + "</figcaption></figure>";
    }).join("");
    hideEmptiesWhenFilled(el, "figure");
  }
  function renderGallery() {
    var grid = $("#gallery");
    if (!grid) return;
    var cats = ["All"].concat(S.gallery.map(function (g) { return g.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var filters = $("#filters"), active = "All";
    filters.innerHTML = cats.map(function (c) { return '<button type="button" aria-pressed="' + (c === "All") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; }).join("");
    grid.innerHTML = S.gallery.map(function (g) {
      return '<figure class="tile" data-cat="' + esc(g.category) + '"><button type="button" disabled aria-label="View larger: ' + esc(g.caption) + '"><div class="photo" data-photo="images/gallery/' + esc(g.file) + '" data-alt="' + esc(g.caption) + '"></div></button><figcaption>' + esc(g.caption) + "</figcaption></figure>";
    }).join("");

    var anyReal = false;
    grid.refresh = function () {
      $$(".tile", grid).forEach(function (t) {
        var real = !!$(".has-photo", t);
        t.hidden = (active !== "All" && t.getAttribute("data-cat") !== active) || (anyReal && !real);
      });
    };
    grid.addEventListener("photoloaded", function (e) {
      anyReal = true;
      e.target.closest("button").disabled = false;
      grid.refresh();
    });
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      active = b.getAttribute("data-cat");
      $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      grid.refresh();
    });

    var box = $("#lightbox"), big = $("#lb-img"), cap2 = $("#lb-cap"), list = [], at = 0;
    function show(i) {
      at = (i + list.length) % list.length;
      var im = $("img", list[at]);
      big.src = im.src; big.alt = im.alt; cap2.textContent = im.alt;
    }
    grid.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b || b.disabled) return;
      list = $$(".tile", grid).filter(function (t) { return !t.hidden && $(".has-photo", t); });
      show(list.indexOf(b.closest(".tile")));
      box.showModal();
    });
    $("#lb-prev").addEventListener("click", function () { show(at - 1); });
    $("#lb-next").addEventListener("click", function () { show(at + 1); });
    $("#lb-close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(at - 1);
      if (e.key === "ArrowRight") show(at + 1);
    });
  }

  /* Reviews, about, FAQ */
  function renderReviews() {
    var sec = $("#reviews-section");
    if (!sec || !S.reviews.length) return;
    sec.hidden = false;
    $("#reviews").innerHTML = S.reviews.map(function (r) {
      return "<blockquote>" + esc(r.text) + "<cite>" + esc(r.name) + "</cite></blockquote>";
    }).join("");
  }
  function renderAbout() {
    var st = $("#story");
    if (!st) return;
    st.innerHTML = S.story.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#values").innerHTML = S.values.map(function (v) { return "<div><h3>" + esc(v.title) + "</h3><p>" + esc(v.text) + "</p></div>"; }).join("");
    $("#team").innerHTML = S.team.map(function (t) {
      return '<article><div class="photo arch" data-photo="images/team/' + esc(t.photo) + '" data-alt="' + esc(t.name) + '"></div><h3>' + esc(t.name) + '</h3><p class="team-role">' + esc(t.role) + "</p><p>" + esc(t.bio) + "</p></article>";
    }).join("");
  }
  function renderFaq() {
    var el = $("#faq");
    if (!el) return;
    el.innerHTML = S.faqs.map(function (f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
    $("#tips").innerHTML = S.tips.map(function (t) { return "<div><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></div>"; }).join("");
  }

  /* Contact details on the contact and booking pages */
  function renderDetails() {
    $$("[data-contact]").forEach(function (el) { el.innerHTML = contactLines().join("<br>"); });
    $$("[data-hours]").forEach(function (el) { el.innerHTML = hoursTable(); });
    $$("[data-address]").forEach(function (el) {
      el.innerHTML = (S.address ? esc(S.address) : todo("Add your address")) + (S.parking ? "<br>" + esc(S.parking) : "");
    });
    var m = $("#map");
    if (m && S.address) {
      var q = encodeURIComponent(S.address);
      m.innerHTML = '<iframe class="map" title="Map showing ' + esc(S.name) + '" loading="lazy" src="https://www.google.com/maps?q=' + q + '&output=embed"></iframe><p><a href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">Get directions</a></p>';
    }
  }

  /* Forms send through WhatsApp or email, so no server is needed */
  function sendMessage(form, buildText, subject) {
    var msg = $(".form-msg", form), wa = waNumber();
    var waBtn = $('[value="whatsapp"]', form), mailBtn = $('[value="email"]', form);
    if (!wa) waBtn.hidden = true;
    if (!S.email) mailBtn.hidden = true;
    var show = function (cls, text) { msg.className = "notice form-msg " + cls; msg.textContent = text; msg.hidden = false; };
    if (!wa && !S.email) {
      waBtn.hidden = false;
      show("err", "Sending isn't set up yet. Add your WhatsApp number or email address in site-settings.js.");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.extraCheck && !form.extraCheck()) return;
      var how = e.submitter ? e.submitter.value : (wa ? "whatsapp" : "email");
      var text = buildText(new FormData(form));
      if (how === "whatsapp" && wa) {
        window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        show("ok", "WhatsApp should now be open with your message ready. Press send there to reach us.");
      } else if (how === "email" && S.email) {
        location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
        show("ok", "Your email app should now be open with your message ready. Press send there to reach us.");
      } else {
        show("err", "Sending isn't set up yet. Add your WhatsApp number or email address in site-settings.js.");
      }
    });
  }
  function bookingForm() {
    var form = $("#book-form");
    if (!form) return;
    var sel = form.elements.service, date = form.elements.date, time = form.elements.time;
    sel.insertAdjacentHTML("beforeend", S.services.map(function (g) {
      return '<optgroup label="' + esc(g.group) + '">' + g.items.map(function (it) { return "<option>" + esc(it.name) + "</option>"; }).join("") + "</optgroup>";
    }).join("") + "<option>Not sure yet, I'd like advice</option>");
    var wanted = new URLSearchParams(location.search).get("service");
    if (wanted) sel.value = wanted;
    date.min = todayParts().iso;

    var dayErr = $("#date-help");
    function hoursFor(iso) {
      var p = iso.split("-");
      return S.hours[DAYS[new Date(+p[0], +p[1] - 1, +p[2]).getDay()]];
    }
    function fillTimes() {
      time.innerHTML = '<option value="">Choose a date first</option>';
      time.disabled = true;
      date.setCustomValidity("");
      dayErr.textContent = "";
      if (!date.value) return;
      var h = hoursFor(date.value);
      if (!h) {
        date.setCustomValidity("We're closed on that day. Please choose another date.");
        dayErr.textContent = "We're closed on that day. Please choose another date.";
        return;
      }
      var t = todayParts(), opts = '<option value="">Choose a time</option>';
      for (var m = mins(h.open); m <= mins(h.close) - 30; m += 30) {
        if (date.value === t.iso && m <= t.minutes) continue;
        var v = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
        opts += '<option value="' + time12(v) + '">' + time12(v) + "</option>";
      }
      time.innerHTML = opts;
      time.disabled = false;
      if (time.options.length === 1) {
        time.innerHTML = '<option value="">No times left today</option>';
        time.disabled = true;
        date.setCustomValidity("There are no times left today. Please choose another date.");
        dayErr.textContent = "There are no times left today. Please choose another date.";
      }
    }
    date.addEventListener("change", fillTimes);
    fillTimes();
    sendMessage(form, function (d) {
      var when = new Date(d.get("date") + "T12:00:00").toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      return "Hi " + S.name + ", I'd like to book an appointment.\n\nName: " + d.get("name") + "\nPhone: " + d.get("phone") +
        "\nService: " + d.get("service") + "\nDate: " + when + "\nTime: " + d.get("time") +
        (d.get("notes") ? "\nNotes: " + d.get("notes") : "");
    }, "Booking request");
  }
  function contactForm() {
    var form = $("#contact-form");
    if (!form) return;
    sendMessage(form, function (d) {
      return "Hi " + S.name + ", this is " + d.get("name") + (d.get("phone") ? " (" + d.get("phone") + ")" : "") + ".\n\n" + d.get("message");
    }, "Message from the website");
  }

  /* The light bulbs around the mirror */
  function mirror() {
    var path = $("#mirror-path");
    if (!path) return;
    var n = 19, len = path.getTotalLength(), g = $("#bulbs"), out = "";
    for (var i = 0; i < n; i++) {
      var p = path.getPointAtLength(len * i / (n - 1));
      out += '<circle class="bulb" style="--i:' + i + '" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="8"/>';
    }
    g.innerHTML = out;
  }

  document.title = document.title.replace(/KN Aesthetics Studio/g, S.name);
  $$("[data-area]").forEach(function (el) { el.textContent = S.area; });
  $$("[data-name]").forEach(function (el) { el.textContent = S.name; });
  buildHeader(); renderServices(); renderHomePrices(); renderWorkStrip(); renderGallery();
  renderReviews(); renderAbout(); renderFaq(); renderDetails(); buildFooter();
  openStatus(); bookingForm(); contactForm(); mirror(); mountPhotos(document);
})();
