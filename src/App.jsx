import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout, SeccondaryLayout } from './layouts';
import { Home } from './pages';

import './assets/styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<SeccondaryLayout />}>
          <Route path='/secondary' element={<di>test secondary layout</di>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
