export async function onRequestPost(context) {
  try {
    const { text } = await context.request.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "No text provided" }),
        { status: 400 }
      );
    }

    // Dummy summary
    return new Response(
      JSON.stringify({
        summary: "This is a placeholder summary of your contract.",
      }),
      { status: 200 }
    );
  
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}