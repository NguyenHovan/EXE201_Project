import React from 'react'
import JobCard from '../../components/job-card'

const JobPage = () => {
  return (
    <div className='mt-10 container mx-auto'>
      <div className='grid grid-cols-2'>
            <JobCard
            avatar='data:image/jpeg;base64,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'
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
            <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
             <JobCard
            avatar=''
            companyName='A Company'
            location='Ho Chi Minh City'
            jobDescription='Seeking a full-time graphic designer of marketing design.'
            jobName='Graphic Designer'
            time='3'
            />
      </div>
    </div>
  )
}

export default JobPage
