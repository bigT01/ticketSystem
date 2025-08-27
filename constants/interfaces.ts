export interface ICompany {
    id: string,
    name : string,
    customer: string,
    projectsCount: number,
    image_path?: string,
    projects?: IProject[]
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
  projectStatConnection?: boolean
}

export interface IStaff {
  id: string;
  name: string;
  image: string;
}

export interface IDeveloper {
  id: number;
  compensation: number;
  staff: IStaff;
}

export interface ProjectDetail {
  id: number;
  project_id: string;
  estimate_end_date: string;
  end_date: string | null;
  start_date: string;
}

export interface IProjectDevelopers {
  id: string;
  name: string;
  developers: IDeveloper[];
}

export interface IColumn<T> {
  header: string; // Заголовок колонки
  accessor?: keyof T | string; // Ключ для доступа к данным.
                                // 'keyof T' делает его безопасным для типов.
                                // 'string' добавляется для вложенных свойств (например, 'company.name')
  cellRenderer?: (row: T) => React.ReactNode; // Функция для кастомного рендеринга ячейки
}

// Интерфейс для пропсов компонента таблицы
export interface IDefaultTableProps<T> {
  data: T[]; // Массив данных
  columns: IColumn<T>[]; // Массив конфигураций колонок
}