import { Link } from "react-router-dom"
import ListarPostagens from "../../components/postagens/listarpostagens/ListarPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="
                bg-indigo-900 
                flex 
                justify-center
                ">
                <div className='
                    container 
                    grid 
                    grid-cols-2 
                    text-white
                    '>
                    <div className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        justify-center 
                        py-4
                        ">
                        <h2 className='
                            text-5xl 
                            font-bold
                            '>
                                Seja bem vinde!
                            </h2>
                        <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                            <Link to='/postagens'>
                                <button className='
                                    rounded
                                    bg-white
                                    text-blue-800 
                                    py-2 
                                    px-4
                                    '>
                                        Ver postagens
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img 
                            src="https://i.imgur.com/fyfri1v.png" 
                            alt="Imagem Página Home" 
                            className='w-2/3' 
                        />
                    </div>
                </div>
            </div>
            <ListarPostagens />
        </>
    )
}

export default Home