import  { useEffect, useState } from 'react'
import JobCard from '../../components/job-card'
import { getJobsService } from '../../services';
import { Link } from 'react-router-dom';
export interface JobCardProps {
  projectTitle: string;
  categories: string;
  budget: number;
  timeFrame: string;
  location: string;
  description: string;
  fileAttachment: string;
  personalInformation: string;
  userId: string;
  id: string;
  creationDate: string;
  createdBy: string | null;
  modificationDate: string | null;
  modifiedBy: string | null;
  deletionDate: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
}
const JobPage = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([])

  useEffect(() => {
    getJobs()
  }, [])

  const getJobs = async () => {
    const response = await getJobsService();
    if (response) {
      console.log("getJobs: ", response)
      setJobs(response);
    }
  }

  return (
    <div className='mx-5'>
      <div className='justify-items-center my-10 container mx-auto'>
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 gap-4 '>
          {
            jobs.map((item) => (
              <Link to={`/job/${item.id}`}>
                <JobCard
                  avatar={item.fileAttachment}
                  companyName='A Company'
                  location={item.location}
                  jobDescription={item.description}
                  jobName={item.projectTitle}
                  time={item.timeFrame}
                />
              </Link>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default JobPage
