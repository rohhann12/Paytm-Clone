const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const jwt=require("jsonwebtoken")
const UserRoutes = require("./routes/routes");
const AccountRoutes=require("./routes/account")
const {authMiddleware}=require('./middleware/authmiddleware')
app.use(cors());
app.use(bodyParser.json());

app.use(authMiddleware)
app.use('/account',AccountRoutes)
app.use("/user",UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
