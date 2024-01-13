"use client";
import {
  Typography,
  Col,
  Input,
  Row,
  Button,
  Space,
  Alert,
  Tooltip,
} from "antd";
import { useMatchMedia } from "./hooks/useMatchMedia";

import styles from "./page.module.css";
const { Compact } = Space;
const { Title } = Typography;
import { useState } from "react";
import { insertLinkToShorten } from "./lib/actions";
import { nanoid } from "nanoid";
import {
  CopyOutlined,
  ShareAltOutlined,
  GlobalOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLinkSubmit = async () => {
    const shortId = nanoid(8);

    try {
      const result = await insertLinkToShorten(originalUrl, shortId);
      if (result.rowCount === 0) throw new Error("No rows inserted");
      setShortenedUrl("/" + shortId);
      setCopied(false);
      console.log("Rows inserted:", result.rowCount);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(originalUrl);
  };

  const handleOpenInNewTab = () => {
    window.open(shortenedUrl, "_blank");
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Shortened Link",
          text: "Check out this shortened link:",
          url: `${baseUrl}${shortenedUrl}`,
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
        <Col>
          <Title level={2}>Shorten your links</Title>
          <Title level={4} type="secondary">
            Beta version. Try at your own risk ;)
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="top" className={styles.secondHeightRow}>
        <Col xxl={8} xl={10} lg={12} md={18} sm={18} xs={20}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row justify="center" align="middle">
              <Compact style={{ width: "100%" }}>
                <Input
                  addonBefore="https://"
                  placeholder="Enter URL"
                  className={styles.urlInput}
                  size="large"
                  value={originalUrl}
                  onChange={(e) => {
                    setOriginalUrl(
                      e.target.value
                        .replace("https://", "")
                        .replace("http://", "")
                    );
                    setShortenedUrl("");
                  }}
                />
                <Button size="large" type="primary" onClick={handleLinkSubmit}>
                  Shorten
                </Button>
              </Compact>
            </Row>
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
                          size="small"
                          shape="circle"
                          icon={<CopyOutlined />}
                        />
                      </CopyToClipboard>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Share">
                      <Button
                        size="small"
                        shape="circle"
                        icon={<ShareAltOutlined />}
                        onClick={handleShareLink}
                      />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Visit">
                      <Button
                        size="small"
                        shape="circle"
                        icon={<GlobalOutlined />}
                        onClick={handleOpenInNewTab}
                      />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Clear" color="red">
                      <Button
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
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Home;
