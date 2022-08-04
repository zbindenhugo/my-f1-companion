
import { useState } from "react"

export default function Home() {

    const [isShown, setIsShown] = useState(false);

    const handleShown = () => {
        setIsShown(!isShown);
    }

    return(
        <>
            home
        </>
    )
}