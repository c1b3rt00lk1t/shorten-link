import { useState } from "react";
import { Button, Space, Alert, Tooltip } from "antd";
import { useMatchMedia } from "../hooks/useMatchMedia";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CopyOutlined,
  ShareAltOutlined,
  GlobalOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";

type ShortURLOutputProps = {
  shortenedUrl: string;
  baseUrl: string;
  setOriginalUrl: (value: string) => void;
  setShortenedUrl: (value: string) => void;
};

const ShortURLOutput = ({
  shortenedUrl,
  baseUrl,
  setOriginalUrl,
  setShortenedUrl,
}: ShortURLOutputProps) => {
  const [copied, setCopied] = useState(false);

  // Use the useMediaQuery hook to check the screen size
  const isMobilePortrait = useMatchMedia(
    "(max-width: 767px) and (orientation: portrait)"
  );

  const handleOpenInNewTab = () => {
    window.open(shortenedUrl, "_blank");
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Shortened Link",
          text: "Check out this shortened link:",
          url: `https://${baseUrl}${shortenedUrl}`,
        });
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    } else {
      console.warn("Web Share API not supported. ");
    }
  };

  const handleRemoveLink = () => {
    setOriginalUrl("");
    setShortenedUrl("");
  };

  return (
    <>
      <Alert
        message={
          isMobilePortrait
            ? shortenedUrl.split("/")[1]
            : "https://" + baseUrl + shortenedUrl
        }
        type="success"
        showIcon
        action={
          <Space direction="horizontal">
            <Tooltip placement="bottom" title="Copy">
              <CopyToClipboard
                text={"https://" + baseUrl + shortenedUrl}
                onCopy={() => setCopied(true)}
              >
                <Button
                  aria-label="Copy to clipboard"
                  size="small"
                  shape="circle"
                  icon={<CopyOutlined />}
                />
              </CopyToClipboard>
            </Tooltip>
            <Tooltip placement="bottom" title="Share">
              <Button
                aria-label="Share link"
                size="small"
                shape="circle"
                icon={<ShareAltOutlined />}
                onClick={handleShareLink}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Visit">
              <Button
                aria-label="Visit link"
                size="small"
                shape="circle"
                icon={<GlobalOutlined />}
                onClick={handleOpenInNewTab}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Clear" color="red">
              <Button
                aria-label="Clear link"
                size="small"
                shape="circle"
                icon={<ClearOutlined />}
                onClick={handleRemoveLink}
              />
            </Tooltip>
          </Space>
        }
      />
      <p style={{ color: blue.at(8), textAlign: "center" }}>
        short links generated in this web will be active for one month and then
        removed{" "}
      </p>
    </>
  );
};

export default ShortURLOutput;
