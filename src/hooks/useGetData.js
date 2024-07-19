

const fetchDatanew = async (url, userToken) => {
    const response = await Axios.get(url, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    return response
}

export const useGetDatanew = (url, title, userToken) => {

    return useQuery(title, () => fetchDatanew(url, userToken), {
        refetchOnWindowFocus: false,
    })
}
