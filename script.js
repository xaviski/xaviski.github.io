const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const contactForm = document.querySelector("[data-contact-form]");
const editorialHref = "/editorial.css";

if (!document.querySelector(`link[href="${editorialHref}"]`)) {
  const editorialStyles = document.createElement("link");
  editorialStyles.rel = "stylesheet";
  editorialStyles.href = editorialHref;
  document.head.append(editorialStyles);
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  if (!toggle || !nav || !header) return;
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
};

if (toggle && nav && header) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    header.classList.toggle("is-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    const action = contactForm.getAttribute("action") || "";
    if (!action.includes("REPLACE_WITH_YOUR_FORM_ID")) return;

    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent("Wedding photography inquiry");
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Wedding date: ${data.get("date") || ""}`,
        `Location: ${data.get("location") || ""}`,
        "",
        "Message:",
        data.get("message") || "",
      ].join("\n"),
    );
    window.location.href = `mailto:xavierpalahi@hotmail.com?subject=${subject}&body=${body}`;
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
