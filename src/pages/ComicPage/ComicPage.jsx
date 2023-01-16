import { useEffect, useState } from "react";
import { useParams, useLocation, Navigate  } from "react-router-dom"
import { ModalComicDetails } from "../../components"
import { FullScreen } from "./ComicPage.style";

function ComicPage(props) {

    const { id } = useParams()
    const stateFromLocation = useLocation()
    const [comicData, setComicData] = useState()
    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        setComicData(stateFromLocation.state.comic)
    }, [stateFromLocation])

    const handleCloseModalContainer = function(ev) {
        setShowModal(false)
    }

    return (
        <>
            {!showModal && (
                <Navigate to="./" replace={true} />
            )}
            <FullScreen onClick={handleCloseModalContainer}>
                <ModalComicDetails comic={comicData}/>
            </FullScreen>
        </>
    )
}

export default ComicPage