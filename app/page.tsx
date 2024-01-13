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
  Form,
  message,
  QRCode,
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
  LogoutOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkSubmit = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
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
      <Row justify="start" align="top" className={styles.firstHeightRow}>
        <Col span={1}></Col>
        <Col>
          <Title level={1}>Let&#39;s share links ;)</Title>
          <Title level={5} type="secondary">
            Submit to <em>shorten</em> your link or click the generated QR to{" "}
            <em>download</em> it
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="top" className={styles.secondHeightRow}>
        <Col>
          <div
            id="myqrcode"
            className={styles.myqrcode}
            onClick={downloadQRCode}
          >
            <QRCode value={originalUrl || "-"} bgColor="white" />
          </div>
        </Col>
      </Row>
      <Row justify="center" align="top" className={styles.thirdHeightRow}>
        <Col xxl={8} xl={10} lg={12} md={18} sm={18} xs={20}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row justify="center" align="middle">
              <Col span={24}>
                <Form
                  layout="vertical"
                  onFinish={handleLinkSubmit}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="url"
                    rules={[
                      { required: true },
                      { type: "url", warningOnly: true },
                      { type: "string", min: 6 },
                    ]}
                  >
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
                      />{" "}
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        icon={
                          isLoading ? <LoadingOutlined /> : <LogoutOutlined />
                        }
                      />
                    </Compact>
                  </Form.Item>
                </Form>
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
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Home;
