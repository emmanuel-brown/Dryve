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
    order: undefined
}

export type MapStackParamsList = {
    map: undefined
    cleanerInfo: {
        cleanerId: string
    }
}

export type OrderStackParams = {
    selectServices: {
        requests: ServiceI[]
        setRequests: React.Dispatch<React.SetStateAction<ServiceI[] | []>>
    }
    pricing: undefined
}

