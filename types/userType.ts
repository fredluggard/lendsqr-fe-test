export interface BankDetails {
  bankName: string;
  acctNumber: number;
  acctBalance: string;
}

export interface Guarantor {
  fullName: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface User {
  username: string;
  email: string;
  phone: string;
  twitter: string;
  facebook: string;
  instagram: string;
  organization: string;
  gender: string;
  bvn: number;
  code: string;
  userTier: number;
  marital_status: string;
  children: string | number;
  type_of_residence: string;
  education: string;
  bankDetails: BankDetails;
  employment_status: string;
  sector_of_employment: string;
  duration_of_employment: string;
  office_email: string;
  monthly_income: string;
  loan_repayment: string;
  guarantor1: Guarantor;
  guarantor2: Guarantor;
  dateJoined: string;
}

export interface UserRecord {
  id: string;
  index: number;
  status: string;
  user: User;
}
