import React,{useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'


 const Login = () => {
  
     const [email,setEmail]=useState("")
     const [password,setPassword]=useState("")
     const [msg,setMsg]=useState("")

       const handleClick=()=>{
         history.push('/signup')
         window.location.reload()
     }
   
    
     const history= useHistory()
  


    const valChange1=(e)=>{
      
        setEmail(e.target.value)

    }

    const valChange2=(e)=>{
        setPassword(e.target.value)
       
    }

  

    const handleOnSubmit=(e)=>{
      
        e.preventDefault()
        fetch("http://localhost:3100/signin",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({
              
                email,
                password,

            })

        }
      
        
        ).then(res=> res.json()).then(data=> {
            setMsg(data.message)
                    setTimeout(()=>{
                setMsg("")
            },2000)

            if(data.message==='Login Succeeded'){
                setTimeout(()=>{
                     history.push('/home')
                  
                },5000)
           
            }
          

  
     
         

        }).catch(err=> console.log(err))
        
      

  


    }
    return (
        <div>
            
              <div style={{marginTop:'50px'}}>
         
            <div className="row">
                <div className="col-sm-12 col-12">
                    {msg!==""?(

                        <div className="text-center al2" >
                                <div className="alert alert-info alert-dismissible">
     <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <em>{msg}</em>
   </div>
                                </div>

         
                    
                     
      
                    ):(
              
                   
                           null   
             
                    
                    )}
                    <form className="text-center form2" 
                    onSubmit={(e)=>{
                        handleOnSubmit(e)
                    }}
                    
                    >
                        <h5>Please Login</h5>
                  

                             <div className="form-group">
                            <label htmlFor="">Email:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                 <span className="input-group-text" id="basic-addon1"><i className="fas fa-envelope"></i></span>
                                </div>
                                   <input type="text" name="email" id="email" placeholder="someone@example.com" value={email} className="form-control"  onChange={(e)=>{
                             valChange1(e)
                            }}/> 
                            </div>
                         
                        </div>

                             <div className="form-group">
                            <label htmlFor="">Password:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                       <span className="input-group-text" id="basic-addon1"><i className="fas fa-key"></i></span>
                                </div>
                                 <input type="password" name="password" id="password" placeholder="Password" value={password} className="form-control"  onChange={(e)=>{
                             valChange2(e)
                            }}/>

                            {/* <div className="input-group-append">
                                  <span className="input-group-text" id="basic-addon1"><i id="pass2" class="fas fa-eye-slash fa-eye"></i></span>
                            </div> */}
                            </div>
                           
                        </div>

                        <div className="form-group">
                            <button className="btn btn-success btn-md">Submit</button>
                           
                        </div>
                        <div className="form-group">
                            <Link to="/signin" onClick={()=>{
                                handleClick()
                            }}>Don't Have an Account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
      
    )
}
export default Login


