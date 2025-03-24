import { useEffect, useState } from "react";
import { getAtWorkService } from "../../services/atworrk.services"
import { AtWork } from "../home";
import { IMG, priceUnit } from "../../consts/variable";
import { useParams } from "react-router-dom";

const AtWorkDetail = () => {

    const { id } = useParams();
    const [atwork, setAtWork] = useState<AtWork>();

    useEffect(() => {
        if (id) {
            console.log("id: ", id)
            getAtWorkDetail();
        }
    }, [id])

    const getAtWorkDetail = async () => {
        const response = await getAtWorkService(id + "");
        if (response) {
            setAtWork(response);
        }
    }

    return (
        <div className="my-10 container mx-auto">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-7 justify-items-center">
                    <div>
                        <img src={atwork?.thumbnailUrl === "" ? IMG.IMG_TEMP : atwork?.thumbnailUrl} alt="" />
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="text-3xl font-semibold">
                        {atwork?.title}
                    </div>
                    <div className="mt-5">
                        {atwork?.description}
                    </div>
                    <div className="mt-5">
                        {priceUnit(atwork?.price ||0)}
                    </div>
                </div>
            </div>
            <div className="justify-items-center">
                <div className="grid grid-cols-3 gap-10">
                    {
                        atwork?.images.map((item, index) => (
                            <div key={index} className=" mt-10 ">
                                <img className="w-[350px] h-[600px]" src={item} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AtWorkDetail
