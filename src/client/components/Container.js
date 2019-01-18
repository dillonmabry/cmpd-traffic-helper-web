import React from 'react';
import Navbar from "./Navbar";

const Container = ({ main }) => (
    <div>
        <Navbar />
        { main }
    </div>
  )

export default Container;