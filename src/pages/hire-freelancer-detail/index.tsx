
import { Typography, Image } from 'antd';
import { priceUnit } from '../../consts/variable';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getService } from '../../services/freelancer.services';
import { NewService } from '../customer/freelancer-service/add-new-service';
const { Title, Paragraph } = Typography;

const HireFreelancerDetail = () => {
    const [service, setService] = useState<NewService>();
    const { id } = useParams();

    useEffect(() => {
        getServicebyClient();
    }, [id]);

    const getServicebyClient = async () => {
        if (id) {
            const response = await getService(id);
            setService(response);
        }
    };

    return (
        <div className='container mx-auto justify-items-center mt-10 mb-10'>
            <div className='w-[900px] grid grid-cols-2 gap-10'>
                <div>
                    <Image src={service?.imageUrl}>
                    </Image>
                </div>
                <div>
                    <Title level={3}>{service?.servicename}</Title>
                    <Paragraph>{service?.description}</Paragraph>
                    <Title level={4}>Giá: {priceUnit(service?.price || 0)}</Title>
                    <Paragraph>
                        <strong>Thời gian giao hàng:</strong> {service?.deliveryTime} ngày
                    </Paragraph>
                    <Paragraph>
                        <strong>Số lượng ý tưởng:</strong> {service?.numConcepts}
                    </Paragraph>
                    <Paragraph>
                        <strong>Số lần chỉnh sửa:</strong> {service?.numRevisions}
                    </Paragraph>
                    <Paragraph>
                        <strong>Thông tin liên hệ:</strong> {service?.contactInformation}
                    </Paragraph>

                </div>
            </div>
        </div>
    );
};

export default HireFreelancerDetail;