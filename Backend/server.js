// This module connects to router and router connects to Mongodb
// express.js is the middleware.
// Import dependencies
//Enhance Portal & Register DD Ver 1.2.11
const express = require('express');
const cors = require('cors'); // Used for extracting mongodb database here.
const mongoose = require('mongoose'); // for connecting to mongodb using ENV variable string.
const bodyParser = require('body-parser'); // helps browser to break the data got by cors.  It does parsing.
require('dotenv').config(); // Env variable and hashing constants.

// Set up Express.js server
const app = express();
const port = 5000;

// Enable CORS
app.use(cors(
  {
    origin: ["https://gtmscale-product.vercel.app","https://www.gtmscale.in"],
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true, 
  }
));

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
//     credentials: true,
// }));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false })); // Add this line

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// app.get("/",(req,res) => {
//   return res.send("Backend is accepting APIs now!");
// })

app.get("/",(req,res) => {
  return res.send("Backend is accepting APIs now!");
})

// Import routes
// Backend this component runs on port 5000
// Front end this kind of component runs on port 3000
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const hospitalRouter = require('./routes/hospital'); 
const adminLoginRouter = require('./routes/adminLogin');
const userRouter = require('./routes/users');
const hospitalPortalRouter = require('./routes/hospPortal');
const dealerRouter = require('./routes/dealer');
const productRouter = require('./routes/products');
const startupRouter = require('./routes/startup');
const projectRouter = require('./routes/project');
const contentRouter = require('./routes/content');
const intelRouter = require ('./routes/intel');
const csrRouter = require('./routes/csr');
const billRouter = require('./routes/bill');
const salesRouter = require('./routes/sales');
const mailRouter = require('./routes/email');
const passwordResetRoute = require('./routes/password');



// Use routes
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', adminLoginRouter);
app.use('/api/admin/dashboard/Add-Hospital', hospitalRouter); 
app.use('/api/admin/dashboard/Dealers',dealerRouter);
app.use('/api/admin/dashboard/Products', productRouter);
app.use('/api/admin/dashboard/Startups',startupRouter);
app.use('/api/admin/dashboard/CSR',csrRouter);
app.use('/api/admin/dashboard/Projects',projectRouter);
app.use('/api/users',userRouter);
app.use('/api/hospital-portal',hospitalPortalRouter);
app.use('/api/cont', contentRouter);
app.use('/api/admin/dashboard', intelRouter);
app.use('/api/admin/dashboard/Billings', billRouter);
app.use('/api/admin/dashboard/Sales', salesRouter);
app.use('/api/send-welcome-email', mailRouter);
app.use('/api/password', passwordResetRoute);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

