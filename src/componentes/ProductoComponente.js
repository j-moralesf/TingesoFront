import axios from 'axios';
import React from 'react';
import ProductoServicio from '../servicios/ProductoServicio';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ProductoComponente extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            productos:[],
            modalInsertar: false,
            form:{
                    codigo:'',
                    nombre:'',
                    fechaVencimiento: '',
                    categoria:'',
                    precio:'',
            }
        }
    }


    componentDidMount(){
        ProductoServicio.getProductos().then((response) => {
            this.setState({productos:response.data})
        });
    }
    deleteProducto = async (id) => {
        await  axios.delete('http://localhost:8080/api/producto/'+ id)
        this.componentDidMount();
    }
    modalInsertar=()=>{
        this.setState({modalInsertar:!this.state.modalInsertar});
    }
    handleChange=async e=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        console.log(this.state.form);
    }
    peticionPost=async()=>{
        await axios.post('http://localhost:8080/api/producto/',this.state.form).then(response=>{
            this.modalInsertar();
            this.componentDidMount();
        }).catch(error=>{
            console.log(error.message);
        })
    }
    render(){
        const {form} = this.state;
        return(
            <div>
                <h1 className='text-center' >Lista De Productos</h1>
                <button style={{position: 'fixed', top: 20, right: 0,borderRadius:50}} onClick={this.modalInsertar}>Añadir producto</button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>Codigo producto</td>
                            <td>Nombre producto</td>
                            <td>Fecha de vencimiento producto</td>
                            <td>Categoria producto</td>
                            <td>Precio producto</td>
                            <td>Eliminar Producto</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productos.map(
                                producto =>
                                <tr >
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.fechaVencimiento}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.precio}</td>
                                    <button style={{borderRadius:50}}onClick={() => this.deleteProducto(producto.id)}>Delete</button>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style = {{display: 'block'}}>
                        <span style={{float:'right'}}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className='form-group'>
                            <label htmlFor='codigo'>Codigo</label>
                            <input className='form-control' type="text" name="codigo" id="codigo" onChange={this.handleChange} value={form.codigo}/>
                            <br/>
                            <label htmlFor='nombre'>Nombre</label>
                            <input className='form-control' type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form.nombre}/>
                            <br/>
                            <label htmlFor='fecha'>Fecha</label>
                            <input className='form-control' type="text" name="fecha" id="fecha" onChange={this.handleChange} value={form.fechaVencimiento}/>
                            <br/>
                            <label htmlFor='categoria'>Categoria</label>
                            <input className='form-control' type="text" name="categoria" id="categoria" onChange={this.handleChange}value={form.categoria}/>
                            <br/>
                            <label htmlFor='precio'>Precio</label>
                            <input className='form-control' type="text" name="precio" id="precio" onChange={this.handleChange}value={form.precio}/>
                            <br/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                                <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                                Insertar
                            </button>
                                <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
                </Modal>
            </div>
            )
    }

}

export default ProductoComponente