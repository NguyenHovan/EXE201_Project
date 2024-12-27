import { EyeOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

interface iDesignCard {
    title: string;
    image: string;
    view?: number;
    likeNumber?: number;
    _id: string
}

const DesignCard = ({ title, image, _id }: iDesignCard) => {
    return (
        <Link to={`/design/${_id}`}>
            <Card
                hoverable
                className="p-3 mb-3"
                style={{ width: 300 }}
                cover={
                    <div style={{ height: 200, overflow: 'hidden' }}>
                        <img
                            alt="example"
                            src={image}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                }
            >
                <Meta className="" title={<div className="text-red-500 truncate">{title}</div>}
                    description=
                    {<div className="flex justify-between">
                        <Row>
                            <Col> <UserOutlined className="text-black" /></Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Row gutter={3}>
                                    <Col span={10}><EyeOutlined className="text-black" /> </Col>
                                    <Col span={14}>1,7k</Col>
                                </Row>
                            </Col>
                            <Col className="" span={12}>
                                <Row gutter={3}>
                                    <Col span={10}><HeartOutlined className="text-black" /> </Col>
                                    <Col span={14}>128</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>}
                />
            </Card>
        </Link>
    );
};

export default DesignCard;
