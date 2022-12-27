import React, { useState, useEffect} from 'react';
import { RegisterUserForm } from './components/registerUserForm';
import axios from 'axios';
import {format} from 'date-fns'

const baseUrl = "http://127.0.0.1:5000/"
const App = () => {
  return (
    <div>
      <RegisterUserForm />
    </div>
  );
};

export default App;
