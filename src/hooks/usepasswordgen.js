import { useState } from "react"

const usepasswordgenerator = () => {
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(false)
    const [strength, setstrength] = useState("")
    const generatepassword = (length, checkboxes) => {
        let charword = ""
        let password = ""
        Object.keys(checkboxes).forEach((key) => {
            switch (key) {
                case '1':
                    if (checkboxes[key].state) charword += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    break;
                case '2':
                    if (checkboxes[key].state) charword += "abcdefghijklmnoprstuvwxyz"
                    break;
                case '3':
                    if (checkboxes[key].state) charword += "!@#$%^&*"
                    break;
                case '4':
                    if (checkboxes[key].state) charword += "1234567890"
                    break;
                default:
                    break;
            }
        })
        for (let i = 0; i < length; i++) {
            if(charword.length>0){
            password += charword[Math.floor(Math.random() * charword.length)]
            seterror(false)
            }
            else{
                seterror(true);
                return;
            }
        }
        setpassword(password)
        let strength;
        if(password.length<=6) setstrength("weak")
        else if(password.length<=12) setstrength("medium")
        else setstrength("strong")
    }
    return { password, error, generatepassword,strength}
}
export default usepasswordgenerator