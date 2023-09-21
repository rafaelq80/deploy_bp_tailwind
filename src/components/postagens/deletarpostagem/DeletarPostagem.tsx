import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { deletar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {

  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await listar(`/postagens/${id}`, setPostagem, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/postagens")
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta('Postagem apagada com sucesso', 'sucesso')

    } catch (error) {
      ToastAlerta('Erro ao apagar a Postagem', 'erro')
    }

    retornar()
  }
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Postagem</header>
        <div className="p-4">
          <p className='text-xl h-full'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button onClick={retornar} className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'>Não</button>
          <button onClick={deletarPostagem} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;

