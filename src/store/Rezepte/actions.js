import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 3000,
    headers: {'X-Custom-Header': 'foobar'}
});

export const getRezepte = (state) => {

   return instance.get("http://localhost:5000/rezepte")
   .then(x => {return new Promise(resolve => setTimeout(() => resolve(x), 3000))})
   .then((resp) =>{return state.commit('setRezepte',resp.data)})
   .catch((err)=>console.log("ERROR" +err))
}