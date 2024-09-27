import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: {'Access-Control-Allow-Origin': '*'}
});

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // Errores de respuesta del servidor (códigos de estado 4xx o 5xx)
        console.error('Error en la respuesta:', error.response);
      } else if (error.request) {
        console.error('No hubo respuesta del servidor:', error.request);
      } else {
        // Errores al configurar la solicitud
        console.error('Error en la configuración de la solicitud:', error.message);
      }
  
      // Rechazar la promesa para que los errores sigan siendo manejables en el código de llamada
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;