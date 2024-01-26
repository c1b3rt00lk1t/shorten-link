"use client";
import { Typography, Col, Row, Button, Space, Alert, Tooltip } from "antd";
import { useMatchMedia } from "./hooks/useMatchMedia";

import styles from "./page.module.css";

const { Title } = Typography;
import { useState } from "react";
import {
  CopyOutlined,
  ShareAltOutlined,
  GlobalOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FormURL from "./components/FormURL";
import QRCodeDownload from "./components/QRCodeDownload";

const Home = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

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

  // Use the useMediaQuery hook to check the screen size
  const isMobilePortrait = useMatchMedia(
    "(max-width: 767px) and (orientation: portrait)"
  );

  return (
    <>
      <Row justify="start" align="top" className={styles.firstHeightRow}>
        <Col span={1}></Col>
        <Col>
          <Title level={1}>Let&#39;s share links ;)</Title>
          <Title level={5} type="secondary">
            Submit to <em>shorten</em> or click the generated QR to{" "}
            <em>download</em>
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="top" className={styles.secondHeightRow}>
        <Col>
          <QRCodeDownload originalUrl={originalUrl} />
        </Col>
      </Row>
      <Row justify="center" align="top" className={styles.thirdHeightRow}>
        <Col xxl={8} xl={10} lg={12} md={18} sm={18} xs={20}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row justify="center" align="middle">
              <Col span={24}>
                <FormURL
                  originalUrl={originalUrl}
                  setOriginalUrl={setOriginalUrl}
                  setShortenedUrl={setShortenedUrl}
                  setCopied={setCopied}
                />
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col span={24}>
                {shortenedUrl && (
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
                            onClick={() => {
                              setOriginalUrl("");
                              setShortenedUrl("");
                            }}
                          />
                        </Tooltip>
                      </Space>
                    }
                  />
                )}
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Home;
