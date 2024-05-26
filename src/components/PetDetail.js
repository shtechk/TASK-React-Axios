import React, { useState } from "react";
import petsData from "../petsData";
import { Navigate, useParams } from "react-router-dom";
import { getOnePet } from "../api/pets";
import { useQuery } from "@tanstack/react-query";

const PetDetail = () => {
  const { petId } = useParams();

  const { data: pet, isLoading } = useQuery({
    queryKey: ["getOne", petId],
    queryFn: () => getOnePet(petId),
  });
  // the {data: pet} method is called code destructuring.
  // when i destructure a code, i am asking for a specific key within the object.

  // -------------------------------------------------------
  // the below code is if we want to fetch pets whose data we have in the frontend.
  // however, if we want to want to fetch pets from the backened data, follow the code below:

  // const pet = petsData.find((pet) => {
  //   return pet.id == petId;
  // });

  // if (!pet) {
  //   return <Navigate to="/" />;
  // }

  // -------------------------------------------------------
  // this is another commented out code below, because it is the old "unclean" method, we now are using useQuery

  // const [pet, setpet] = useState({});

  // const handleGetPet = async () => {
  //   const res = await getOnePet(petId);
  //   setpet(res);
  // };

  // part of this code also uses the following command, placed below the first <div> after "return"

  // <button onClick={handleGetPet}>Fetch Pet</button>
  // -------------------------------------------------------

  if (isLoading) return <h1>Your request is loading..</h1>;

  // you can also just write the below simple code line instead of "isLoading".
  // the idea is that "if the pet is available, return, (all of the below)"

  // if (pet)

  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5">
            Adobt
          </button>

          <button className="w-[70px] border border-black rounded-md  hover:bg-red-400">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
