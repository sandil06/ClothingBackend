// Utility to export any DOM element to a single-page PDF using html2canvas + jsPDF
// Usage: await exportElementToPdf(element, { filename: 'report.pdf', margin: 10 })
export async function exportElementToPdf(element, { filename = 'report.pdf', margin = 10 } = {}) {
  if (!element) throw new Error('No element to export');
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf')
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const contentWidth = pageWidth - margin * 2;
  const ratio = contentWidth / canvas.width;
  const imgHeight = canvas.height * ratio;

  // If content exceeds a page, split across multiple pages
  let remaining = imgHeight;
  let position = margin;
  let y = 0;

  // First page
  pdf.addImage(imgData, 'PNG', margin, position, contentWidth, Math.min(remaining, pageHeight - margin * 2));
  remaining -= (pageHeight - margin * 2);

  while (remaining > 0) {
    pdf.addPage();
    y += (pageHeight - margin * 2);
    pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, Math.min(remaining, pageHeight - margin * 2), '', 'FAST');
    remaining -= (pageHeight - margin * 2);
  }

  pdf.save(filename);
}
