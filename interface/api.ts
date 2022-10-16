
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
    default?: boolean //is it default pickup address... for now
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
    preferred?: boolean
}

export type OrderstatusT = "Task Posted Pickup" |
    "Task Posted Dropoff" |
    "Picked Up From Cleaner" |
    "Task Canceled" |
    "Pickup Driver On the Way" |
    "Dropoff Driver On the Way" |
    "Pickup Driver approaching" |
    "Dropoff Driver approaching" |
    "Clothes to Cleaner" |
    "Clothes Awaiting Clean" |
    "Clothes Ready" |
    "Driver To Cleaner" |
    "Clothes to Home" |
    "Complete"

export const orderStatuses = [
    "Task Posted Pickup",
    "Task Posted Dropoff",
    "Picked Up From Cleaner",
    "Task Canceled",
    "Pickup Driver On the Way",
    "Dropoff Driver On the Way",
    "Pickup Driver approaching",
    "Dropoff Driver approaching",
    "Clothes to Cleaner",
    "Clothes Awaiting Clean",
    "Clothes Ready",
    "Driver To Cleaner",
    "Clothes to Home",
    "Complete"
]

export interface OrderI {
    _id: string
    client: string // client
    origin?: string // client pickup and dropoff
    dropOffAddress?: string
    cleanerAddress: string
    driverLocation?: PointI
    // locationSession?: string //long and lat of clothes location
    pickUpDriver?: {
        '_id': string
        user: {
            firstName: string
            lastName: string
            phoneNumber: string
        }
    } // driver
    dropOffDriver?: string
    pickUpCostId?: string // cost for drive to Cleaners
    dropOffCostId?: string // cost for drive from Cleaner to origin
    cleanCostId?: string // total cost for cleaners
    cleaner: string
    orderClosed: boolean //is order accessible, useable, and still active
    clientPickupTime?: number
    cleanerDropOffTime?: number
    cleanFinishTime?: number
    cleanerPickupTime?: number
    clientDropoffTime?: number
    dropoffPostedTime?: number
    toCleanerDistance: number // in miles
    fromCleanerDistance: number //in miles
    created: number
    status: OrderstatusT
    orderFee: number
    orderFeePaid: boolean
    userCard: string
    isDropOff?: boolean //is order a drop off request
    desiredServices?: {
        quantity: number,
        service: string //stored prices of each service and change to string
    }[]
    createdBy: {
        userType: string
        userTypeId: string
    }
    serviceCost?: number
    orderTotal?: number
}

export interface UserI {
    _id?: any
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    dob: number
    address: string
    pickUpAddresses: string[]
    cards: string[]
    created: number
    refreshToken?: string
    orders: string[]
    preferredCleaner?: string 
    pickupAddress?: string
    preferredCardId: string
}

export interface DriverI {
    _id: string
    user: Pick<UserI, 
        'firstName' |
        'lastName' |
        'dob' |
        'email' |
        'phoneNumber'
    >
    lastFour?: number
    passedBackgroundCheck: boolean
    bankRoutingNumber?: string
    bankAccountNumber?: string
    orders: string[]
    totalPayout?: number //in cents
    activeOrders: string[]
    location: PointI
}

export interface UnitI {
    client?: string
    isActive?: boolean
    address: string
}

export interface AptBuildingI {
    //*building addresses cannot use street_address_line_2
    address: string
    units: {
        [unit: string]: UnitI
    }
}

export interface AptI {
    name: string,
    address: AddressI
    email: string
    buildings: {
        [building: string]: AptBuildingI
    }
    createdBy: {
        userType: 'manager'
        userTypeId: string
    },
    paidFor: boolean
}