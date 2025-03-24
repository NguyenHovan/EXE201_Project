interface Industry {
    id: string;
    name: string;
}

interface Company {
    id: string;
    name: string;
    address: string;
    description: string;
    logoCompany: string;
    backgroundCompany: string;
    website: string;
    industries: Industry[];
}

interface Recruiter {
    id: string;
    fullName: string;
    email: string;
    position: string;
    phone: string;
    avtUrl: string;
    backgroundUrl: string;
    company: Company;
}