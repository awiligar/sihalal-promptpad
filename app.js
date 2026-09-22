const copyButtons = document.querySelectorAll("[data-copy-target]");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    if (!document.execCommand("copy")) {
      throw new Error("Clipboard copy failed");
    }
  } finally {
    textarea.remove();
  }
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const prompt = document.getElementById(button.dataset.copyTarget);
    const card = button.closest("[data-card]");
    const status = card.querySelector("[aria-live]");

    try {
      const copiedText = prompt.textContent.trim().replace(/\s+/g, " ");
      await copyText(copiedText);
      button.textContent = "Tersalin";
      status.textContent = "Prompt berhasil disalin.";
      window.setTimeout(() => {
        button.textContent = "Salin";
      }, 2000);
    } catch (error) {
      status.textContent = "Prompt gagal disalin. Silakan coba lagi.";
    }
  });
});