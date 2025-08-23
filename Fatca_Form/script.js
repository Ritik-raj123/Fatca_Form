document.addEventListener('DOMContentLoaded', () => {
  // --- Download PDF (guarded; only wires up if button exists) ---
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const element = document.getElementById('doc');
      const opt = {
        margin: 0,
        filename: 'FATCA-CRS-Annexure.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };
      html2pdf().from(element).set(opt).save();
    });
  }

  // --- OTP-style auto move for 14 account inputs ---
  const accountInputs = Array.from(document.querySelectorAll('.account-input'));

  accountInputs.forEach((input, index) => {
    // keep only single char and move next
    input.addEventListener('input', () => {
      input.value = input.value.slice(0, 1); // enforce 1 char
      if (input.value && index < accountInputs.length - 1) {
        accountInputs[index + 1].focus();
        accountInputs[index + 1].select?.();
      }
    });

    // paste across multiple boxes
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\s+/g, '');
      let i = index;
      for (const ch of text) {
        if (i >= accountInputs.length) break;
        accountInputs[i].value = ch;
        i++;
      }
      const next = Math.min(i, accountInputs.length - 1);
      accountInputs[next].focus();
      accountInputs[next].select?.();
    });

    // backspace to previous when empty; arrow nav
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        accountInputs[index - 1].focus();
        accountInputs[index - 1].value = '';
      } else if (e.key === 'ArrowLeft' && index > 0) {
        accountInputs[index - 1].focus();
      } else if (e.key === 'ArrowRight' && index < accountInputs.length - 1) {
        accountInputs[index + 1].focus();
      }
    });
  });

  // --- Enter to move for free-form fields (.text-input) ---
  const textInputs = Array.from(document.querySelectorAll('.text-input'));
  textInputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const next = textInputs[index + 1];
        if (next) next.focus();
      }
    });
  });
});
