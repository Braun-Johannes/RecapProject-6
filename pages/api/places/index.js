import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const place = await Place.find();
      return response.status(200).json(place);
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      response.status(201).json({ status: "Place successfully created " });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
