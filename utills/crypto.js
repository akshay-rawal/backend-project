import crypto from "crypto"

export const token = ()=>{

return crypto.randomBytes(8).toString('hex')


}


