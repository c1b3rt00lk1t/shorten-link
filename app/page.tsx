"use client";
import { Typography, Col, Input, Row, Button, Space, Form } from "antd";
import styles from "./page.module.css";
const { Compact } = Space;
const { Title } = Typography;
import { useState } from "react";
import { insertLinkToShorten } from "./lib/actions";
import { nanoid } from "nanoid";

const Home = () => {
  const baseUrl = process.env.BASE_URL || "";
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const handleLinkSubmit = async () => {
    const shortId = nanoid(8);
    setShortenedUrl(baseUrl + shortId);
    try {
      const result = await insertLinkToShorten(originalUrl, shortId);
      console.log("Rows inserted:", result.rowCount);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(originalUrl);
  };
  return (
    <>
      <Row justify="start" align="top" className={styles.firstHeightRow}>
        <Col>
          <Title level={2}>Beta version</Title>
          <Title level={3}>Try at your own risk ;)</Title>
        </Col>
      </Row>
      <Row justify="center" align="top" className={styles.secondHeightRow}>
        <Col span={8}>
          <Row justify="center" align="middle">
            <Compact style={{ width: "100%" }}>
              <Input
                addonBefore="https://"
                placeholder="Enter URL"
                className={styles.urlInput}
                size="large"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
              <Button size="large" type="primary" onClick={handleLinkSubmit}>
                Submit
              </Button>
            </Compact>
          </Row>
          {shortenedUrl && (
            <Typography.Paragraph>
              Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a>
            </Typography.Paragraph>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
