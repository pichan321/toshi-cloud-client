import React from "react";
import Button from 'rsuite/Button';
import { useState } from "react";
import {get, API_URL} from '../../utils/API'

export default function DeleteButton({getFiles, file}) {
    const [loading, setLoading] = useState(false)

    async function deleteFile(file) {
      setLoading(true)
      try {
        var response = await get(`${API_URL}/file/delete/${file.uuid}`)
        getFiles()
      } catch {
        return
      }
      setLoading(false)
    }

      return (
        <Button appearance="primary" color="red" onClick={() => deleteFile(file)} loading={loading} style={{color: "black",}}>Delete</Button>
      )
  }