import {
  CopyrightOutlined,
  FacebookOutlined,
  GithubOutlined,
  HomeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Flex, Row } from "antd";

function UserFooter() {
  return (
    <>
      <footer>
        <Flex gap={25} vertical>
          <Row className="logo">HUGE LOGO</Row>
          <Row className="footer-content">
            <Flex gap={50}>
              <Col span={6}>
                <h3>about us</h3>
                <p style={{ paddingRight: "100px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  id aliquet ex. Vivamus at ligula vel justo viverra efficitur
                  nec nec nisi. Sed viverra felis in arcu congue, at ultricies
                  felis fermentum. Sed placerat nec libero sed lacinia.
                </p>
              </Col>
              <Col span={5}>
                <h3>contact</h3>
                <Flex gap={5} vertical>
                  <p>
                    <HomeOutlined /> Hai Chau, Da Nang
                  </p>
                  <p>
                    <PhoneOutlined /> +84 905 000 000
                  </p>
                  <p>
                    <MailOutlined /> nvhoang2012002@business.com
                  </p>
                </Flex>
              </Col>
              <Col span={5}>
                <h3>service</h3>
                <Flex gap={5} vertical>
                  <p>Delivery information</p>
                  <p>Terms & Conditions</p>
                  <p>Privacy Policy</p>
                  <p>Help?</p>
                </Flex>
              </Col>
              <Col span={6}>
                <h3>social media</h3>

                <Flex gap={15}>
                  <a>
                    <GithubOutlined />
                  </a>
                  <a>
                    <FacebookOutlined />
                  </a>
                  <a>
                    <LinkedinOutlined />
                  </a>
                  <a>
                    <InstagramOutlined />
                  </a>
                </Flex>
              </Col>
            </Flex>
          </Row>
          <Row className="copy-right">
            <CopyrightOutlined /> Hoang Nguyen 2024 - Personal Project With
            AntDesign & MongoDB
          </Row>
        </Flex>
      </footer>
    </>
  );
}

export default UserFooter;
