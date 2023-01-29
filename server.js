require('./conn/mongo')
const express = require('express')
const app = express()
const port = 3000
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const vehicleRoute=require('./routes/vehicles');
const JobCardRoute=require('./routes/job_card');
const driverRoute=require('./routes/drivers');
const dutyLogRoute=require('./routes/duty_log');
const defectMemoRoute=require('./model/defectmemo');

app.use('/vehicles',vehicleRoute);
app.use('/job_card',JobCardRoute);
app.use('/duty_log',dutyLogRoute);
app.use('/drivers',driverRoute);
app.use('/memo',defectMemoRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});