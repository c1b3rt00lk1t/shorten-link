import { useState, createContext, useMemo } from "react";
import { Input, Button, Form, message, Space } from "antd";
const { Compact } = Space;
import { nanoid } from "nanoid";
import { insertLinkToShorten } from "../lib/actions";
import { LogoutOutlined, LoadingOutlined } from "@ant-design/icons";

// imports for the notification
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";
type NotificationPlacement = NotificationArgsProps["placement"];
const Context = createContext({ name: "Default" });

type FormURLProps = {
  originalUrl: string;
  setOriginalUrl: (value: string) => void;
  setShortenedUrl: (value: string) => void;
};

const FormURL = ({
  originalUrl,
  setOriginalUrl,
  setShortenedUrl,
}: FormURLProps) => {
  // Notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Your short link has been generated!`,
      description: (
        <Context.Consumer>
          {() => `short links generated in this web will be active for one month and then
        removed`}
        </Context.Consumer>
      ),
      style: {
        width: 600,
      },
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const [isLoading, setIsLoading] = useState(false);

  const handleLinkSubmit = async () => {
    setIsLoading(true);
    const shortId = nanoid(8);
    try {
      const result = await insertLinkToShorten(originalUrl, shortId);
      if (result.rowCount === 1) {
        setShortenedUrl("/" + shortId);
        openNotification("bottomRight");
      }
    } catch (error) {
      message.error("Database connection failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={handleLinkSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="url"
          // validates that the url is valid but does not require that starts with www
          // if the url pattern is not valid, it shows an error message asking for a valid url
          // if no url is provided, an error message is shown saying 'url is required'
          rules={[
            { required: true },
            {
              pattern:
                /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([/?].*)?$/,
              message: "Please enter a valid URL",
            },
            { type: "string", min: 6 },
          ]}
        >
          <Compact style={{ width: "100%" }}>
            <Input
              addonBefore="https://"
              placeholder="www.example.com"
              size="large"
              value={originalUrl}
              onChange={(e) => {
                setOriginalUrl(
                  e.target.value.replace("https://", "").replace("http://", "")
                );
                setShortenedUrl("");
              }}
            />{" "}
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              icon={isLoading ? <LoadingOutlined /> : <LogoutOutlined />}
            />
          </Compact>
        </Form.Item>
      </Form>
    </Context.Provider>
  );
};

export default FormURL;
