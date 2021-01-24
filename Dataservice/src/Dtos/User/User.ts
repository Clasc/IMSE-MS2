export interface User {
    user_id?: number;
    username: string;
    first_name: string;
    last_name: string;
    login_token?: string;
    password: string;
    is_admin?: boolean;
    birthday: string;
}