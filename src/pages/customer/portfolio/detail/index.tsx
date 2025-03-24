import { useEffect, useState } from "react";
import { Portfolio } from "../manage-portfolio";
import { getPortfolio } from "../../../../services/portfolio.services";
import { useParams } from "react-router-dom";

const PortfolioDetail = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState<Portfolio>();

    useEffect(() => {
        if (id) {
            getPortfolioFromCustomer();
        }
    }, [id]);

    const getPortfolioFromCustomer = async () => {
        if (id) {
            const response = await getPortfolio(id);
            if (response) {
                console.log("res: ", response);
                setPortfolio(response);
            }
        }
    };

    return (
        <div className="w-full min-h-screen">
            <div className="mx-20">
                <div className="container mx-auto py-10">
                    {portfolio && (
                        <>
                            {/* Hình ảnh bìa */}
                            <div className="mb-10">
                                <img
                                    className="w-full h-[400px] object-cover"
                                    src={portfolio.coverImageUrl}
                                    alt={portfolio.title}
                                />
                            </div>

                            {/* Tiêu đề Portfolio */}
                            <h1 className="text-3xl font-bold mb-4">{portfolio.title}</h1>

                            {/* Mô tả */}
                            <p className="text-lg mb-4">{portfolio.description}</p>

                            {/* Kỹ năng và Kinh nghiệm */}
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Kỹ năng:</h2>
                                <p>{portfolio.skills}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Kinh nghiệm:</h2>
                                <p>{portfolio.experience}</p>
                            </div>

                            {/* Liên hệ */}
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Liên hệ:</h2>
                                <a
                                    href={portfolio.contactUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    {portfolio.contactUrl}
                                </a>
                            </div>

                            {/* Hình ảnh Portfolio */}
                            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 mt-10 gap-10">
                                {portfolio.imageUrls.map((item, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                        <img
                                            className="w-full h-[300px] object-cover"
                                            src={item}
                                            alt={`Hình ảnh Portfolio ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetail;