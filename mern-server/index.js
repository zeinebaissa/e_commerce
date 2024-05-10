const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://e_commerce:e_commerce@cluster0.ebgtrlu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //create a collection of documents
        const clientCollection = client.db("Store").collection("Clients");

    app.post("/upload-client", async (req, res) => {
      try {
        const data = req.body;
        const result = await clientCollection.insertOne(data);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/all-clients", async (req, res) => {
      try {
        const result = await clientCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await clientCollection.findOne({ email, password });
        if (user) {
          res.json({ success: true, user });
        } else {
          res.status(401).json({ success: false, message: "Invalid email or password" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.patch("/update-client/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            name: data.name,
            email: data.email,
            password: data.password,
          }
        };
        const options = { upsert: false };
        const result = await clientCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.delete("/delete-client/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await clientCollection.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/client/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await clientCollection.findOne(filter);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
    const articleCollection = client.db("Store").collection("Articles");

        //insert a car to the bd : post method
        app.post("/upload-article", async (req, res) => {
            const data = req.body;
            const result = await articleCollection.insertOne(data);
            res.send(result);
        })

        //get all cars from the bd : get method
        app.get("/all-articles", async (req, res) => {
            const article = articleCollection.find({});
            const result = await article.toArray();
            res.send(result);
        })

        //update a car from the bd :patch or put method
        app.patch("/update-article/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    category: data.category,
                    image_url: data.imageurl
                }
            };
            const options = { upsert: false };
            const result = await articleCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //delete a car from the bd : delete method
        app.delete("/delete-article/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await articleCollection.deleteOne(filter);
            res.send(result);
        })

        //find by category
        app.get("/all-article", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { Name: req.query.category };
            }
            const result = await articleCollection.find(query).toArray();
            res.send(result);
        })

        //get sigle car by id
        app.get("/article/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await articleCollection.findOne(filter);
            res.send(result);
        })


        //review
        //create a collection of documents
        const reviewCollection = client.db("Store").collection("Reviews");

        //insert a review to the bd : post method
        app.post("/upload-review", async (req, res) => {
            const data = req.body;
            const result = await reviewCollection.insertOne(data);
            res.send(result);
        })

        //get all reviews from the bd : get method
        app.get("/all-reviews", async (req, res) => {
            const reviews = reviewCollection.find({});
            const result = await reviews.toArray();
            res.send(result);
        })

        //update a review from the bd :patch or put method
        app.patch("/update-review/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    writer: data.writer,
                    comment: data.comment,
                    approved: data.approved
                }
            };
            const options = { upsert: false };
            const result = await reviewCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //delete a review from the bd : delete method
        app.delete("/delete-review/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await reviewCollection.deleteOne(filter);
            res.send(result);
        })

        //find by category
        app.get("/all-reviews", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { brand: req.query.category };
            }
            const result = await reviewCollection.find(query).toArray();
            res.send(result);
        })

        //get sigle review by id
        app.get("/review/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await reviewCollection.findOne(filter);
            res.send(result);
        })

        //promotioncode
        //create a collection of documents
        const promotionCollection = client.db("Store").collection("Promotion");

        //insert a review to the bd : post method
        app.post("/upload-promo", async (req, res) => {
            const data = req.body;
            const result = await promotionCollection.insertOne(data);
            res.send(result);
        })

        //get all reviews from the bd : get method
        app.get("/all-promos", async (req, res) => {
            const promos = promotionCollection.find({});
            const result = await promos.toArray();
            res.send(result);
        })

        //update a review from the bd :patch or put method
        app.patch("/update-promo/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    promotioncode: data.promotionCode,
                    percentage: data.percentage
                }
            };
            const options = { upsert: false };
            const result = await promotionCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //delete a review from the bd : delete method
        app.delete("/delete-promo/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await promotionCollection.deleteOne(filter);
            res.send(result);
        })


        //get sigle review by id
        app.get("/promo/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await promotionCollection.findOne(filter);
            res.send(result);
        })

        //review
        //create a collection of documents
        const basketCollection = client.db("Store").collection("Basket");

        //insert a product into the basket to the bd : post method
        //insert a product into the basket to the bd : post method
        app.post("/upload-basket", async (req, res) => {
          const data = req.body;
          // Generate a new unique identifier for the product
          data._id = new ObjectId();
          const result = await basketCollection.insertOne(data);
          res.send(result);
        })
        //delete a product from the basket : delete method
        // Route to delete a product from the basket
app.delete("/delete-basket/:id", async (req, res) => {
  try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ObjectId format");
      }
      const filter = { _id: new ObjectId(id) };
      const result = await basketCollection.deleteOne(filter);
      if (result.deletedCount === 1) {
          res.send("Product deleted successfully");
      } else {
          res.status(404).send("Product not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});




        //get all reviews from the bd : get method
        app.get("/all-basket", async (req, res) => {
            const basket = basketCollection.find({});
            const result = await basket.toArray();
            res.send(result);
        })

        //update a review from the bd :patch or put method
        app.patch("/update-basket/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    id_produit: data.id_produit,
                }
            };
            const options = { upsert: false };
            const result = await basketCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //delete a review from the bd : delete method
    

        //get sigle review by id
        app.get("/basket/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await basketCollection.findOne(filter);
            res.send(result);
        })
        // Route to delete all products from the basket
app.delete("/delete-basket", async (req, res) => {
  try {
    const result = await basketCollection.deleteMany({});
    res.send("Basket cleared successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


                //promotioncode
        //create a collection of documents
        const orderCollection = client.db("Store").collection("Order");

        //insert a review to the bd : post method
        app.post("/upload-order", async (req, res) => {
            const data = req.body;
            const result = await orderCollection.insertOne(data);
            res.send(result);
        })

        //get all reviews from the bd : get method
        app.get("/all-orders", async (req, res) => {
            const order = orderCollection.find({});
            const result = await order.toArray();
            res.send(result);
        })

        //update a review from the bd :patch or put method
        app.patch("/update-order/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    promotioncode: data.promotionCode,
                    percentage: data.percentage
                }
            };
            const options = { upsert: false };
            const result = await orderCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //delete a review from the bd : delete method
        app.delete("/delete-order/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await orderCollection.deleteOne(filter);
            res.send(result);
        })


        //get sigle review by id
        app.get("/order/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await orderCollection.findOne(filter);
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})