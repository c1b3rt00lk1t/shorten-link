"use client";
import { Typography, Col, Input, Row, Button, Space, Form } from "antd";
import styles from "./page.module.css";
const { Compact } = Space;
const { Title } = Typography;
import { useState } from "react";
import { insertLinkToShorten } from "./lib/actions";
import { nanoid } from "nanoid";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const handleLinkSubmit = async () => {
    const shortId = nanoid(8);
    try {
      await insertLinkToShorten(originalUrl, shortId);
    } catch (e) {
      console.log(e);
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
        </Col>
      </Row>
    </>
  );
};

export default Home;
