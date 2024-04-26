import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Navbar from './Components/Navbar';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({ config })

function App() {
  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Navbar />

          <Routes >
            <Route path="/" element={<LandingPage />} />

          </Routes>
        </BrowserRouter>
      </ChakraProvider>

    </>
  );
}

export default App;
