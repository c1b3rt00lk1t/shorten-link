"use client";
import { Typography, Col, Row, Space } from "antd";

import styles from "./page.module.css";

const { Title } = Typography;
import { useState } from "react";
import FormURL from "./components/FormURL";
import QRCodeDownload from "./components/QRCodeDownload";
import ShortURLOutput from "./components/ShortURLOutput";

const Home = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

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
                />
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col span={24}>
                {shortenedUrl && (
                  <ShortURLOutput
                    shortenedUrl={shortenedUrl}
                    baseUrl={baseUrl}
                    setOriginalUrl={setOriginalUrl}
                    setShortenedUrl={setShortenedUrl}
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
