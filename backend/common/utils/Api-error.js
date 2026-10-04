class ApiError extends Error{
constructor(statuscode,message){
    super(message)
    this.statuscode=statuscode;
   
}
static  badRequest(message="bad request"){
    return new  ApiError(400,message)
}

static conflict(message = "Conflict") {
    return new  ApiError(409, message);
  }
  static unauthorized(message="Invalid email or password"){
    return  new ApiError(401, message);
  }
  static notfound(message="not found"){
    return new ApiError(404,message);
  }
  static forbidden (message="dont have valid"){
    return new  ApiError(400,message)
}

}
export default ApiError;