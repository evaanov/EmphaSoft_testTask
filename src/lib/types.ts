export interface User { 
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    is_active: boolean,
    last_login: boolean | null,
    is_superuser: boolean 
    password?: string
}