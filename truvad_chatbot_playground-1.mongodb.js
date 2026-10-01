// Ensure index does not already exist, then create your MongoDB Vector Search index

use("truvad")
const collection = db.getCollection("regulatory");

   // Define your MongoDB Vector Search Index
   const index = {
      name: "regulatory_vector",
      type: "vectorSearch",
      definition: {
         "fields": [
            {
               "type": "vector",
               "numDimensions":3072,
               "path": "embedding",
               "similarity": "cosine"
            },
            {
               "type": "filter",
               "path": "loc.pageNumber"
            }
         ]
      }
   }

   // Run the helper method
   const result = collection.createSearchIndex(index);
   console.log(result);

