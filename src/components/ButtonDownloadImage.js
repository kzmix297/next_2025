import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function DownloadImages({ imageUrls }) {
  console.log("imageurl", imageUrls);
  const downloadImagesToZip = async () => {
    const zip = new JSZip();

    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to download ${url}: ${response.statusText}`);
          continue;
        }

        const blob = await response.blob();
        const fileExtension = jpeg; // Handle URL with query params
        const fileName = `image_${i + 1}.${fileExtension}`;

        zip.file(fileName, blob);
        console.log(`Added ${url} to ZIP`);
      } catch (error) {
        console.error(`Error downloading ${url}:`, error);
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
      console.log("ZIP file downloaded");
    });
  };

  return (
    <div>
      <button
        onClick={downloadImagesToZip}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Images as ZIP
      </button>
    </div>
  );
}
