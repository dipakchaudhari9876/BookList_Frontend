const getToken =()=>{
    if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"))
    }else{
        return false
    }
}

export {getToken}