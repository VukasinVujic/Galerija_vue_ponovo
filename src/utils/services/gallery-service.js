import http from './http-service'

class GalleryService {
    getAll(page = 1, term = '') {
        return http.get('all-galleries', { 
            params: {
                page,
                term
            }
        })
        .then(({ data }) => data.galleries)
    }
}

const galleryService = new GalleryService()

export default galleryService 