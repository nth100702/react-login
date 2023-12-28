import { useEffect, useState,useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";

const Login =()=>{
    
    const navigate=useNavigate();
    const {loginContext}=useContext(UserContext);
    const [email, setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isShowPassword, setIsShowPassword]=useState(false)
    const [error, setError]=useState('')

    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    },[])

    const handleLogin=()=>{
        const loginRequest={
            email:email,
            password:password
        }

        fetch('http://localhost:8080/user/login',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginRequest)
            }
        ).then(
            (response)=>{
                if(response.ok){
                    return response.json();
                }else {
                    throw new Error('Cannot signIn')
                }
            }
        ).then(
            (data)=>{
                loginContext(email,data.token);
                setError('successfully');
                navigate("/");
            }
        ).catch((error)=>{
            console.error('cannot signIn ',error);
            setError('Pleas check your email and password')
        })
    }
    const handleGoBack=()=>{
        navigate("/");
    }
    const handleRegister=()=>{
        navigate("/register");
    }
    const navigateForgot=()=>{
        navigate("/forgot");
    }
    return(<>
    <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email</div>
        <input
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
        />
        <div className="text">Password</div>
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
        <span className="forgot-text" onClick={()=>navigateForgot()}>Forgot password</span>
        {error && <div className="error-text">{error}</div>}
        <button
        className={email&&password?"active":""}
        disabled={email && password ? false:true}
        onClick={()=>handleLogin()}
        >Login</button>
        
        <div className="bottom-container">
            <div className="bottom-text">Don't have account </div>
            <span className="register-text" onClick={()=>handleRegister()}>Register</span>
        </div>
        <div className="back">
            <i className="fa-solid fa-angles-left"></i>
            <span onClick={()=>handleGoBack()}>&nbsp;Go back</span>
        </div>
    </div>
    </>)
}
export default Login;