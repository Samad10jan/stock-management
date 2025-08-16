import jwt from "jsonwebtoken";

type Payload = {
    id: string
}
export function signToken(data: Payload) {

    const token = jwt.sign(data, process.env.KEY as string)
    return token
}

export function verifyToken(token:string) {
    try{

        const data = jwt.verify(token, process.env.KEY as string)
        return data as Payload

    }catch(err){
        return null
    }
    
}