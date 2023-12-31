import React,{useState} from 'react'
import "./Task.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import { deleteTask, updateTask } from '../../service/api';
const Task = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [showSModal, setShowSModal] = useState(false);
  
  const showConfirmationModal = () => {
    setShowModal(true);
  };

  const showConfirmationSModal = () => {
    setShowSModal(true);
  };

  const deleteItem = async(id) => {
    const data = await deleteTask(id,props.jwtToken);
    props.deleteTask(id);
    alert(`Task: ${id} deleted!`);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSModal = () => {
    setShowSModal(false);
  };
  
  const changeStatus = async(id,newStatus,title,description) => {
    const task = {
      title: title,
      description: description,
      status: newStatus
    }
    const data = await updateTask(task,props.jwtToken,id)
    props.moveTask(id,newStatus);
    alert(`Task: ${id} status changed!`)
    setShowSModal(false);
  }

  return (
    <div className={`task-card ${props.status}`}>
      <div className='icons'>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete?</p>
              <button onClick={()=>deleteItem(props.id)}>Yes, delete</button>
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
            </div>
          </div>
        </div>
      )}
      {showSModal && (
        <div className="status-modal-overlay">
          <div className="status-modal">
            <div className="status-modal-content">
              <p>Are you sure to change the status to {props.status === "PENDING"?"ACTIVE":"COMPLETED"}?</p>
              <button onClick={()=>changeStatus(props.id,props.status === "PENDING"?"ACTIVE":"COMPLETED",props.title,props.description)}>Yes, Change</button>
              <span className="close-btn" onClick={closeSModal}>
                &times;
              </span>
            </div>
          </div>
        </div>
      )}
        <div className={`edit ${props.status === "COMPLETED" || props.status === "ACTIVE" ? "hidden" : ""}`}>
          <Link to={`/update/${props.id}`} style={{textDecoration:"none"}}><EditNoteIcon fontSize='medium' color="warning" style={{cursor:"pointer"}}/></Link>
          <div className='tooltip'>Edit the task</div>
        
        </div>
        <div className={`cstatus ${props.status === "COMPLETED" ? "hidden" : ""}`} onClick={showConfirmationSModal}>
          <AddBoxIcon fontSize='medium' color='info' style={{cursor:"pointer"}}/>
          <div className='tooltip'>Change Status to {props.status === "PENDING"? "ACTIVE" : "COMPLETED"}</div>
        </div>
        <div className='delete-icon' style={{cursor:"pointer"}} onClick={showConfirmationModal}>
          <div className='tooltip'>Delete</div>
        <DeleteIcon color='error' />
        </div>

      </div>
        <div className='content'>
        <div className="title">{props.title}</div>
        <hr style={{width:"12rem",color:"black"}}/>
        <div className='description'> {props.description}</div>
        </div>
    </div>
  )
}

export default Task