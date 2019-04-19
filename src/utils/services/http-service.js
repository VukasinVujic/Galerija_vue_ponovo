import axios from 'axios'

export default axios.create({

    baseURL: 'http://127.0.0.1:8000/api/',
    // 'http://localhost/VIVIFY/napredni/Zavrsni/Laravel/Gallerija_laravel/public/api/',

    headers: {
        Accept: 'application/json'
    }
})