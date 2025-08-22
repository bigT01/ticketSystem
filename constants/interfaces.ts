export interface ICompany {
    id: string,
    name : string,
    customer: string,
    projectsCount: number,
    isLocal?: boolean
}

export interface IProject {
  id: string;
  name: string;
  company_id: string;
  created_at: string;
  price: number;
  isLocal?: boolean
  company?: ICompany
}