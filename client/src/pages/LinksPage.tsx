import { useEffect, useState } from "react"


const LinksPage = () => {
    const [userLinks, setUserLinks] = useState([])

    useEffect(() => {
        const fetchUserLinks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/url/mine`, {
                    credentials: 'include'
                })
                const data = await res.json();
                if (data.success) {
                    setUserLinks(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserLinks()
    }, [])
    
    return (
        <div>LinksPage</div>
    )
}

export default LinksPage