import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Sharing.css';
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { extract_filename } from '../../utils/file';
import { get, post, API_URL } from '../../utils/API';
import { ContactSupportOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
// import { Button } from 'rsuite';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 0,
};

export default function BasicModal({open, setOpen, file}) {
    const user = useSelector(state => state.user)
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    async function getUsernames(e) {
        if (e == "") {
          setUsers([])
            return
        }
        var response = await get(API_URL + `/get-users/${user.uuid}/${file.uuid}/${e}`)
        setUsers(response)
        setSearch(e)
    }
  
    async function share(file, recipient) {
      try {
        var response = await post(API_URL + `/share-file`, {handle: file.uuid, owner: user.uuid, recipient: recipient.uuid})
        getUsernames(search)
      } catch {
        return
      }
    }

    async function revoke(file, recipient) {
      try {
        var response = await post(API_URL + `/share-file/revoke`, {handle: file.uuid, owner: user.uuid, recipient: recipient.uuid})
        getUsernames(search)
      } catch {
        return
      }
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {extract_filename(file.name)}
          </Typography>
          <div style={{width: "100%"}}>
      <InputGroup inside className='mt-3 mb-3'>
        <Input placeholder={"Search username"} onChange={(e) => getUsernames(e)}/>
        <InputGroup.Button>
          <SearchIcon onClick={() => null}/>
        </InputGroup.Button>
      </InputGroup>
    </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {users.map((user) => {
                return (
                    <div>
                        {user.shared ? 
                          <p>{user.username} 
                           <Button onClick={() => share(file, user)} disabled>Shared</Button>
                           <Button onClick={() => revoke(file, user)} color='error'>Revoke</Button>
                           </p>
                        :
                          <p>{user.username} <Button onClick={() => share(file, user)}>Share</Button></p>
                        }
                       
                    </div>
                )
                
            })}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}