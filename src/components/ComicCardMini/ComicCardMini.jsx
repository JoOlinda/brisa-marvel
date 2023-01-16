import { Link } from "react-router-dom"
import { CardContainer, ComicCard, CardContentFrame, CardBody } from "./ComicCardMini.styles"

function ComicCardMini({ ComicDetails }) {
    const stringDate = ComicDetails?.dates?.filter(d=> d.type === "onsaleDate").at(0)?.date.split("T").at(0)
    const dataConvertida = (stringDate && stringDate[0] !== "-") ? new Date(stringDate) : false
    const dataFormatada = dataConvertida ? new Date(dataConvertida).toLocaleDateString("pt-BR", {year: 'numeric', month: 'long'}) : "Data não informada"

    return (
        <CardContainer>
            <ComicCard>
                <Link to={`./comic/${ComicDetails?.id}`} state={{comic: ComicDetails}} >
                    <CardContentFrame>
                        <img src={`${ComicDetails?.thumbnail?.path}.${ComicDetails?.thumbnail?.extension}` || "/images/image-not-found.jpg" } className="card-thumb-frame-thumbnail" />
                    </CardContentFrame>
                    <CardBody>
                        <p className="card-body-headline">{ComicDetails?.title || "Titulo Comic (#000)" }</p>
                        <p className="card-footer">{ dataFormatada }</p>
                    </CardBody>
                </Link>
            </ComicCard>
        </CardContainer>
    )
}

export default ComicCardMini