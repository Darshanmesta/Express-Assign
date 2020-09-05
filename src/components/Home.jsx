import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Navbar} from './Navbar'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      nothing:true,
      msg: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3100/home")
      .then((data) => {
        console.log(data);

        if(data.data.length==0){
            this.setState({nothing:true})
        }
        else{
            this.setState({
                results: data.data,
                nothing:false
                
              });

        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { results } = this.state;
    return (
      <div>
        <Navbar/>
        {this.state.msg !== null ? (
          <div className="text-center al1">
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <em>{this.state.msg}</em>
            </div>
          </div>
        ) : null}

        {this.state.nothing?(<h2 className="text-center">Nothing To Display</h2>):(
               <table className="table table-striped table-hover table-bordered table-responsive new-tab ">
               <thead>
                 <tr>
                   <th>Name:</th>
                   <th>Email</th>
                   <th>Phone</th>
                   <th>Profession</th>
                   <th>Edit</th>
                   <th>Delete</th>
                 </tr>
               </thead>
               <tbody>
                 {results.map((data) => {
                   return (
                     <tr key={data._id}>
                       <td>{data.name}</td>
                       <td>{data.email}</td>
                       <td>{data.phone}</td>
                       <td>{data.profession}</td>
                       <td>
                         {" "}
                         <Link
                           to={`/edit/${data._id}`}
                           className="btn btn-sm btn-success"
                         >
                           <span>
                             <i className="fas fa-edit"></i>
                           </span>
                         </Link>
                       </td>
                       <td>
                         <Link
                           className="btn btn-sm btn-danger"
                           onClick={() => {
                             fetch("http://localhost:3100/delete", {
                               method: "DELETE",
                               headers: {
                                 Accept: "application/json",
                                 "Content-Type": "application/json",
                               },
                               body: JSON.stringify({
                                 _id: data._id,
                               }),
                             })
                               .then((res) => res.json())
                               .then((data) => {
                                   this.setState({msg:data.message})
                                   setTimeout(()=>{
                                   this.setState({msg:null})
                                   window.location.reload()
                                   },2000)
     
     
                               });
                           }}
                         >
                           <span>
                             <i className="fas fa-trash-alt"></i>
                           </span>
                         </Link>
                       </td>
                     </tr>
                   );
                 })}
     
             
               </tbody>
             </table>
        )}
     
      </div>
    );
  }
}

export default Home;
