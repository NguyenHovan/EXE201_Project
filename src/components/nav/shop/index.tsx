
import { Dropdown, MenuProps, Space } from "antd";
import { useEffect, useState } from "react";
import {  getCategoriesByClient } from "../../../services";
import { Category } from "../../../models";
import { useNavigate } from "react-router-dom";

const ShopDropDown = () => {
    const navigate= useNavigate();
    const [cates, setCates] = useState<Category[]>([])

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p>KIT</p>
            ),
            onClick:()=>{
                navigate("/kit-shop")
            }
        },
        {
            key: '2',
            label: (
                <p>LAB</p>
            ),
            onClick:()=>{
                navigate("/lab-shop")
            }
        },
        {
            key: '3',
            label: (
                <p>Combo</p>
            ),
            onClick:()=>{
                navigate("/combo-shop")
            }
        }
    ];

    useEffect(()=>{
        getCategoriesFromHome();
    },[])

    const getCategoriesFromHome = async()=>{
        const res = await getCategoriesByClient("", 1, 100)
        if(res){
            setCates(res.data.pageData)
        }
    }

    return (
        <div className="w-full">
            <Dropdown  className="w-full" menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space className="text-black">
                        Shop
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default ShopDropDown;
