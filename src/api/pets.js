import instance from ".";

const getAllPets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};

const getOnePet = async (id) => {
  const res = await instance.get(`/pets/${id}`);
  return res.data;
};

const createPet = async (name, image, type, adopted) => {
  const res = await instance.post("/pets", {
    name: name,
    image: image,
    type: type,
    adopted: adopted,
  });
  return res.data;
};

const deleteOnePet = async (id) => {
  const res = await instance.delete(`/pets/${id}`);
  return res.data;
};

export { getAllPets, getOnePet, createPet, deleteOnePet };
