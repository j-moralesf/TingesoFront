import axios from "axios";

const PRODUCTO_REST_API_URL = 'http://localhost:8080/api/producto/';

class ProductoServicio{
    getProductos(){
        return axios.get(PRODUCTO_REST_API_URL);
    }
}

export default new ProductoServicio();