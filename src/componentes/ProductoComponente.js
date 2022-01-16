import React from 'react';
import ProductoServicio from '../servicios/ProductoServicio';

class ProductoComponente extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            productos:[]
        }
    }


    componentDidMount(){
        ProductoServicio.getProductos().then((response) => {
            this.setState({productos:response.data})
        });
    }


    render(){
        return(
            <div>
                <h1 className='text-center' >Lista De Productos</h1>
                <button style={{position: 'fixed', top: 20, right: 0,borderRadius:50}}>Añadir producto</button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>Id producto</td>
                            <td>Codigo producto</td>
                            <td>Nombre producto</td>
                            <td>Fecha de vencimiento producto</td>
                            <td>Categoria producto</td>
                            <td>Precio producto</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productos.map(
                                producto =>
                                <tr key={producto.id}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.fechaVencimiento}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.precio}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                
            </div>
            )
    }

}

export default ProductoComponente