const express = require('express')
const data = require('./cohortData.json')
const cors = require('cors')

const app = express()
app.use(cors())

function getCohort(data, id) {
  for (let cohort of data) {
    if (cohort.id === +id) {
      return cohort
    }
  }
  return null
}

app.get('/', (req, res) => {
  res.json({ data })
})

app.get('/:id', (req, res) => {
  const cohort = getCohort(data, req.params.id)
  if (!cohort) {
    res.status(404).json({
      error: {
        message: 'Cohort is not found'
      }
    })
  }
  else {
    res.json({ data: cohort })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('====================================')
  console.log(`listening on port ${port}`)
  console.log('====================================')
})