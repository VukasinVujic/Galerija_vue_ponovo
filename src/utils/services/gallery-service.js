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

    createGallery({title, description, images}) {
        return http.post('galleries', {
          title,
          description,
          images
        })
      }
      addComment(id, body) {
        return http.post(`galleries/${id}/comments`, { body })
        .then(({ data }) => data)
      }


      getUserGalleries(id, page = 1, term = '') {
        return http.get(`all-galleries/${id}`, {
          params: {
            page,
            term
          }
        })
        .then(({ data }) => data.galleries)
      }

      getGallery(id) {
        return http.get(`galleries/${id}`)
        .then(({ data }) => data)
      }

}

const galleryService = new GalleryService()

export default galleryService 