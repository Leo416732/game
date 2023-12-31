import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const jwtToken = cookies.get("jwtToken");

export async function getTournaments() {
  const res = await fetch(
    "https://api-game.mongolnft.com/api/tournoments-web3/?type=active",
    {
      next: { tags: ["tournaments"] },
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const createTournamentAPI = async (data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-game.mongolnft.com/api/tournoments-create-web3/",
    headers: {
      Authorization: `JWT ${jwtToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    revalidatePath("/");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getToyInfo = async ({ id, jwtToken }) => {
  const res = await fetch(
    `https://api-game.mongolnft.com/api/tournoments-user-web3/`,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `JWT ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tournoment_id: id }),
    }
  );

  return res.json();
};

async function getTournament(id) {
  const res = await fetch(
    `https://api-game.mongolnft.com/api/tournoments-web3/?tour_id=${id}`,
    {
      method: "GET",
      next: { tags: ["tournament"] },
      cache: "no-cache",
      headers: {
        Authorization: `JWT ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
}

const getToys = async (id) => {
  const res = await fetch(`https://api-game.mongolnft.com/api/toys/`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `JWT ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const buyLifeAPI = async (data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-game.mongolnft.com/api/liveadd-web3/",
    headers: {
      Authorization: `JWT ${jwtToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getTotalPoints = async ({ id }) => {
  const config = {
    method: "GET",
    url: `https://api-game.mongolnft.com/api/tournomenttotalpoints-web3/?tour_id=${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createTournamentAPI,
  buyLifeAPI,
  getToyInfo,
  getToys,
  getTournament,
  getTotalPoints,
};
