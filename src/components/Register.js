import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Register=()=>{

    const navigate =useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [telephone, setTelephone]=useState("");
    const [isShowPassword, setIsShowPassword]=useState(false)

    const [error, setError]=useState("");

    const handleRegister= async()=>{

        try{
            const url='http://localhost:8080/user/register';

            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({
                    firstName:firstName,
                    lastName:lastName,
                    email: email,
                    password:password,
                    telephone:telephone,
                })
            });
            if(response.ok){
                alert("successful registration");
                navigate("/login");
            }else{
                console.log(response.json());
                setError("Email already exists");
            }
        }catch(error){
            setError("check infor");
        }

    }

    const handleGoBack=()=>{
        navigate("/login");
    }
    return(<>
    <div className="register-container col-12 col-sm-4">
            <div className="title">Register</div>

            <input
            type="text"
            placeholder="First Name..."
            value={firstName}
            onChange={(event)=>setFirstName(event.target.value)}
            />

            <input
            type="text"
            placeholder="Last Name..."
            value={lastName}
            onChange={(event)=>setLastName(event.target.value)}
            />

            <input
            type="text"
            placeholder="Telephone..."
            value={telephone}
            onChange={(event)=>setTelephone(event.target.value)}
            />

            <input
            type="text"
            placeholder="Email..."
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
            />

            <div className="input-2">
                <input 
                type={isShowPassword ===true ? "text":"password"} 
                placeholder="Password..."
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                />
                <i className={isShowPassword===true ?"fa-solid fa-eye":"fa-solid fa-eye-slash"}
                    onClick={()=>setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            {error && <div className="error-text">{error}</div>}
            <button
            className={firstName && lastName && telephone && email && password ? "active":""}
            disabled={firstName && lastName && telephone && email && password ? false:true}
            onClick={()=>handleRegister()}
            >Register</button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={()=>handleGoBack()}>&nbsp;Login</span>
            </div>
        </div>
    </>)
}
export default Register;