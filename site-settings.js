/* =====================================================================
   KN AESTHETICS STUDIO: YOUR SETTINGS
   This is the only file you need to edit for everyday changes.
   Open it in Notepad (Windows) or TextEdit (Mac).

   Three rules that keep the site working:
   1. Only change the words inside the "double quotes".
   2. Keep every comma and bracket where it is.
   3. Save the file, then refresh the website to see your change.
   ===================================================================== */

window.SITE = {

  /* ---------- Your details ----------
     Anything left empty ("") shows a reminder on the site until you fill it in. */
  name: "KN Aesthetics Studio",
  ownerName: "Kim",
  area: "Durban",
  phone: "084 381 5024",
  whatsapp: "063 188 4936",   // Bookings go here.
  email: "",              // e.g. "hello@knaesthetics.co.za"
  address: "",            // e.g. "12 Example Road, Berea, Durban, 4001"
  parking: "",            // e.g. "Free parking behind the building"

  /* The gold bar under the menu on every page. Use "" to hide it. */
  announcement: "Opening specials now on. Back in studio from 9 November!",

  /* Paste your full page links. Empty ones stay hidden. */
  instagram: "",
  facebook: "",
  tiktok: "",

  /* ---------- Opening hours ----------
     24-hour time. Use null (no quotes) for a closed day. */
  timezone: "Africa/Johannesburg",
  hours: {
    monday:    null,
    tuesday:   { open: "08:30", close: "17:00" },
    wednesday: { open: "08:30", close: "17:00" },
    thursday:  { open: "08:30", close: "17:00" },
    friday:    { open: "08:30", close: "18:00" },
    saturday:  { open: "08:00", close: "15:00" },
    sunday:    null
  },

  /* ---------- Services and prices ----------
     To add a service, copy a whole { ... } line and change the words.
     SAMPLE PRICES: replace them with your real ones. */
  services: [
    {
      group: "Hair",
      intro: "Opening specials. Every appointment starts with a chat about what you want.",
      items: [
        { name: "Wash and set", price: "R50", time: "", note: "" },
        { name: "Full colour", price: "from R50", time: "", note: "Price depends on hair length." },
        { name: "Cap highlights", price: "R150", time: "", note: "Excludes wash and set." },
        { name: "6 foils and full colour", price: "R500", time: "", note: "" },
        { name: "Full head foils", price: "R800", time: "", note: "" }
      ]
    },
    {
      group: "Waxing",
      intro: "Quick, neat and done in minutes.",
      items: [
        { name: "Eyebrows", price: "R30", time: "", note: "" },
        { name: "Eyebrows and upper lip", price: "R65", time: "", note: "" },
        { name: "Full face wax", price: "R100", time: "", note: "" }
      ]
    },
    {
      group: "Skin",
      intro: "Treatments for brighter, smoother, healthier-looking skin.",
      items: [
        { name: "Microneedling", price: "R250", time: "", note: "Includes a free wash and set." },
        { name: "Facial", price: "R150", time: "", note: "" },
        { name: "Dermaplaning", price: "R80", time: "", note: "" }
      ]
    }
  ],

  /* ---------- Your work (Gallery page) ----------
     1. Put your photo in the folder: images/gallery
     2. Name it to match a line below, e.g. photo-01.jpg
     3. Set the category and caption
     To add more, copy a line and use a new name, e.g. photo-13.jpg
     Categories create the filter buttons automatically. */
  gallery: [
    { file: "photo-01.jpg", category: "Hair",   caption: "Full colour" },
    { file: "photo-02.jpg", category: "Hair",   caption: "Foils" },
    { file: "photo-03.jpg", category: "Skin",   caption: "Microneedling" },
    { file: "photo-04.jpg", category: "Hair",   caption: "Cap highlights" },
    { file: "photo-05.jpg", category: "Waxing", caption: "Brows" },
    { file: "photo-06.jpg", category: "Skin",   caption: "Dermaplaning" },
    { file: "photo-07.jpg", category: "Hair",   caption: "6 foils and full colour" },
    { file: "photo-08.jpg", category: "Hair",   caption: "Wash and set" },
    { file: "photo-09.jpg", category: "Skin",   caption: "Facial" },
    { file: "photo-10.jpg", category: "Hair",   caption: "Full head foils" },
    { file: "photo-11.jpg", category: "Waxing", caption: "Full face wax" },
    { file: "photo-12.jpg", category: "Hair",   caption: "Before and after" }
  ],

  /* ---------- About page ---------- */
  story: [
    "KN Aesthetics Studio is a place to sit down, breathe out and be listened to. Good hair and skin work starts before anything begins, with a proper conversation about what you like, what you don't, and how much time you want to spend on it each morning.",
    "The studio is built around that idea. You'll get honest advice about what will suit you and suit your budget, and you'll know the price before we start.",
    "Whether you're here for a quick brow wax, a new colour or a skin treatment, we want you to leave feeling more like yourself."
  ],
  values: [
    { title: "We listen first", text: "Nothing gets coloured, waxed or treated until we both agree on the plan." },
    { title: "Clear prices", text: "You'll hear the cost before we start, including anything extra." },
    { title: "Care for your hair and skin", text: "We'd rather recommend what's healthy for you than what's trendy this week." }
  ],

  /* Team photos go in images/team. Copy a line to add a person. */
  team: [
    { name: "Kim", role: "Owner and stylist", photo: "kim.jpg", bio: "Add a line or two about Kim here: experience, specialities, what she loves about the job." }
  ],

  /* ---------- Reviews ----------
     Only add real reviews from real clients, with their permission.
     The reviews section stays hidden until there is at least one.
     Example:
     { name: "Client's first name", text: "What they said." },   */
  reviews: [
  ],

  /* ---------- Questions (FAQ page) ----------
     SAMPLE POLICIES: change these to match how you really work. */
  faqs: [
    { q: "How do I book?", a: "Send a request from the Book page. It goes straight to us on WhatsApp or email, and we'll reply to confirm your time." },
    { q: "Is my booking confirmed when I send the form?", a: "Not yet. The form sends us your request, and your appointment is confirmed once we reply." },
    { q: "Do you take walk-ins?", a: "If there's a gap, yes. It's best to message first so you don't have to wait." },
    { q: "What if I need to cancel or move my appointment?", a: "Please let us know at least 24 hours before, so we can offer the time to someone else." },
    { q: "How can I pay?", a: "Please ask us when you book and we'll confirm the options." },
    { q: "Should I do anything before a colour appointment?", a: "Tell us about any recent colour, relaxer or treatment, and any reactions you've had to hair products. We may suggest a patch test first." },
    { q: "Can I bring a photo of what I want?", a: "Please do. Photos are the easiest way to show us what you have in mind." }
  ],

  tips: [
    { title: "After colour", text: "Use a shampoo made for coloured hair, wash with cooler water and go easy on heat styling." },
    { title: "After microneedling or dermaplaning", text: "Keep your skin clean, skip makeup for the rest of the day, wear sunscreen and follow the aftercare we give you." },
    { title: "After brows or waxing", text: "Skip hot showers, saunas and strong sun for the rest of the day, and keep the area clean." },
    { title: "Between appointments", text: "Book your next visit before your colour grows out. For many clients that's around six to eight weeks." }
  ]
};
