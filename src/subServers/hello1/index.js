
                const express = require('express');
                const bodyParser = require('body-parser');
                const cors = require('cors');
                require('dotenv').config();
    
                const app = express();
                const port = process.env.PORT || 3000;
    
                app.use(bodyParser.json());
                app.use(cors());
    
                // Example route
                app.get('/', (req, res) => {
                  res.send('Hello World');
                });
    
                module.exports=app;
              