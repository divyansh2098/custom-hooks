"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = exports.Status = void 0;
const react_1 = require("react");
const common_utils_1 = require("../common-utils");
var Status;
(function (Status) {
    Status["IDLE"] = "IDLE";
    Status["FETCHING"] = "FETCHING";
    Status["FETCH_SUCCESS"] = "FETCH_SUCCESS";
    Status["FETCH_FAILED"] = "FETCH_FAILED";
})(Status = exports.Status || (exports.Status = {}));
const defaultHeaders = {
    "Content-type": "application/json"
};
const useFetch = ({ url, body, headers, queryParams, processResponse }) => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)();
    const [status, setStatus] = (0, react_1.useState)(Status.IDLE);
    let queryString = "";
    if (queryParams) {
        queryString = (0, common_utils_1.convertObjToSearchParams)(queryParams);
    }
    const get = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setStatus(Status.FETCHING);
        try {
            const response = yield fetch(url, {
                headers: Object.assign(Object.assign({}, defaultHeaders), headers),
                method: "GET"
            });
            const val = yield response.json();
            setData(val);
            setStatus(Status.FETCH_SUCCESS);
            setLoading(false);
        }
        catch (error) {
            setStatus(Status.FETCH_FAILED);
            setLoading(false);
            setError(error);
        }
    });
    const post = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setStatus(Status.FETCHING);
        try {
            const response = yield fetch(url, {
                headers: Object.assign(Object.assign({}, defaultHeaders), headers),
                body: body,
                method: "POST"
            });
            const val = yield response.json();
            setData(val);
            setLoading(false);
            setStatus(Status.FETCH_SUCCESS);
        }
        catch (error) {
            setLoading(false);
            setStatus(Status.FETCH_FAILED);
            setError(error);
        }
    });
    return {
        state: {
            data,
            status,
            error,
            loading,
        },
        get,
        post
    };
};
exports.useFetch = useFetch;
