import { useEffect, useState } from "react";
import { getAtWorkService } from "../../services/atworrk.services"
import { AtWork } from "../home";
import { IMG } from "../../consts/variable";
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
        <div className="mt-10 container mx-auto">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8">
                    <img src={atwork?.fileUrl === "" ? atwork.fileUrl : IMG.IMG_TEMP} alt="" />
                </div>
                <div className="col-span-4">
                    <div className="text-3xl font-semibold">
                        {atwork?.title}
                    </div>
                    <div className="mt-5">
                        {atwork?.price}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AtWorkDetail
