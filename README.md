## Blog Generator API

This project provides a simple backend API for generating blog content using the Google Generative AI (GEMINI) service.

**Features:**

- Generates blog content based on a provided topic.
- Uses the "gemini-pro" model for text generation.
- Saves the generated content as a Markdown file.

**Requirements:**

- Node.js and npm installed
- Google Cloud Generative AI API enabled with a project and API key

**Setup:**

1. Clone this repository.
2. Install dependencies: `npm install`
3. Set the `API_KEY` environment variable with your Google Cloud Generative AI API key:
   - **On macOS/Linux:** `export API_KEY=YOUR_API_KEY`
   - **On Windows:** `set API_KEY=YOUR_API_KEY` (replace `YOUR_API_KEY` with your actual key)

**Running the API:**

1. Run the server: `node index.js`

**API Endpoint:**

- **Method:** POST
- **Endpoint:** `/create-blog`
- **Request Body:**
    - `topic`: (string) The topic of the blog post.

**Response:**

- **On success:**
    - Status code: 200
    - Response body: JSON object with the message `Blog successfully created: {fileName}`

- **On error:**
    - Status code: 400 or 500
    - Response body: JSON object with the error message

**Example Usage:**

```
curl -X POST http://localhost:8000/create-blog -H "Content-Type: application/json" -d '{"topic": "The future of AI"}'
```

**License:**

This project is licensed under the MIT License.

**Note:**

This is a basic example and can be further enhanced with additional features, such as:

- User authentication and authorization
- Different model options
- Error handling and validation improvements
- Deployment to a cloud platform
