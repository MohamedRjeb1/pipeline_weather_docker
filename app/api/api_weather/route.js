import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "Veuillez spécifier une ville dans la requête." },
        { status: 400 }
      );
    }

    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error:
            errorData.message || "Erreur lors de la récupération des données.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur API interne :", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
