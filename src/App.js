import logo from './logo.svg';
import './App.css';
import DashboardLayout from "./layout/DashboardLayout"
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './features/users/pages/UserPage';
import DashboardPage from './pages/DashboardPage';
import { Provider } from 'react-redux';
import Admissions from './pages/Admissions';
import Financials from './pages/Financials';
import Schedule from './pages/Schedule';
import PrimeTable from './pages/PrimeTable';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path='financials' element={<Financials />} />
              <Route path='schedule' element={<Schedule />} />
              <Route path='primeTable' element={<PrimeTable />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>

  );
}

export default App;
