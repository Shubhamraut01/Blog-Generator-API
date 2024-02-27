import  { useState, useEffect } from 'react';
import { Heading ,Input ,Button} from '@chakra-ui/react'

const BlogGenerator = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogContent, setBlogContent] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:8000/create-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      setBlogContent(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Fetch initial blog content from the backend (if applicable)
    // Replace with the actual API endpoint if needed
    // fetch('/get-initial-blog-content')
    //   .then(response => response.json())
    //   .then(data => setBlogContent(data.content));
  }, []);

  return (
    <div style={{marginLeft:"30px" ,marginTop:"30px"}}>
      <Heading>Blog Generator</Heading>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic">Topic: </label>
        <Input
        placeholder='Enter your blog topic'
          type="text"
          // size='md'
          width={"50vw"}
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <br />
        <br />
        <Button colorScheme='teal' size='lg' type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Blog'}
        </Button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {blogContent && <p>{blogContent}</p>}
    </div>
  );
};

export default BlogGenerator;
