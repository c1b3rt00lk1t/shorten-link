import { QRCode } from "antd";
import styles from "./QRCodeDownload.module.css";

type QRCodeDownloadProps = {
  originalUrl: string;
};

const QRCodeDownload = ({ originalUrl }: QRCodeDownloadProps) => {
  const downloadQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  return (
    <>
      <div id="myqrcode" className={styles.myqrcode} onClick={downloadQRCode}>
        <QRCode value={originalUrl || "www.example.com"} bgColor="white" />
      </div>
    </>
  );
};

export default QRCodeDownload;
