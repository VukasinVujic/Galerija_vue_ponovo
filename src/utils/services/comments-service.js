import http from './http-service'

class CommentsService {
  addComment(id, body) {
    return http.post(`galleries/${id}/comments`, { body })
    .then(({ data }) => data)
  }

  removeComment(id) {
      return http.delete(`comments/${id}`)
  }
}

const commentsService = new CommentsService()
export default commentsService 