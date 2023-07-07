import { rest } from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.post('/save', (req, res, ctx) => {
        // Persist user's authentication in the session
        console.log("Request",req);
        // localStorage.setItem('data', )
    
        return res(
          // Respond with a 200 status code
          ctx.status(200),
        )
      }),
  
    // Handles a GET /user request
    // rest.get('/user', null),
  ]