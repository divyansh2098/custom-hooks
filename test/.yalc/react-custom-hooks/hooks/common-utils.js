"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjToSearchParams = void 0;
const convertObjToSearchParams = (searchParams) => {
    const paramList = Object.keys(searchParams).map(param => {
        return `${encodeURIComponent(param)}=${encodeURIComponent(searchParams[param])}`;
    });
    return `?${paramList.join("&")}`;
};
exports.convertObjToSearchParams = convertObjToSearchParams;
