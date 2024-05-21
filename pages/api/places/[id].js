import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      return response.status(200).json(place);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);
    response.status(200).json({ status: "Place updated" });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Joke deleted" });
  }
}
