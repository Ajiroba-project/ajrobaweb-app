import { useMutation } from '@tanstack/react-query';

interface RequestPayload {
    url: string;
    payload: any;
    otp?: any;
    token?: string;
}

const postData = async (request: RequestPayload): Promise<any> => {
    const isFormData =
        typeof FormData !== "undefined" && request.payload instanceof FormData;

    const headers: HeadersInit = {};

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    if (request.token) {
        headers["Authorization"] = `Token ${request.token}`;
    }

    const response = await fetch(request.url, {
        method: "POST",
        headers,
        body: isFormData ? request.payload : JSON.stringify(request.payload),
    });

    let data: any = null;

    try {
        data = await response.json();
    } catch (error) {
        // In case the response is empty or not JSON, keep data as null.
    }

    if (!response.ok) {
        const errorMessage =
            data?.message ||
            data?.detail ||
            data?.data?.detail ||
            data?.data?.message ||
            "Unable to complete request. Please try again.";

        const errorObject = new Error(errorMessage);
        (errorObject as any).status = response.status;
        (errorObject as any).data = data;

        throw errorObject;
    }

    return {
        ...data,
        status: data?.status ?? response.status,
    };
};

type SuccessCallback = (data: any) => void;
type ErrorCallback = (error: any) => void;


interface MutationHookResult {
    data: any;
    error: any;
    isError: boolean;
    isSuccess: boolean;
    mutate: (payload: RequestPayload) => void;
    mutateAsync: (payload: RequestPayload) => Promise<any>;
    reset: () => void;
    status: string | null;
    onSuccess: SuccessCallback | undefined;
    otp?: any;
    isLoading?: boolean;
}


export const useMutateData = (title: string, onSuccess?: SuccessCallback, onError?: ErrorCallback): MutationHookResult => {
    const mutation = useMutation({
        mutationKey: [title],
        mutationFn: postData,
        onError: onError,
        onSuccess: onSuccess
    });

    return {
        data: mutation.data,
        error: mutation.error,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        mutate: mutation.mutate,
        mutateAsync: mutation.mutateAsync,
        reset: mutation.reset,
        status: mutation.status,
        onSuccess: onSuccess,
        

    };
}