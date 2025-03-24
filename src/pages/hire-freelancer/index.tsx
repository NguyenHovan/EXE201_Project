import { useEffect, useState } from "react"
import { NewService } from "../customer/freelancer-service/add-new-service"
import { getServices } from "../../services/freelancer.services"
import { Link } from "react-router-dom"

const HireFreelancer = () => {
    const [services, setServices] = useState<NewService[]>([])

    useEffect(() => {
        getSerivcesByClient();
    }, [])

    const getSerivcesByClient = async () => {
        const response = await getServices()
        console.log("getSerivcesByClient: ", response)
        if (response) {
            setServices(response);
        }
    }

    return (
        <div className="mx-20 mb-10">
            <div className="container mx-auto mt-10 justify-items-center">
                <div className="mb-10 text-3xl font-semibold">
                    Hire Freelancer
                </div>
                <div className="grid grid-cols-4 gap-10">
                    {
                        services.map((item) => (
                            <Link to={`/hire-freelancer/${item.id}`}>
                                <div className="border border-solid">
                                    <img className='w-[250px] h-[200px] object-cover object-left-top' src={item.imageUrl} alt={item.servicename} />
                                    <div className="mx-2">
                                        <div className="mt-2">
                                            {item.servicename}
                                        </div>
                                        <div className="mt-2 text-purple-800">
                                            {item.price}
                                        </div>
                                        <div className="mt-2 truncate">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HireFreelancer
