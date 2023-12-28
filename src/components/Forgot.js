import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgot=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [password2,setPassword2]=useState("");
    const [error,setError]=useState("");
    const [isShowPassword, setIsShowPassword]=useState(false)

    
    const handleChangePassword=async()=>{
        try{
            const url='http://localhost:8080/user/forgot';

            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                })
            });
            if(response.ok){
                alert("Change password successfully");
                navigate("/login");
            }else{
                console.log(response.json());
                setError("please check your email");
            }
        }catch(error){
            setError("check infor");
        }
    }
    const checkPassword2=(password2)=>{
        if(password2 !== password){
            setError("Passwords do not match");
            return true;
        }else{
            setError("");
            return false;
        }
    }
    const handlePassword2Change=(e)=>{
        setPassword2(e.target.value);
        setError("");
        return checkPassword2(e.target.value);
    }
    return(<>
     <div className="login-container col-12 col-sm-4">
        <div className="title">Forgot</div>
        <div className="text">Email</div>
        <input
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
        />
        <div className="text">New password</div>
        <div className="input-2">
            <input 
            type={isShowPassword ===true ? "text":"password"} 
            placeholder="New Password..."
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            />
            <i className={isShowPassword===true ?"fa-solid fa-eye":"fa-solid fa-eye-slash"}
                onClick={()=>setIsShowPassword(!isShowPassword)}
            ></i>
        </div>
        <div className="text">Confirm password</div>
        <div className="input-2">
            <input 
            type={isShowPassword ===true ? "text":"password"} 
            placeholder="Confirm Password..."
            value={password2}
            // onChange={(event)=>setPassword2(event.target.value)}
            onChange={handlePassword2Change}
            />
            <i className={isShowPassword===true ?"fa-solid fa-eye":"fa-solid fa-eye-slash"}
                onClick={()=>setIsShowPassword(!isShowPassword)}
            ></i>
        </div>
        {error && <div className="error-text">{error}</div>}
        <button
        className={password?"active":""}
        disabled={password ? false:true}
        onClick={()=>handleChangePassword()}
        >Change password</button>
    </div>
    </>)
}
export default Forgot;