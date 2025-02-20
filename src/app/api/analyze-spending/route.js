export async function POST(req) {
    try {
      const body = await req.json();
  
      const response = await fetch("http://127.0.0.1:8000/analyze-spending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to fetch analysis" }), { status: 500 });
    }
  }
  