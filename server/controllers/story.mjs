import { index, openai } from "../app.mjs";
import { nanoid } from "nanoid";


const getData = async (req, res) => {
  try {
    // Empty query for demonstration purposes; you should replace this with your actual query
    const query = "";

    // Create text embeddings
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: query,
    });

    // Extract the embedding vector
    const vector = response?.data[0]?.embedding;

    // Perform a database query using the embedding vector
    const queryResp = await index.query({
      queryRequest: {
        vector: vector,
        topK: 10000,
        includeValues: false,
        includeMetadata: true,
      },
    });

    // Log and send the query results
    queryResp.matches.forEach((eachMatch) => {
      console.log(`Score ${eachMatch.score.toFixed(1)} => ${JSON.stringify(eachMatch.metadata)}\n\n`);
    });

    console.log(`${queryResp.matches.length} records found `);

    // Send the response back to the client
    res.status(200).json(queryResp.matches);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getSingle = async (reqs,resp) => {

  const queryText = reqs.query.q;

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: queryText,
  });

  const vector = response?.data[0]?.embedding
  // console.log("vector: ", vector);
  // // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]
  
  const queryResponse = await index.query({
    queryRequest: {
      vector: vector,
      // id: "vec1",
      topK: 1,
      includeValues: false,
      includeMetadata: true,
    }
  });

  queryResponse.matches.map(eachMatch => {
    console.log(`score ${eachMatch.score.toFixed(3)} => ${JSON.stringify(eachMatch.metadata)}\n\n`);
  })
  console.log(`${queryResponse.matches.length} records found `);

  resp.send(queryResponse.matches)

}

const setData = async (reqs,resp) => {


  const title = reqs.body.title;
  const content = reqs.body.content;

  // create embedding..

  const response = await openai.embeddings.create({
      model:"text-embedding-ada-002",
      input:`${title} ${content}`,
  });

  // result of embedding in vector..

  const vector = response?.data[0]?.embedding;

  // console.log( "vector", vector);

  // make insert request..

  const upsertRequest = {
      vectors: [
        {
          id: nanoid(),
          values: vector,
          metadata: {
            title: reqs?.body?.title,
            content : reqs?.body?.content,
          },
        },
      ],
    };

    // responding according to the condition...

    try {

        const upsertResponse = await index.upsert({ upsertRequest });
        console.log("upsertResponse: ", upsertResponse);
          
        resp.send({
            message: "story created successfully"
          });

          
    
      } catch (e) {
      
        console.log("error: ", e);
        resp.status(500).send({
          message: "failed to create story, please try later"
        });
    }
  
}



const EditData = async (req, res) => {
  try {
    // Extract id, title, and content from the request parameters and body
    const { id } = req.params;
    const { title, content } = req.body;

    // Create text embeddings from title and content
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: `${title} ${content}`,
    });

    // Extract the embedding vector
    const vector = response?.data[0]?.embedding;

    // Prepare the upsert request with the provided id
    const upsertRequest = {
      vectors: [
        {
          id,
          values: vector,
          metadata: {
            title,
            content,
          },
        },
      ],
    };

    // Perform the database upsert
    const upsertResponse = await index.upsert(upsertRequest);
    console.log("upsertResponse: ", upsertResponse);

    // Send a success response
    res.status(200).json({
      message: "Story updated successfully",
      updatedId: id,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      message: "Failed to update the story, please try again later",
    });
  }
};

const deleteData = async (req, res) => {
  try {
    // Extract id from the request parameters
    const { id } = req.params;

    // Perform the delete operation
    const deleteResp = await index.delete1({
      ids: id,
    });

    console.log("deleteResponse: ", deleteResp);

    // Check if the delete operation was successful
    if (deleteResp) {
      res.status(200).json({
        message: "Story deleted successfully",
      });
    } else {
      res.status(500).json({
        message: "Story not deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      message: "Failed to delete the story, please try again later",
    });
  }
};


export {getData ,setData, deleteData,EditData,getSingle}
