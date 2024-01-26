import { AntdRegistry } from "@ant-design/nextjs-registry";
import styles from "./layout.module.css";
import { Col, Row } from "antd";
import NavBar from "./components/NavBar";
import { blue } from "@ant-design/colors";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.reset}>
      <body
        className={styles.mainBackground}
        style={{ backgroundColor: blue.at(2) }}
      >
        <AntdRegistry>
          <Row
            justify="center"
            align="middle"
            style={{ backgroundColor: blue.at(9) }}
          >
            <Col span={24}>
              <NavBar />
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col span={24}>{children}</Col>
          </Row>
        </AntdRegistry>
      </body>
    </html>
  );
}
