"use client";
import Link from "next/link";
import { FrownOutlined } from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import styles from "./not-found.module.css";
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

export default function NotFound() {
  return (
    <html lang="en">
      <body className={styles.mainBackground}>
        <AntdRegistry>
          <Row justify="center" align="middle" style={{ minHeight: "90vh" }}>
            <Col>
              <Row justify="center" align="top">
                <Col>
                  <FrownOutlined
                    style={{ fontSize: "32px", color: "#003eb3" }}
                  />
                </Col>
              </Row>
              <Row justify="center" align="top">
                <Col className={styles.textCenter}>
                  <Typography.Title level={2}>404 Not Found</Typography.Title>
                  <Typography.Paragraph type="secondary">
                    Could not find the requested URL.
                  </Typography.Paragraph>
                  <Button type="primary">
                    <Link href="/">Generate a short URL</Link>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </AntdRegistry>
      </body>
    </html>
  );
}
