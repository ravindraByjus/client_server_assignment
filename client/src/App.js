import axios from 'axios';
import { useState } from "react";
import { Container, Col, Row, Button, Input} from "reactstrap"; 
import './App.css';

function App() {

  const [emailId, setEmailId] = useState("");
  const [ error, setError ] = useState(false);
  const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


  const onChangeEmailID = (event) => {
    const emailId  = event.target.value;
    emailId === '' ? setError(false): setError(true)

    if(validEmail(emailId)){
      setEmailId(emailId);
      setError(false);
    }
    
  }
  
  const callAddApi = async () => {
    try {
      if (emailId){
        const response = await axios.post('http://localhost:5000/api/add', {emailId: emailId});
        console.log(response);
      }
    } 
    catch (error) {
      console.error(error);
    }
  }

  const callDeleteApi = async () => {
    try {
      if (emailId){
        const response = await axios.delete('http://localhost:5000/api/delete', {data: {emailId: emailId}});
        console.log(response);
      }
    } 
    catch (error) {
      console.error(error);
    }
  }

  return (
    <Container style={{ marginTop: "60px" }}>
      <Row>
        <Input type="email" name="email" id="Email" placeholder="Enter email here..." 
          onChange={onChangeEmailID}/>
          {error && <span className='error'>Invalid email</span> }

        <Col className="mt-4" sm={{ size: 10, offset: 4 }}>
          <Button color="success" name="clickHere" onClick={callAddApi}>Add Email</Button>{' '}
          <Button color="danger" name="clickHere" onClick={callDeleteApi}>Delete Email</Button>
        </Col>
      </Row>
            
    </Container>
  );
}

export default App;
