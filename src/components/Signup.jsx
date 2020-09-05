import React,{useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'


 const Signup = () => {
     const [name,setName]=useState("")
     const [email,setEmail]=useState("")
     const [password,setPassword]=useState("")
     const [phone,setPhone]=useState("")
     const[profession,setProfession]=useState("")
     const [msg,setMsg]=useState("")
    
     const history= useHistory()
     const handleClick=()=>{
         history.push('/signin')
        //  window.location.reload()
     }
   
     


    const valChange1=(e)=>{
      
        setName(e.target.value)

    }

    const valChange2=(e)=>{
        setPhone(e.target.value)
       
    }

    const valChange3=(e)=>{
        setEmail(e.target.value)
       
    }

    const valChange4=(e)=>{
        setPassword(e.target.value)
       
    }

    
    const valChange5=(e)=>{
        setProfession(e.target.value)
       
    }

    const handleOnSubmit=(e)=>{
      
        e.preventDefault()
        fetch("http://localhost:3100/signup",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({
                name,
                password,
                email,
                phone,
                profession

            })

        }
      
        
        ).then(res=> res.json()).then(data=> {
           
            setMsg(data.message)
            setTimeout(()=>{
                setMsg("")
            },3000)
            if(data.message==='Signup Succeeded'){
                setTimeout(()=>{
                     history.push('/signin')
                  
                },5000)
           
            }

        }).catch(err=> console.log(err))
        
      

  


    }
    return (
        <div>
          
             <div style={{marginTop:'50px'}}  className="outer-div">
            <div className="row">
                <div className="col-sm-12 col-12">
                    {msg!==""?(

                        <div className="text-center al1" >
                                <div className="alert alert-info alert-dismissible">
     <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <em>{msg}</em>
   </div>
                                </div>

         
                    
                     
      
                    ):(
              
                   
                           null   
             
                    
                    )}
                    <form className="text-center form1" 
                    onSubmit={(e)=>{
                        handleOnSubmit(e)
                    }}
                    
                    >
                        <h5>Please Signup</h5>
                        <div className="form-group">
                            <label htmlFor="">Name:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                     <span class="input-group-text" id="basic-addon1"><i class="fas fa-clipboard-list"></i></span>
                                </div>
                                   <input type="text" name="name" id="name" placeholder="Name" value={name} className="form-control"  autoFocus onChange={(e)=>{
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
                             valChange4(e)
                            }}/>

                            {/* <div className="input-group-append">
                                   <span className="input-group-text"><i  id="pass-eye" class="fas fa-eye-slash fa-eye"></i></span>
                                
                            </div> */}
                            </div>
                         
                        </div>
                      

                             <div className="form-group">
                            <label htmlFor="">Email:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                     <span className="input-group-text" id="basic-addon1"><i className="fas fa-envelope"></i></span>
                                </div>
                                   <input type="text" name="email" id="email" placeholder="someone@example.com" value={email} className="form-control"  onChange={(e)=>{
                             valChange3(e)
                            }}/> 
                            </div>
                         
                        </div>

                          

                        <div className="form-group">
                            <label htmlFor="">Phoneno:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                     <span className="input-group-text" id="basic-addon1"><i class="fas fa-phone-volume"></i></span>
                                </div>
                                 <input type="text" name="phone" id="phone" placeholder="+91 88xxxxxx15" value={phone} className="form-control"  onChange={(e)=>{
                             valChange2(e)
                            }}/>
                            </div>
                           
                        </div>
 
                        <div className="form-group">
                            <label htmlFor="">Profession:</label>
                             <select name="profession" id="profession" onChange={(e)=>{
                                 valChange5(e)
                             }}>
                                 <option value="">Select-One</option>
                                 <option value="Software-Engineer" selected={profession=='Software-Engineer'}>Software-Engineer</option>
                                 <option value="Fullstack-Developer" selected={profession=='Fullstack-Developer'}>Fullstack-Developer</option>
                             </select>
                           
                        </div>


                        <div className="form-group">
                            <button className="btn btn-success btn-md">Submit</button>
                           
                        </div>
                        <div className="form-group">
                            <Link to="/signin" onClick={()=>{
                            handleClick()
                            }}>Already Have an Account?</Link>
                        </div>
                    </form>
                </div>
            </div>
    </div>
        </div>
       
    )
}
export default Signup
