export interface IProduct {
    id: number
    slug: string
    name: string
    description: string
    price: number
    images: string[]
    tags: string[]
    createdAt?: string
    updatedAt?: string
}