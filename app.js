const express = require("express");
const userRoutes = require("./routes/userRoute");
const cagarbudayaRoutes = require("./routes/cagarBudayaRoute");
const kategoriRoutes = require("./routes/kategoriRoute"); 
const commentRoutes = require("./routes/commentRoute"); 
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use('/cagarbudaya', cagarbudayaRoutes)
app.use('/comment', commentRoutes)
app.use('/kategori', kategoriRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
