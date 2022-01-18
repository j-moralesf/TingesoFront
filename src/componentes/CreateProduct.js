import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./CreateProduct.css"
import axios from "axios"


function CreateProduct() {
    const[data,setData]=useState({codigo:"",nombre:"",fechaVencimiento:"",categoria:"",precio:""});
    function handleChange(e){
        setData({...data,
                [e.target.name]: e.target.value})
        console.log(data);
      }
    function cancelar(){
        window.location.href="http://localhost:32000/"
    }
    async function handleSubmit(e){
        e.preventDefault();
        const res = await axios.post("http://localhost:8080/api/producto/",data)
        if (res.status == 201){
            window.location.href="http://localhost:32000/"
        }
        if(res.status==400){
            console.log("Hola")
            window.alert("Error al agregar producto")
        }
    }
    return (
        <div className='contenedor'>
            <div className="cont">
                <h1 className='titulo'>Agregar Producto</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField
                        id="outlined-name"
                        label="codigo"
                        name="codigo"
                        onChange={handleChange}
                        type="number"
                    />
                    <TextField
                        id="outlined-name"
                        label="nombre"
                        name="nombre"
                        onChange={handleChange}
                    />
                    <TextField
                        id="fechaVencimiento"
                        label="fechaVencimiento"
                        type="date"
                        name="fechaVencimiento"
                        onChange={handleChange}
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-name"
                        label="categoria"
                        name="categoria"
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-name"
                        label="precio"
                        name="precio"
                        onChange={handleChange}
                        type="number"
                    />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="success" onClick={handleSubmit}>
                                Agregar
                            </Button>
                            <Button variant="outlined" color="error"  onClick={cancelar}>
                                Cancelar
                            </Button>
                        </Stack>
                </Box>
            </div>
        </div>
    )
}

export default CreateProduct

