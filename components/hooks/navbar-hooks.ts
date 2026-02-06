export async function getPrograms() {
  const res = await fetch("https://api.example.com/posts", {
    headers: {
      Authorization: `Bearer ${process.env.FRONTEND_API_TOKEN}`,
    },
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}
