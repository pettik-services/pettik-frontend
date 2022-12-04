import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserData } from "./api/auth";
import Loader from "../components/Loader";
import {
  a11yProps,
  StyledTab,
  StyledTabs,
  TabPanel,
} from "../components/Tabs/Tabs";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddSquare from "../assets/images/addsquare.svg";
import HomeImage from "../assets/images/home.png";
import Image from "next/image";
import { deletePet } from "./api/user";
import { showSuccessToast } from "../utils/toaster";
import withAuth, { AuthProps } from "../components/Auth/AuthHOC";

const Dashboard: React.FC<AuthProps> = ({ isAuthenticated }) => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const deletePetMutation = useMutation({
    mutationFn: deletePet,
    onSuccess: () => {
      showSuccessToast("Pet deleted successfully");
      router.reload();
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery(["user-profile"], getUserData, {
    enabled: isAuthenticated,
  });

  const handleAddPetClick = () => {
    router.push("/dashboard/pet");
  };
  const handleEditPetClick = (petUniqueId: string) => {
    router.push({
      pathname: `/dashboard/pet`,
      query: { isEdit: true, petUniqueId },
    });
  };
  const handleDeletePetClick = (petUniqueId: string) => {
    deletePetMutation.mutate({
      pet: {
        pet_unique_id: petUniqueId,
      },
    });
  };
  const handleEditUserClick = () => {
    router.push("/dashboard/user");
  };
  const handleAddAddressClick = () => {
    router.push("/dashboard/address");
  };

  if (isLoading) return <Loader />;

  if (isSuccess) {
    return (
      <div className='px-6 md:px-12 py-6 md:py-0 min-h-screen'>
        <div className='text-center md:text-start font-semi-bold pb-4'>
          See your and your pet profile
        </div>
        <div className='flex flex-row w-full justify-center md:justify-start'>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label='styled tabs'>
            <StyledTab label='User Profile' {...a11yProps(0)} />
            <StyledTab label='Pet Profiles' {...a11yProps(1)} />
            <StyledTab label='Address' {...a11yProps(2)} />
          </StyledTabs>
        </div>
        <div className='py-6 md:py-4'>
          <TabPanel value={value} index={0}>
            <UserProfile
              userDetails={user.data?.userData?.user_details}
              handleEditUserClick={handleEditUserClick}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PetsProfile
              petDetails={user.data?.userData?.pet_details}
              handleAddPetClick={handleAddPetClick}
              handleEditPetClick={handleEditPetClick}
              handleDeletePetClick={handleDeletePetClick}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Address
              addressDetails={user.data?.userData?.user_details?.address}
              handleAddAddressClick={handleAddAddressClick}
            />
          </TabPanel>
        </div>
      </div>
    );
  }
  return null;
};

export default withAuth(Dashboard);

interface UserProfileProps {
  userDetails: any;
  handleEditUserClick: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userDetails,
  handleEditUserClick,
}) => {
  return (
    <div className='p-6 bg-grey-darker rounded-2xl flex flex-col md:flex-row gap-x-8  gap-y-8 items-center relative'>
      <div className='hover:cursor-pointer' onClick={handleEditUserClick}>
        <Avatar
          alt='user image'
          className='uppercase h-24 w-24 text-3xl bg-primary-light text-black opacity-80 border-[3px] border-black'>{`${
          userDetails?.name?.split?.(" ")?.[0]?.[0] || ""
        }${userDetails?.name?.split?.(" ")?.[1]?.[0] || ""}`}</Avatar>
      </div>
      <div className='flex flex-col uppercase text-sm font-semi-bold gap-y-3'>
        <div>NAME: {userDetails?.name}</div>
        <div>EMAIL: {userDetails?.email}</div>
      </div>
      <div className='absolute top-4 right-4 hover:cursor-pointer' onClick={handleEditUserClick}>
        <EditIcon fontSize='small' />
      </div>
    </div>
  );
};

interface PetsProfileProps {
  petDetails: any;
  handleAddPetClick: () => void;
  handleEditPetClick: (petUniqueId: string) => void;
  handleDeletePetClick: (petUniqueId: string) => void;
}

const PetsProfile: React.FC<PetsProfileProps> = ({
  petDetails,
  handleAddPetClick,
  handleEditPetClick,
  handleDeletePetClick,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-14'>
      {petDetails?.map?.((pet: any, idx: number) => {
        return (
          <PetCard
            petDetails={pet}
            key={idx}
            handleEditPetClick={handleEditPetClick}
            handleDeletePetClick={handleDeletePetClick}
          />
        );
      })}
      <PetAddCard handleAddPetClick={handleAddPetClick} />
    </div>
  );
};

interface AddressProps {
  addressDetails: any;
  handleAddAddressClick: () => void;
}

const Address: React.FC<AddressProps> = ({
  addressDetails,
  handleAddAddressClick,
}) => {
  const addresses =
    addressDetails?.map?.((address: any) => {
      const streetAddress = address?.street_address;
      const city = address?.city;
      const pincode = address?.pincode;
      const addressArray = [];
      if (streetAddress) addressArray.push(streetAddress);
      if (city) addressArray.push(city);
      if (pincode) addressArray.push(pincode);
      return addressArray.join(", ");
    }) || [];

  return (
    <div className='flex flex-col gap-y-4'>
      {addresses.map((address: string, idx: number) => (
        <div
          key={idx}
          className='p-6 bg-grey-darker rounded-2xl flex flex-col md:flex-row gap-x-8  gap-y-8 items-center'>
          <Image
            alt='user image'
            className='h-20 md:h-12 w-20 md:w-12 rounded-full p-2  text-3xl bg-primary-light opacity-80 border-[3px] border-black'
            src={HomeImage}
          />
          <div className='flex flex-col uppercase text-sm font-semi-bold gap-y-3'>
            <div>STREET ADDRESS:</div>
            <div>{address}</div>
          </div>
        </div>
      ))}
      <AddressAddCard handleAddAddressClick={handleAddAddressClick} />
    </div>
  );
};

interface PetCardProps {
  petDetails: any;
  handleEditPetClick: (petUniqueId: string) => void;
  handleDeletePetClick: (petUniqueId: string) => void;
}

const PetCard: React.FC<PetCardProps> = ({
  petDetails,
  handleEditPetClick,
  handleDeletePetClick,
}) => {
  return (
    <div className='p-6 bg-grey-darker rounded-2xl flex flex-col gap-y-8 items-center'>
      <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
        <Avatar
          alt='user image'
          className='uppercase h-24 w-24 text-3xl bg-primary-light text-black opacity-80 border-[3px] border-black'>{`${
          petDetails?.name?.split?.(" ")?.[0]?.[0]
        }${petDetails?.name?.split?.(" ")?.[1]?.[0] || ""}`}</Avatar>
        <div className='flex flex-col normal-case text-sm font-semi-bold gap-y-3'>
          <div>PET NAME: {petDetails?.name}</div>
          <div>UNIQUE ID: {petDetails?.pet_unique_id}</div>
          <div>BREED: {petDetails?.breed}</div>
          <div>WEIGHT: {petDetails?.weight}</div>
        </div>
      </div>
      <div className='flex flex-row gap-x-10'>
        <Button
          variant='contained'
          startIcon={<DeleteIcon />}
          onClick={() => handleDeletePetClick(petDetails?.pet_unique_id)}
          className='rounded-lg py-2 px-8 bg-red-200 shadow-none text-red-600  font-bold text-sm hover:text-white hover:bg-red-600'>
          DELETE
        </Button>
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          onClick={() => handleEditPetClick(petDetails?.pet_unique_id)}
          className='rounded-lg py-2 px-8 bg-yellow-200 shadow-none text-yellow-600  font-bold text-sm hover:text-white hover:bg-yellow-600'>
          EDIT
        </Button>
      </div>
    </div>
  );
};

interface PetAddCardProps {
  handleAddPetClick: () => void;
}

const PetAddCard: React.FC<PetAddCardProps> = ({ handleAddPetClick }) => {
  return (
    <div className='h-full w-full p-6 bg-white border-2 border-black rounded-2xl flex flex-col justify-center items-center gap-y-4'>
      <Image src={AddSquare} alt='add pet' className='w-[30%]' />
      <Button
        variant='contained'
        onClick={handleAddPetClick}
        className='rounded-lg py-2 px-8 bg-primary-light shadow-none text-black  font-bold text-sm hover:text-white hover:bg-primary-dark'>
        ADD PET
      </Button>
    </div>
  );
};

interface AddressAddCardProps {
  handleAddAddressClick: () => void;
}

const AddressAddCard: React.FC<AddressAddCardProps> = ({
  handleAddAddressClick,
}) => {
  return (
    <div className='h-full w-full p-2 bg-white border-2 border-black rounded-2xl flex flex-row justify-start items-center gap-x-4'>
      <Image
        onClick={handleAddAddressClick}
        src={AddSquare}
        alt='add pet'
        className='w-20 h-20 hover:cursor-pointer'
      />
      <div
        className='font-bold text-lg hover:cursor-pointer'
        onClick={handleAddAddressClick}>
        ADD ADDRESS
      </div>
    </div>
  );
};
