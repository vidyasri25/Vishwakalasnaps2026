/* ============ EDIT YOUR WEBSITE CONTENT HERE ============
   Change any text between the quotes. Add or remove items in the lists.
   Photos: each category has an images list; add photo links or embedded images there. */
const SITE = {
  tagline: "Every moment, beautifully kept. Weddings, pre-wedding shoots, baby showers, birthdays and every celebration in between.",
  phones: ["9341280143", "9513880813"],
  whatsapp: "919341280143",          // country code + number, no spaces
  email: "vishwakalasnaps@gmail.com",                          // add your email to show it
  address: "865, 6th Main Rd, Dasarahalli, Jnananjyothinagar, Srirama Layout, Jnana Ganga Nagar, Bengaluru, Karnataka 560056",                        // add your studio address
  mapLink: "https://maps.app.goo.gl/LZkRaZhmoQP1KfCB6",                        // paste your Google Maps share link here
  social: { Instagram: "https://www.instagram.com/vishwakalasnaps", YouTube: "", Facebook: "" },   // paste profile links to show them
  categories: [                       // portfolio sections. Add photos like images: [IMG.groom, IMG.haldi]. Sections with no photos stay hidden
    { name: "Weddings", images: [IMG.groom, IMG.haldi] },
    { name: "Pre-wedding", images: [] },
    { name: "Engagement", images: [IMG.couple, IMG.rings] },
    { name: "Portraits & traditional", images: [IMG.veena3, IMG.veena1, IMG.veena2, IMG.lake] },
    { name: "Baby & maternity", images: [IMG.baby, IMG.family] },
    { name: "Birthdays", images: [IMG.bday1, IMG.bday2] },
    { name: "Ceremonies & housewarming", images: [IMG.homa, IMG.house, IMG.deity] },
    { name: "Corporate & more", images: [] }
  ],
  videos: [                           // src = video file, poster = cover image, title = caption
    { title: "Devika & Yogesh, wedding film", src: "", poster: POSTER.v1 },
    { title: "Bridal story, wedding teaser", src: "", poster: POSTER.v2 },
    { title: "Baby photoshoot film", src: "", poster: POSTER.v3 },
    { title: "First birthday memories", src: "", poster: POSTER.v4 },
    { title: "Cinematic wedding teaser", src: "", poster: POSTER.v5 }
  ],
  services: [
    { t: "Candid & traditional photography", d: "Natural moments and classic family portraits, delivered as edited, colour-graded photos." },
    { t: "Wedding films & cinematic videos", d: "Highlight films and full-length coverage of your ceremonies." },
    { t: "Pre-wedding & couple shoots", d: "Outdoor and studio shoots planned around your story and your locations." },
    { t: "Baby shower, newborn & birthday shoots", d: "Gentle, fun coverage for your family’s smaller celebrations." },
    { t: "Drone & live streaming", d: "Aerial shots and live streaming for guests who cannot attend." },
    { t: "Albums, frames & prints", d: "Designed albums and framed prints to keep your memories in hand." }
  ],
  custom: { title: "Packages made for you", text: "We prefer customised packages. Every event is different, so tell us what you need and we will build the coverage and a quote around it.", button: "Plan your package" },
  about: [
    "Vishwakala Photography & Videography captures weddings, pre-wedding shoots, baby showers, birthdays and the many celebrations in between.",
    "We combine candid storytelling with traditional coverage, so you get the rituals, the family portraits and the small moments you would otherwise miss.",
    "Add your story here: how you started, how long you have been shooting and what your team is like."
  ],
  testimonials: [                     // replace with real reviews from your clients
    
    
    
  ],
  faq: [                              // sample answers. Please check them against how you work
    { q: "How do I book you?", a: "Send us your event type, date and location by WhatsApp or the form below. We check availability and share a quote." },
    { q: "How long does delivery take?", a: "Delivery time depends on the package and the event. We confirm it when you book." },
    { q: "Do you travel to other cities?", a: "Yes. Travel and stay charges, if any, are included in your quote." },
    { q: "Can I see my photos online?", a: "Yes. We share an online gallery where you can view and download your photos." },
    { q: "Can we customise a package?", a: "Of course. Tell us what you need and we will build a package around it." }
  ]
};
/* ============ END OF EDITABLE CONTENT ============ */

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const wa = t => "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(t || "Hello Vishwakala, I’d like to enquire about your photography and videography.");
const cam = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
const fmt = p => p.replace(/(\d{5})(\d{5})/, "$1 $2");

$("#tag").textContent = SITE.tagline;
["#heroWa", "#waFloat"].forEach(s => { const a = $(s); a.href = wa(); a.target = "_blank"; a.rel = "noopener"; });
$("#heroCall").href = "tel:+91" + SITE.phones[0];

// theme toggle
const root = document.documentElement;
try { const s = localStorage.getItem("vk-theme"); if (s) root.dataset.theme = s; } catch (e) {}
$("#tg").onclick = () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("vk-theme", root.dataset.theme); } catch (e) {}
};

// portfolio
let cur = "All";
const shown = () => { const f = SITE.categories.filter(c => c.images.length); return f.length ? f : SITE.categories; };
function drawGallery() {
  const cats = shown();
  if (cur !== "All" && !cats.some(c => c.name === cur)) cur = "All";
  $("#chips").innerHTML = ["All", ...cats.map(c => c.name)].map(n =>
    `<button class="chip" type="button" aria-pressed="${n === cur}" data-c="${esc(n)}">${esc(n)}</button>`).join("");
  $("#grid").innerHTML = cats.filter(c => cur === "All" || c.name === cur).map(c =>
    c.images.length
      ? c.images.map(i => { i = typeof i === "string" ? { u: i } : i; return `<figure class="tile has${i.t ? " tall" : ""}"><img src="${esc(i.u)}" alt="${esc(c.name)} photo by Vishwakala" loading="lazy"></figure>`; }).join("")
      : Array.from({ length: 2 }, () => `<figure class="tile">${cam}<figcaption>${esc(c.name)}<small>Photos coming soon</small></figcaption></figure>`).join("")).join("");
}
$("#chips").onclick = e => { const b = e.target.closest("[data-c]"); if (b) { cur = b.dataset.c; drawGallery(); } };
const lb = $("#lb");
$("#grid").onclick = e => { const im = e.target.closest(".has img"); if (im) { $("#lbImg").src = im.src; $("#lbImg").alt = im.alt; lb.showModal(); } };
lb.onclick = () => lb.close();
drawGallery();

$("#vids").innerHTML = SITE.videos.map(v => {
  if (v.src) return `<div class="vid"><video controls playsinline preload="none" poster="${esc(v.poster || "")}" src="${esc(v.src)}"></video><span>${esc(v.title)}</span></div>`;
  const bg = v.poster ? ` style="background:#000 url('${esc(v.poster)}') center/cover no-repeat"` : "";
  const inner = `<div class="scr"${bg}><i></i></div><span>${esc(v.title)}</span>${v.url ? "" : "<small>Video coming soon</small>"}`;
  return v.url ? `<a class="vid" href="${esc(v.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="vid">${inner}</div>`;
}).join("");

$("#svc").innerHTML = SITE.services.map(s => `<div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join("");
$("#cust").innerHTML = `<div><h3>${esc(SITE.custom.title)}</h3><p>${esc(SITE.custom.text)}</p></div><a class="btn" target="_blank" rel="noopener" href="${wa("Hello Vishwakala, I’d like a customised package for my event.")}">${esc(SITE.custom.button)}</a>`;

$("#aboutText").innerHTML = SITE.about.map(t => `<p>${esc(t)}</p>`).join("");

$("#qs").innerHTML = SITE.testimonials.map(t => `<blockquote><p>“${esc(t.text)}”</p><cite>${esc(t.name)}</cite></blockquote>`).join("");
$("#faqList").innerHTML = SITE.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

// contact
$("#info").innerHTML =
  `<p><b>Call us</b>${SITE.phones.map(p => `<a href="tel:+91${p}">${fmt(p)}</a>`).join("<br>")}</p>` +
  `<p><b>WhatsApp</b><a href="${wa()}" target="_blank" rel="noopener">Message us</a></p>` +
  (SITE.email ? `<p><b>Email</b><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>` : "") +
  (SITE.social.Instagram ? `<p><b>Instagram</b><a href="${esc(SITE.social.Instagram)}" target="_blank" rel="noopener">@${esc(SITE.social.Instagram.split("/").filter(Boolean).pop())}</a></p>` : "") +
  `<p><b>Studio address</b>${SITE.address ? esc(SITE.address) : '<span style="color:var(--muted)">Address to be added</span>'}</p>` +
  `<div class="map">${SITE.mapLink ? `<a class="btn" href="${esc(SITE.mapLink)}" target="_blank" rel="noopener">Open in Google Maps</a>` : "Google Maps link goes here"}</div>`;
$("#evt").innerHTML = [...SITE.categories.map(c => c.name), "Other"].map(n => `<option>${esc(n)}</option>`).join("");
$("#form").onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target), g = k => (f.get(k) || "").toString().trim();
  const msg = `Hello Vishwakala, I’d like to enquire about ${g("e")}.\nName: ${g("n")}\nPhone: ${g("p")}\nDate: ${g("d") || "not fixed yet"}\nLocation: ${g("l") || "not fixed yet"}\n${g("m")}`;
  const link = $("#sendLink");
  link.href = wa(msg); $("#sendMsg").value = msg; $("#fbNum").textContent = fmt(SITE.phones[0]);
  $("#copyBtn").textContent = "Copy message"; $("#fallback").hidden = false; link.click();
};
$("#copyBtn").onclick = async () => {
  const t = $("#sendMsg");
  try { await navigator.clipboard.writeText(t.value); } catch (e) { t.select(); try { document.execCommand("copy"); } catch (e2) {} }
  $("#copyBtn").textContent = "Copied";
};
$("#fbEvt").innerHTML = [...SITE.categories.map(c => c.name), "Other"].map(n => `<option>${esc(n)}</option>`).join("");
$("#fbForm").onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target), g = k => (f.get(k) || "").toString().trim();
  const msg = `Feedback for Vishwakala Photography & Videography\nName: ${g("n")}\nEvent: ${g("e")}\nRating: ${g("r")}/5\nOK to show on your website: ${f.get("ok") ? "Yes" : "No"}\n\n${g("m")}`;
  const wl = $("#fbWa");
  wl.href = wa(msg);
  $("#fbMail").href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Feedback from " + g("n")) + "&body=" + encodeURIComponent(msg);
  $("#fbMsg").value = msg; $("#fbNum2").textContent = fmt(SITE.phones[0]);
  $("#fbCopy").textContent = "Copy feedback"; $("#fbBox").hidden = false; wl.click();
};
$("#fbCopy").onclick = async () => {
  const t = $("#fbMsg");
  try { await navigator.clipboard.writeText(t.value); } catch (e) { t.select(); try { document.execCommand("copy"); } catch (e2) {} }
  $("#fbCopy").textContent = "Copied";
};
const soc = Object.entries(SITE.social).filter(([, u]) => u);
$("#soc").innerHTML = [...soc.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" style="margin:0 .6rem">${esc(n)}</a>`), ...(SITE.email ? [`<a href="mailto:${esc(SITE.email)}" style="margin:0 .6rem">${esc(SITE.email)}</a>`] : [])].join("");
