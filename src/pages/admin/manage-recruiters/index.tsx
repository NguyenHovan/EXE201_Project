import { useEffect, useState } from 'react'
import { adminGetRecruiters } from '../../../services/admin.services';
import { Table } from 'antd';

const AdminManageRecruiter = () => {
    const [recruiters, setRecruiters] = useState<Recruiter[]>([]);

    useEffect(() => {
        getRecruiters()
    }, [])

    const getRecruiters = async () => {
        const response = await adminGetRecruiters()
        console.log("response: ", response)
        if (response) {
            setRecruiters(response)
        }
    }

    const columns = [
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            // render: (firstName: string, record: Account) => (
            //     <div className='text-blue-500 cursor-pointer' onClick={() => showLoading(record.id)}>
            //         {firstName}
            //     </div>
            // )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "15%"
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Background Url',
            dataIndex: 'backgroundUrl',
            key: 'backgroundUrl',
        },
        {
            title: 'Company name',
            dataIndex: 'company',
            key: 'company',
            render: (company: Company) => (
                <div className='text-blue-500'>
                    {company.name}
                </div>
            )
        },
    ];

    return (
        <div>
            <Table dataSource={recruiters} columns={columns} />
        </div>
    )
}

export default AdminManageRecruiter