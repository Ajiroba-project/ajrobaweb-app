import { useRouter } from 'next/router'

const page =()=>{
    const router = useRouter()
const { id } = router.query

    return (
        <main>
            <div className="container"> slug: {id}</div>
        </main>
    )
}

export default page