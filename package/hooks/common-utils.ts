export const convertObjToSearchParams = (searchParams: {[key: string]: string | number}): string => {
    const paramList = Object.keys(searchParams).map(param => {
        return `${encodeURIComponent(param)}=${encodeURIComponent(searchParams[param])}`
    })
    return `?${paramList.join("&")}`
}