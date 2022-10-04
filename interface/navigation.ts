import { ServiceI } from "./api"
import { CleanerInfoI } from "./screens"

export type RootStackParamList = {
    login: undefined
    signup: undefined
    creating: undefined
    home: undefined
}

export type MainButtonParams = {
    mapView: undefined
    orders: undefined
    cleaners: undefined
    account: undefined
}

export type MapStackParamsList = {
    apartment: {
        aptId: string
    }
    map: undefined
    cleanerInfo: {
        cleanerId: string
    }
}

export type OrderStackParams = {
    ordersList: undefined
}

export type AccountStackParams = {
    home: undefined
}

