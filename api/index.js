const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require('cors');

const listEndpoints = require("express-list-endpoints")



dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("DB Connection Successfull!"))
    .catch(err=>console.log(err));

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);


console.table(listEndpoints(app));


app.listen(8800, () => {
    console.log("Backend server is running!");
    
});
