import type { User } from "./user.type";

export interface todo{
    id: number,
    title: string,
    description: string,
    user: User
}