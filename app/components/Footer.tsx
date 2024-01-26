import styles from "./Footer.module.css";
import { blue } from "@ant-design/colors";
import { GithubOutlined } from "@ant-design/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.Footer} style={{ backgroundColor: blue.at(9) }}>
      <Link href="https://github.com/c1b3rt00lk1t/shorten-link" target="_blank">
        <GithubOutlined style={{ fontSize: "1rem" }} />{" "}
        <span>by c1b3rt00lk1t</span>
      </Link>
    </div>
  );
};

export default Footer;
