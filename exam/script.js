const DEFAULT_DOC_PATH = "assets/fsd1.docx";
const DEFAULT_PDF_PATH = "assets/fsd1.pdf";
const PHOTO_PATHS = ["assets/photo.jpeg", "assets/photo1.jpeg"];

const loadDocButton = document.getElementById("loadDoc");
const openPdfButton = document.getElementById("openPdf");
const viewPhotosButton = document.getElementById("viewPhotos");
const downloadWordButton = document.getElementById("downloadWord");
const downloadPdfButton = document.getElementById("downloadPdf");
const statusLabel = document.getElementById("status");
const viewer = document.getElementById("viewer");

let currentDocxBlob = null;

function setStatus(message) {
  statusLabel.textContent = message;
}

function renderPhotos() {
  viewer.innerHTML = `
    <div class="viewer-photos" aria-label="Photos preview">
      <figure class="photo-card">
        <img src="${PHOTO_PATHS[0]}" alt="Photo 1" loading="lazy" />
      </figure>
      <figure class="photo-card">
        <img src="${PHOTO_PATHS[1]}" alt="Photo 2" loading="lazy" />
      </figure>
    </div>
  `;
  setStatus("Showing photos.");
}

async function renderPdf() {
  setStatus("Opening PDF file...");

  const response = await fetch(DEFAULT_PDF_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Could not find the PDF file in assets folder.");
  }

  viewer.innerHTML = `<iframe class="pdf-frame" src="${DEFAULT_PDF_PATH}#view=FitH" title="PDF preview"></iframe>`;
  setStatus("PDF file opened.");
}

async function renderDocxFromArrayBuffer(arrayBuffer) {
  viewer.innerHTML = "";

  await docx.renderAsync(arrayBuffer, viewer, null, {
    className: "docx",
    inWrapper: false,
    ignoreWidth: false,
    ignoreHeight: false,
    breakPages: true,
    renderHeaders: true,
    renderFooters: true,
    renderChanges: true,
    useBase64URL: true
  });

  if (!viewer.textContent.trim()) {
    viewer.innerHTML = "<p>No readable content was found in this document.</p>";
  }
}

async function loadBundledDocx() {
  setStatus("Loading your Word file...");

  const response = await fetch(DEFAULT_DOC_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Could not find the DOCX file in assets folder.");
  }

  currentDocxBlob = await response.blob();
  const arrayBuffer = await currentDocxBlob.arrayBuffer();
  await renderDocxFromArrayBuffer(arrayBuffer);

  setStatus("Word file loaded successfully.");
}

async function downloadPdfFromViewer() {
  if (!viewer.textContent.trim()) {
    throw new Error("Load a document first before exporting to PDF.");
  }

  setStatus("Creating PDF...");

  const canvas = await html2canvas(viewer, {
    scale: 2,
    backgroundColor: "#fffdf8"
  });

  const imageData = canvas.toDataURL("image/png");
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imageWidth = pageWidth - 36;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;

  if (imageHeight <= pageHeight - 36) {
    pdf.addImage(imageData, "PNG", 18, 18, imageWidth, imageHeight);
  } else {
    let remaining = imageHeight;
    let yOffset = 18;

    pdf.addImage(imageData, "PNG", 18, yOffset, imageWidth, imageHeight);
    remaining -= (pageHeight - 36);

    while (remaining > 0) {
      pdf.addPage();
      yOffset = 18 - (imageHeight - remaining);
      pdf.addImage(imageData, "PNG", 18, yOffset, imageWidth, imageHeight);
      remaining -= (pageHeight - 36);
    }
  }

  pdf.save("fsd1.pdf");
  setStatus("PDF downloaded as fsd1.pdf.");
}

function downloadWord() {
  if (currentDocxBlob) {
    const url = URL.createObjectURL(currentDocxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fsd1.docx";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Word file downloaded.");
    return;
  }

  window.location.href = DEFAULT_DOC_PATH;
}

loadDocButton.addEventListener("click", async () => {
  try {
    await loadBundledDocx();
  } catch (error) {
    console.error(error);
    setStatus(`Error: ${error.message}`);
  }
});

openPdfButton.addEventListener("click", async () => {
  try {
    await renderPdf();
  } catch (error) {
    console.error(error);
    setStatus(`Error: ${error.message}`);
  }
});

viewPhotosButton.addEventListener("click", () => {
  renderPhotos();
});

downloadWordButton.addEventListener("click", () => {
  downloadWord();
});

downloadPdfButton.addEventListener("click", async () => {
  try {
    await downloadPdfFromViewer();
  } catch (error) {
    console.error(error);
    setStatus(`Error: ${error.message}`);
  }
});
