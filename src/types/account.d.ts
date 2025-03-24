interface Account {
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: string;
    address: string;
    avatarUrl: string | null;
    email: string;
    phoneNumber: string;
    emailConfirmed: boolean;
    personalWebsiteUrl: string | null;
    portfolioUrl: string | null;
    role: number;
    id: string;
    creationDate: string;
    createdBy: string | null;
    modificationDate: string | null;
    modifiedBy: string | null;
    deletionDate: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
  }

interface filterAccount{
    keyword: string| "",
    gender: number | "",
    role: number | "",
    isDeleted: boolean | "",
}
  