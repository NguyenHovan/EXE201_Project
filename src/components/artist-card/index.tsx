import React from 'react';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import BorderText from '../border-text';

const { Meta } = Card;
const ArtistCard: React.FC = () => (
    // <div className="relative max-w-md mx-auto p-4">
    //     <img 
    //         className="rounded-2xl w-full object-cover" 
    //         src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" 
    //         alt="Artist" 
    //     />
    //     <div className="absolute bottom-8 left-4">
    //         <Title className="text-white font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight">
    //             Henry
    //         </Title>
    //         <Title className="text-white text-sm sm:text-base lg:text-lg leading-none">
    //             Artist
    //         </Title>
    //     </div>
    //     <div className="absolute bottom-1 left-4 flex flex-wrap gap-2">
    //         <BorderText text="Character Design" />
    //         <BorderText text="2D" />
    //         <BorderText text="3D" />
    //     </div>
    // </div>
    <Card
        hoverable
        style={{ width: 280 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <Meta title=
            <>
                <Title level={3}>Henry</Title>
                <>Artist</>
            </>
            description=
            <div className='flex'>
                <BorderText text='character design' />
                <BorderText text='2D' />
                <BorderText text='3D' />
            </div> />
    </Card>
);

export default ArtistCard;
