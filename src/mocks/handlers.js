import { rest } from 'msw'

export const handlers = [

  // Saves data to session storage
    rest.post('/api/save', (req, res, ctx) => {

      const catData = req.body.catData;
      sessionStorage.setItem('cats', JSON.stringify(catData));
        return res(
          ctx.status(200),
          ctx.json({
            message: 'Data stored successfully.',
          })
        )
    }),

    
  // Gets data from session storage

    rest.get('/api/get', (req, res, ctx) => {
      const data = sessionStorage.getItem('cats');
        return res(
          ctx.status(200),
          ctx.json({
            data,
          })
        )
    })
]