import { AntdRegistry } from "@ant-design/nextjs-registry";
import styles from "./layout.module.css";
import { Col, Row } from "antd";
import NavBar from "./components/NavBar";
import { blue } from "@ant-design/colors";
import Footer from "./components/Footer";

// Added types for Next.js metadata and viewport
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// Metadata for PWA
const APP_NAME = "Shorten links PWA";
const APP_DEFAULT_TITLE = "Shorten links";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "PWA to shorten links and generate free QR codes";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
          <Row justify="center" align="middle">
            <Col span={24}>
              <Footer />
            </Col>
          </Row>
        </AntdRegistry>
      </body>
    </html>
  );
}
