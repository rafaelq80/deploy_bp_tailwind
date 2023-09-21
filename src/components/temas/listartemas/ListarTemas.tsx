import { useNavigate } from "react-router-dom";
import { listar } from "../../../services/Service";
import CardTemas from "../cardtemas/CardTemas";
import { useState, useEffect, useContext } from "react";
import Tema from "../../../models/Tema";
import useLocalStorage from "react-use-localstorage";
import { AuthContext } from "../../../contexts/AuthContext";
import { Dna } from 'react-loader-spinner';
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListarTemas() {

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [temas, setTemas] = useState<Tema[]>([]);

    let navigate = useNavigate();

    async function buscarTemas() {
        await listar('/temas', setTemas, {
            headers: { Authorization: token },
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
    }, [temas.length]);

    return (
        <>
            {temas.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <>
                                <CardTemas key={tema.id} tema={tema} />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarTemas;