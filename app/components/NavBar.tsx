"use client";
import { Typography, Col, Row, Space } from "antd";
import { blue } from "@ant-design/colors";
import styles from "./NavBar.module.css";
import { ForwardOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

const { Title } = Typography;
const NavBar = () => {
  return (
    <header style={{ backgroundColor: blue[12] }}>
      <Row justify="center" align="middle">
        <Col>
          <Row justify="center" align="middle">
            <ForwardOutlined
              style={{ color: blue.at(1) }}
              className={styles.iconHeader}
            />
          </Row>
        </Col>
        <Col>
          <Title
            level={1}
            style={{ color: blue[4] }}
            className={styles.NavBarTitle}
          >
            Shorten links
          </Title>

          <Paragraph style={{ color: blue[1] }}>
            No adds, no tracking, no cookies, no bullshit
          </Paragraph>
        </Col>
      </Row>
    </header>
  );
};

export default NavBar;
