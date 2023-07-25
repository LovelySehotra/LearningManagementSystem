class AppError extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode = statusCode;
        Error.codeStackTrace(this,this.constructor);

}
}
export default AppError;