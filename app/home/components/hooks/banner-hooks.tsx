export async function getBanners() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-banners`, {
        headers: {
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch programs");
    return res.json();
}