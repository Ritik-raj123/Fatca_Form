document.getElementById('downloadBtn').addEventListener('click', () => {
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
