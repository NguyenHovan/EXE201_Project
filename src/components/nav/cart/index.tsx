import { Col, Image, Row } from 'antd';
import { currencyUnit, priceDiscounted } from '../../../consts';
import { deleteCartService } from '../../../services/cart.services';
import { Checkbox } from 'antd';
interface iCustomerCart {
    image: string;
    name: string;
    price: number;
    discount: number;
    getCarts: () => void;
    id: string;
    isCheckAll: boolean;
    selectedCarts: string[];
    setSelectedCarts: (selected: string[]) => void;
}

const CustomerCart = ({
    selectedCarts,
    setSelectedCarts,
    image,
    name,
    price,
    discount,
    getCarts,
    id,
}: iCustomerCart) => {

    const handleRemoveItemFromCart = async (id: string) => {
        const response = await deleteCartService(id);
        if (response) {
            getCarts();
        }
    };

    const updateSelectedCarts = (id: string) => {
        console.log("selectedCarts: ", selectedCarts)
        if (selectedCarts.includes(id)) {
            setSelectedCarts(selectedCarts.filter(item => item !== id)); // Xóa item
        } else {
            setSelectedCarts([...selectedCarts, id]); // Thêm item
        }
    };

    return (
        <div>
            <Row>
                <Col span={8}>
                    <Row>
                        <Col span={6} className='flex items-center'>
                            <Checkbox
                                checked={selectedCarts.includes(id)}
                                onChange={() => updateSelectedCarts(id)}
                            />
                        </Col>
                        <Col span={18}>
                            <Image src={image} />
                        </Col>
                    </Row>
                </Col>
                <Col className='mb-2' span={16}>
                    <p className='font-bold'>{name}</p>
                    <p>{priceDiscounted(price, discount)} {currencyUnit}</p>
                    <p onClick={() => handleRemoveItemFromCart(id)} className='text-red-500 cursor-pointer'>Remove</p>
                </Col>
            </Row>
        </div>
    );
};


export default CustomerCart;
