const express = require("express");
const adminrouter = require("./routes/admin");
const userrouter = require("./routes/user");
const cors = require("cors");
const { json } = require("express");
const validate = require("./middleware/validate");
const app = express();
const md5 = require("md5");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("views"));
app.use('/admin', adminrouter);
app.use('/user', userrouter);
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    res.send("Home");
});

app.post("/login", validate, (req, res) => {
    const a = req.body.username;
    res.send(a);
});
app.get("/signup", (req, res) => {
    res.send("Signup");
});

app.get("/pug", (req, res) => {
    var data = {
        title: "PUG TEST",
        tables: {
            countries: [{
                    country: "United States",
                    percentage: 80.3,
                }, {
                    country: "Russia",
                    percentage: 5.6,
                },
                {
                    country: "Spain",
                    percentage: 2.1,
                },
                {
                    country: "India",
                    percentage: 1.9,
                },
                {
                    country: "France",
                    percentage: 1.5,
                }
            ],
        },
    };
    res.render("dashboard", data);
});
const PORT = process.env.PORT || '3001';
app.listen(PORT, () => {
    console.log("Server Running on " + PORT);
})