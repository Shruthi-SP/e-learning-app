import Axios from 'axios'

const axios = Axios.create({
    baseURL:'https://dct-e-learning.herokuapp.com/api'
})
export default axios