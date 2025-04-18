import { AsyncLocalStorage } from "async_hooks";

// import { Request, Response } from "express";

type AsyncLocalStorageType = {
    correlationId: string
}

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>()


export const getCorrelationId = () => {
    const asyncStore = asyncLocalStorage.getStore() //returns a current store for a current async operation.
    return asyncStore?.correlationId || "Unknow error while creating async store"
}