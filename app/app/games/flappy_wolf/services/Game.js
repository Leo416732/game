import _axios from "../utils/axios";

export const startGame = async () => {
  const res = await _axios.get("/gamestart-web3/?tour_id=24&toy_id=1");
  // const res = await _axios.get("/gamestart-web3/");

  const { data } = res;

  return res;
};

export const midGame = async (body) => {
  const res = await _axios.post("/gamemid-web3/", body);

  const { data } = res;

  return res.data;
};

export const finishGame = async (body) => {
  const res = await _axios.post("/gameend-web3/", body);

  const { data } = res;

  return res;
};
