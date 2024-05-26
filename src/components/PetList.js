import React, { useState, useSyncExternalStore } from "react";
import PetItem from "./PetItem";
import Modal from "./Modal";
import { getAllPets } from "../api/pets";
import { useQuery } from "@tanstack/react-query";

const PetList = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [pets, setPets] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: getAllPets,
  });
  // "queryKey" is what we want to name our query.
  // "queryFn" is the function we want our query to do.
  // i can either write "getAllPets" alone as it is, or if this function will have parameters,
  // then i should write it like this:
  // queryFn: () => getAllPets ()

  // const petList = pets
  //   .filter((pet) => pet.name.toLowerCase().includes(query.toLowerCase()))
  //   .map((pet) => <PetItem pet={pet} key={pet.id} />);

  // above is the old "unclean" code. Now with useQuery, we change "pets" to "data" (because we are replacing the frontend data with ur backend data)

  const petList = data
    ?.filter((pet) => pet.name.toLowerCase().includes(query.toLowerCase()))
    .map((pet) => <PetItem pet={pet} key={pet.id} />);
  // the "?" tells VS to not conduct a filter if the data if empty. but if the data isn't empty, VS code shoudl proceed and filter.

  // const fetchPets = async () => {
  //   const response = await getAllPets();
  //   setPets(response);
  // };

  // the commented out green function and useState is the old method of fetching a pet, where the user must manually click a button.
  // this is not the correct approach. the correct approahc is the useQuery function instead.

  if (isLoading) return <h1>Loading..</h1>;

  return (
    <>
      <div className="bg-[#F9E3BE] flex flex-col justify-center items-center ">
        <div className="w-[76vw] flex h-[30px] mb-[30px] mt-[30px]">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search"
            className="w-[70%] flex justify-start items-center border border-black rounded-md"
          />
          <button
            className="ml-auto w-[25%] px-3 py-2 rounded-md text-sm md:text-xl border border-black  flex justify-center items-center bg-green-400 hover:bg-green-600"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add pet
          </button>
        </div>
        <div className=" flex flex-col flex-wrap md:flex-row gap-[20px] w-[76vw]  justify-center items-center mb-[50px]">
          {petList}
        </div>
      </div>
      <Modal show={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default PetList;
