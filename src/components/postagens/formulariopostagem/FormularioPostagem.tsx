import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormularioPostagem() {

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null,
  });

  async function buscarPostagemPorId(id: string) {
    await listar(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemaPorId(id: string) {
    await listar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemas() {
    await listar('/temas', setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
      console.log(tema);
      
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({postagem});

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem atualizada com sucesso', 'sucesso');
        retornar();
      } catch (error) {
        ToastAlerta('Erro ao atualizar a Postagem', 'erro');
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');
        retornar();
      } catch (error) {
        ToastAlerta('Erro ao cadastrar a Postagem', 'erro');
      }
    }
  }

  const carregandoTema = tema.descricao === '';

    return ( 
        <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select value={postagem.tema?.id !== undefined ? postagem.tema?.id : ''} onChange={(e) => buscarTemaPorId(e.currentTarget.value)} name="tema" id="tema" className='border p-2 border-slate-800 rounded' >
            <option value='' >Selecione um tema</option>
            {temas.map((tema) => (
              <>
                <option value={tema.id}>{tema.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={postagem.tema?.id === undefined || postagem.tema?.id === 0} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
        {postagem.tema?.id === undefined ? <span>Carregando</span> : id !== undefined ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
     );
}

export default FormularioPostagem;