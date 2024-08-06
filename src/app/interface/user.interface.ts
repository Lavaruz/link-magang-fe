export interface UserInterface{
    id: string,
    email: string,
    role: number,
    profile_picture: string | null,
    firstname:string,
    lastname: string | null,
    summary: string,
    mobile: string | null,
    sex: string | null,
    current_status: string,
    profile_viewers: number,
    active_search: boolean,
    domicile: string | null,
    date_of_birth: string | null
}