const JD = ["Work with Art Director, Creative Director on art direction, design direction Join the team on corporate and brand branding design (logo design, brand guidelines, brand applications, ...",
    "Join the team on product design for esport tournaments (logo design, social banner design, ...)",
    "Join the team on design for animated videos, explainer videos, .."
]
const REQ = ["Knowledge of color theory, typography, layout",
    "Experience working in a team",
    "English document reading skills",
    "English communication skills are an advantage",
    "Knowledge of playing games is an advantage"
]
const BENEFITS = ["Always be creative and try new things.",
    "Work in a young, professional, friendly and dynamic environment. Regularly participate in picnics, parties, and general activities of the company.",
    "Bonuses are calculated for each project when participating in actual projects depending on the performance of the contribution (will be decided by the team leader)",
]
const JobInfo = () => {
    return (
        <div>
            <div style={{ width: "900" }} className="container mx-auto mt-10 bg-white border border-purple-500 rounded-lg shadow  dark:border-gray-700">
                <p className='mt-10 text-3xl font-bold text-center'>
                    Graphic Designer
                    <p>A company - Ho Chi Minh</p>
                </p>
                <div className='flex justify-center'>
                    <button type="button" className="text-white bg-purple-900 hover:bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-900 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-900 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
                        Ứng tuyển trên Shoca
                    </button>
                </div>
                <div className="mx-14 border-2 border-solid border-purple-400 my-5 ">

                </div>
                <div className="grid grid-cols-2 mx-14">
                    <div>
                        <div>
                            <p className="font-bold text-xl">JOB DESCRIPTION</p>
                            {Array.isArray(JD) && JD.map((item, index) => (
                                <div key={index} className="mr-2">
                                    <p className="mt-5 ">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="pt-5  font-bold">REQUIRED SKILL:   </p>
                            {Array.isArray(REQ) && REQ.map((item, index) => (
                                <div key={index} className="mr-2 ml-5">
                                    <p className="mt-5 ">{item}</p>
                                </div>
                            ))}

                        </div>
                        <div>
                            <p className="pt-5  font-bold">BENEFIT:   </p>
                            {Array.isArray(BENEFITS) && BENEFITS.map((item, index) => (
                                <div key={index} className="mr-2 ml-5">
                                    <p className="mt-5 ">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" justify-items-center">
                        <div className="w-96  p-5 bg-white border border-purple-500 rounded-lg shadow  dark:border-gray-700">
                            <div className="pb-5">
                                <div className="text-xs">JOB TYPE</div>
                                <div className="font-bold">Fulltime</div>
                            </div>
                            <div className="pb-5">
                                <div className="text-xs">LOCATION</div>
                                <div className="font-bold">Ho Chi Minh City</div>
                            </div>
                            <div className="pb-5">
                                <div className="text-xs">ONSITE REQUIRED</div>
                                <div className="font-bold">Onsite Required</div>
                            </div>
                            <div className="pb-5">
                                <div className="text-xs">JOB POST</div>
                                <div className="font-bold">November 8th, 2024</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobInfo
