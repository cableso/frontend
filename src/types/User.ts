import type Project from './Project'

export default interface User {
    id: number
    email: string
    emailVerifiedAt?: Date
    projects?: Project[]
}
