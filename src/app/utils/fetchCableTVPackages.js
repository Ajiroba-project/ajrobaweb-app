export const fetchCableTVPackages = async (cableTvType, token) => {
    try {
        const response = await fetch(`/api/cable_tv_packages?cableTvType=${cableTvType}`, {
            headers: {
                Authorization: `token ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

     

        return data?.data || []; // Ensure only the data array is returned
    } catch (error) {
        console.error("Error fetching cable TV packages:", error);
        return [];
    }
};
