import React from 'react'
import Layout from '../../components/Layout'
import { Row, Col, Container } from 'react-bootstrap'
import './style.css';
import { NavLink } from 'react-router-dom';
/**
* @author
* @function Home
**/

const Home = (props) => {
  return (
    <Layout sidebar>
      {/* <div style={{margin: '5rem' , }} class="p-5 text-black rounded text-center">
        <h1>Welcome to Admin Dashboard</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
      </div> */}
    </Layout>
  )
}


export default Home