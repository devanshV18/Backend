//making a custom error class in typescript by extending the error object or class in express error



export interface AppError extends Error {
    statusCode: number
}

export class InternalServerError implements AppError {
    name: string
    message: string
    statusCode: number

    constructor(message: string){
        this.name = "Internal Server Error"
        this.statusCode = 500
        this.message = message || "Internal Server Error"
    }
}