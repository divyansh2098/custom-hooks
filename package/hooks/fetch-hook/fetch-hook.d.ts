export interface IfetchArgs {
    url: string;
    body?: BodyInit;
    headers?: {
        [key: string]: (string | number);
    };
    queryParams?: {
        [key: string]: (string | number);
    };
    processResponse?: (data: object) => void;
}
export declare enum Status {
    IDLE = "IDLE",
    FETCHING = "FETCHING",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILED = "FETCH_FAILED"
}
export declare const useFetch: <T>({ url, body, headers, queryParams, processResponse }: IfetchArgs) => {
    state: {
        data: T | undefined;
        status: Status;
        error: any;
        loading: boolean;
    };
    get: () => Promise<void | T>;
    post: () => Promise<void | T>;
};
