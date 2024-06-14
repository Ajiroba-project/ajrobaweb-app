

// import { useQuery } from '@tanstack/react-query';

// interface Data {
//     // Define the structure of your data
// }

// const fetchData = async (url: string, criteria?: any): Promise<Data> => {
//     const response = await fetch(url);
//     return await response.json();
// }

// export const useQueryData = (url: string, title: string, isEnabled: boolean) => {
//     return useQuery<Data>({
//         queryKey: [title],
//         queryFn: () => fetchData(url),
//         enabled: isEnabled
//     });
// }





import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchData = async<T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

    export const useQueryData = <T>(url: string, title: string, isEnabled: boolean): UseQueryResult<T> => {
    return useQuery<T>({
            queryKey: [title],
        queryFn: () => fetchData<T>(url),
                enabled: isEnabled
    });
}

