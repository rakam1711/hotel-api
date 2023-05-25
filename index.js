const app = require("./Server/Server");
const PORT = process.env.PORT || 8001
const router = require('.Routes/UserRoutes');

app.use('/', router)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
})