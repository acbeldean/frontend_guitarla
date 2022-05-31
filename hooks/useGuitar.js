import { useContext } from "react"
import GuitarContext from "../context/GuitarProvider"

const useGuitar = () => {
    return useContext(GuitarContext)
}

export default useGuitar