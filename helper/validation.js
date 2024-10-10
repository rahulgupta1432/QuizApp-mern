import joi from "joi";
const registerUserValidation=async(user)=>{
    const schema=joi.object({
        email:joi.string().email({maxAPI_URLSegments:5,tlds:{allow:["org","com","in"]}}).required(),
        password:joi.string().min(8).required(),
        topics:joi.array(),
        scores:joi.array()
    });
    let valid = await schema
    .validateAsync(user, { abortEarly: false })
    .catch((error) => {
      return { error };
    });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
        console.log(valid.error)
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
};

const loginValidation=async(user)=>{
    const schema=joi.object({
        email:joi.string().email({maxDomainSegments:5,tlds:{allow:["org","com","in"]}}).required(),
        password:joi.string().required()
    })
    let valid = await schema
    .validateAsync(user, { abortEarly: false })
    .catch((error) => {
      return { error };
    });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
}



const resetPasswordValidation=async(user)=>{
    const schema=joi.object({
        otp:joi.string().min(4).max(4).required(),
        password:joi.string().min(8).required()
    })
    let valid = await schema
    .validateAsync(user, { abortEarly: false })
    .catch((error) => {
      return { error };
    });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
}




export {registerUserValidation,loginValidation}