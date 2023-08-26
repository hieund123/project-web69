import PersonIcon from "@mui/icons-material/Person";
import React from 'react';
import {Link} from 'react-router-dom'

const UserCard = ({user,handleClose}) =>{

    const handleCloseAll =() =>{

        if(handleClose) handleClose();
    }
    return (

        <div>
            <div style={{display:'flex', padding:'10px', alignItems:'center', borderBottom:'1px solid rgb(149, 149, 231)'}}>
            <Link to={`/profile/${user?._id}`} onClick={handleCloseAll} style={{display:'flex', padding:'10px', alignItems:'center'}} >
            <PersonIcon src={user?.avatar}/>
            <div style={{marginLeft:'6px', color:'white'}}>
                <span style={{display:'block'}}>{user?.fullname}</span>
                <small>{user?.username}</small>
            </div>
            </Link>
            </div>
        </div>
    )
}

export default UserCard;