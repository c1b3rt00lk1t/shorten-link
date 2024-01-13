import { AntdRegistry } from "@ant-design/nextjs-registry";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.mainBackground1}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
