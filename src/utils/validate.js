export const checkValidateData=(email,password)=>{

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPassValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    //const isNameValid = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(name);

    //if(!isNameValid) return "Please Enter valid name";
    if(!isEmailValid) return "Please Enter valid email address";
    if(!isPassValid) return "Please Enter valid Password";

    return null;
};