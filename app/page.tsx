"use client";
import { Typography, Col, Input, Row, Button, Space } from "antd";
import styles from "./page.module.css";
const { Compact } = Space;
const { Title } = Typography;

const Home = () => {
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
              />
              <Button size="large" type="primary">
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
