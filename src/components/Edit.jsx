import React,{useEffect,useState} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import axios from 'axios'


 const Edit = () => {
     const [name,setName]=useState("")
     const [email,setEmail]=useState("")
   
     const [phone,setPhone]=useState("")
     const[profession,setProfession]=useState("")
     const [msg,setMsg]=useState("")
    
     const history= useHistory()
     const handleClick=()=>{
         history.push('/home')
        //  window.location.reload()
     }
   
     const {_id}=useParams()
     
     useEffect(()=>{
         axios.post('http://localhost:3100/get',{
             _id:_id
         }).then((data)=>{
             console.log(data.data);
             setName(data.data.name);
             setEmail(data.data.email);
             setPhone(data.data.phone);
             setProfession(data.data.profession)
         })
     
     },[])


    const valChange1=(e)=>{
      
        setName(e.target.value)

    }

    const valChange2=(e)=>{
        setPhone(e.target.value)
       
    }

    const valChange3=(e)=>{
        setEmail(e.target.value)
       
    }

  

    
    const valChange5=(e)=>{
        setProfession(e.target.value)
       
    }

    const handleOnSubmit=(e)=>{
      
        e.preventDefault()
        fetch("http://localhost:3100/update",{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({
                _id,
                name,
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
            if(data.message==='Data Updation Success'){
                setTimeout(()=>{
                     history.push('/home')
                  
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
                            <button className="btn btn-success btn-md">Update</button>
                           
                        </div>
                        <div className="form-group">
                            <Link to="/home" onClick={()=>{
                            handleClick()
                            }}>Back To Home</Link>
                        </div>
                    </form>
                </div>
            </div>
    </div>
        </div>
       
    )
}
export default Edit

