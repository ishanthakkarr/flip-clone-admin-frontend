// import React, { useState,useEffect } from "react";
// import Layout from "../../components/Layout";
// import { Container, Form, Row, Col, Button } from "react-bootstrap";
// import Input from "../../components/UI/Input";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { signup } from "../../actions";
// /**
//  * @author
//  * @function Signup
//  **/

// const Signup = (props) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const auth = useSelector((state) => state.auth);
//   const _user = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const userSignup = (e) => {
//     e.preventDefault();

//     const user = { firstName, lastName, email, password };
//     dispatch(signup(user));
//   };

//   if (auth.authenticate) {
//     return <Navigate to="/" />;
//   }

//   useEffect(() => {
//     if (!user.loading) {
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPassword("");
//     }
//   }, [user.loading]);

//   if (_user.loading) {
//     return <p>Loading...!</p>;
//   }

//   return (
//     <Layout>
//       <Container>
//         {_user.message}
//         <Row style={{ marginTop: "50px" }}>
//           <Col md={{ span: 6, offset: 3 }}>
//             <Form onSubmit={userSignup}>
//               <Row>
//                 <Col md={6}>
//                   <Input
//                     lable="First Name"
//                     placeholder="First Name"
//                     value={firstName}
//                     type="text"
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </Col>
//                 <Col md={6}>
//                   <Input
//                     lable="Last Name"
//                     placeholder="Last Name"
//                     value={lastName}
//                     type="text"
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </Col>
//               </Row>
//               {/* <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Email address</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter email" />
//                                 <Form.Text className="text-muted">
//                                     We'll never share your email with anyone else.
//                         </Form.Text>
//                             </Form.Group> */}
//               <Input
//                 lable="Email address"
//                 placeholder="Enter email"
//                 value={email}
//                 type="email"
//                 errorMessage="We'll never share your email with anyone else."
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <Input
//                 lable="Password"
//                 placeholder="Password"
//                 value={password}
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </Layout>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";
import { useEffect } from "react";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Navigate to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;