import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/** import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';
import Select from './Select';
import Generate from './Generate';


/** react routes */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main></Main>
  },
  {
    path : '/quiz',
    element : <CheckUserExist><Quiz /></CheckUserExist>
    //element : <Quiz />
  },
  {
    path : '/result',
    element : <CheckUserExist><Result /></CheckUserExist>
    // element : <Result />
  },
  {
    path : '/select',
    element : <CheckUserExist><Select /></ CheckUserExist>
    // element : <Select />
  },
  {
    path : '/generate',
    element : <CheckUserExist><Select /></ CheckUserExist>
    // element : <Generate />

  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
