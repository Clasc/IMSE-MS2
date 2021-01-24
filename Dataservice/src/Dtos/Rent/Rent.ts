export interface Rent {
    rent_id?: number;
    extended?: boolean;
    start_date?: string | Date;
    expiration_date?: string | Date;
    user_id?: number;
}