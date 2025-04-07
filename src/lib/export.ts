import jsPDF from 'jspdf';

const generateFilenameFromURL = (url: string, extension: string) => {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return `qr-code-${hostname}.${extension}`;
  } catch {
    return `qr-code.${extension}`;
  }
};

export const saveToClipboard = (canvasRef: React.RefObject<HTMLDivElement | null>) => {
  const canvas = canvasRef.current?.children[0] as HTMLCanvasElement;
  if (!canvas) return;

  const padding = 20;
  const size = canvas.width;

  const newCanvas = document.createElement('canvas');
  newCanvas.width = size + padding * 2;
  newCanvas.height = size + padding * 2;

  const context = newCanvas.getContext('2d');
  if (!context) return;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, newCanvas.width, newCanvas.height);
  context.drawImage(canvas, padding, padding, size, size);

  newCanvas.toBlob((blob) => {
    if (blob) {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    }
  });
};

export const saveToPNG = (
  canvasRef: React.RefObject<HTMLDivElement | null>,
  size: number,
  url: string,
) => {
  const canvas = canvasRef.current?.children[0] as HTMLCanvasElement;
  if (!canvas) return;

  const padding = 20;
  const newCanvas = document.createElement('canvas');
  newCanvas.width = size + padding * 2;
  newCanvas.height = size + padding * 2;

  const context = newCanvas.getContext('2d');
  if (context) {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, newCanvas.width, newCanvas.height);
    context.drawImage(canvas, padding, padding, size, size);
  }

  const pngFile = newCanvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.download = generateFilenameFromURL(url, 'png');
  downloadLink.href = pngFile;
  downloadLink.click();
};

export const saveToPDF = (canvasRef: React.RefObject<HTMLDivElement | null>, url: string) => {
  const canvas = canvasRef.current?.children[0] as HTMLCanvasElement;
  if (!canvas) return;

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();

  const marginLeft = 15;
  pdf.setFontSize(12);
  pdf.text(`Generated QR Code for ${url}`, marginLeft, 20);
  pdf.addImage(imgData, 'PNG', marginLeft, 30, 60, 60);

  const filename = generateFilenameFromURL(url, 'pdf');
  pdf.save(filename);
};
