import { put } from "@vercel/blob";
import csvParser from "csv-parser";
import { Readable } from "stream";

export default async function updateMenuHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      const csvData = buffer.toString("utf-8");
      const parsedData = await parseCSV(csvData);
      const filename = "gc.json";
      const blob = await put(filename, JSON.stringify(parsedData), {
        access: "public"
      });
      return res.status(200).json({ message: "File updated successfully", url: blob.url });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const parseCSV = async csv => {
  const results = [];
  return new Promise((resolve, reject) => {
    const stream = Readable.from([csv]);
    stream
      .pipe(
        csvParser({
          headers: ["id", "type", "wardId", "wardName", "_5"],
          separator: ";"
        })
      )
      .on("data", data => {
        console.log("data=>", data);
        if (data.type && data.wardId && data.wardName && data._5) {
          const formattedPrice = data._5.replace(",", ".");
          results.push({
            id: data.id,
            type: data.wardName,
            name: data.type,
            ward: {
              id: data.wardId,
              name: data.wardName
            },
            stock: 99999,
            price: parseFloat(formattedPrice)
          });
        }
      })
      .on("end", () => resolve(results))
      .on("error", error => reject(error));
  });
};
