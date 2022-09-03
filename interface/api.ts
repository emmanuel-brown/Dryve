
export type coordinatesT = [ 
    number, //latitude 
    number //longitude
]

export interface PointI {
    type: 'Point'
    coordinates: coordinatesT
}

export interface AddressI {
    _id: string
    name?: string
    street_address_line_1: string
    street_address_line_2?: string
    city: string
    state: string
    zipcode: string
    country: string
    formatted?: string
    placeId?: string
    location: PointI
}

export interface ServiceI {
    _id: string
    price: number
    title: string
    description?: string
}

export type QuantityT = {
    quantity: number
}

export type ServiceRequestsI = ServiceI & {
    quantity: number
}

export interface CleanerI {
    _id: string
    name: string
    email: string
    phoneNumber: string
    website?: string
    address: AddressI
    services: ServiceI[]
}