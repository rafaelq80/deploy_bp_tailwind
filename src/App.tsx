import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import ListarTemas from './components/temas/listartemas/ListarTemas';
import ListarPostagens from './components/postagens/listarpostagens/ListarPostagens';
import FormularioTema from './components/temas/formulariotema/FormularioTema';
import DeletarTema from './components/temas/deletartema/DeletarTema';
import FormularioPostagem from './components/postagens/formulariopostagem/FormularioPostagem';
import DeletarPostagem from './components/postagens/deletarpostagem/DeletarPostagem';
import { AuthProvider } from './contexts/AuthContext';
import Perfil from './pages/perfil/Perfil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
      <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
            <Route path="/perfil" element={<Perfil />} />
              <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
              <Route path="/editarpostagem/:id" element={<FormularioPostagem />} />
              <Route path="/cadastrarpostagem" element={<FormularioPostagem />} />
              <Route path="/deletartema/:id" element={<DeletarTema />} />
              <Route path="/editartema/:id" element={<FormularioTema />} />
              <Route path="/cadastrartema" element={<FormularioTema />} />
              <Route path="/postagens" element={<ListarPostagens />} />
              <Route path="/temas" element={<ListarTemas />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;