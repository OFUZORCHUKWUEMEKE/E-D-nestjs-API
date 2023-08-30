import { IsString } from "class-validator"

export interface Ilogin {

    email: string

    password: string

}

export class Ireq {
    userId: string
    firstname: string
    email: string
}
