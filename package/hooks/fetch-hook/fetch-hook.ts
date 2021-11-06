import { useState } from "react"
import { convertObjToSearchParams } from "../common-utils"

export interface IfetchArgs {
    url: string,
    body?: BodyInit,
    headers?: {[key: string]: (string | number)},
    queryParams?: {[key: string]: (string | number)},
    processResponse?: (data: object) => void 
}

export enum Status {
    IDLE = "IDLE",
    FETCHING = "FETCHING",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILED = "FETCH_FAILED",
}

const defaultHeaders = {
    "Content-type": "application/json"
}

export const useFetch = <T>({ url, body, headers, queryParams, processResponse }: IfetchArgs) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<T>()
    const [error, setError] = useState<any>()
    const [status, setStatus] = useState<Status>(Status.IDLE)

    let queryString: string = ""
    if (queryParams) {
        queryString = convertObjToSearchParams(queryParams)
    }
    const get = async (): Promise<T | void> => {
        setLoading(true)
        setStatus(Status.FETCHING)
        try {
            const response = await fetch(url, {
                headers: {
                    ...defaultHeaders,
                    ...headers
                },
                method: "GET"
            })
            const val = await response.json()
            setData(val)
            setStatus(Status.FETCH_SUCCESS)
            setLoading(false)
        } catch(error) {
            setStatus(Status.FETCH_FAILED)
            setLoading(false)
            setError(error)
        }
    }
    
    const post = async (): Promise<T | void> => {
        setLoading(true)
        setStatus(Status.FETCHING)
        try {
            const response = await fetch(url, {
                headers: {
                    ...defaultHeaders,
                    ...headers
                },
                body: body,
                method: "POST"
            })
            const val = await response.json()
            setData(val)
            setLoading(false)
            setStatus(Status.FETCH_SUCCESS)
        } catch(error) {
            setLoading(false)
            setStatus(Status.FETCH_FAILED)
            setError(error)
        }
    }

    return {
        state: {
            data,
            status,
            error,
            loading,
        },
        get,
        post
    }
}